//import firebase from 'react-native-firebase'
//import * as firebase from 'firebase';
//import firebase from './Firebase.js';
import firebase from "./firebaseConfig";
import { AccessToken, LoginManager } from "react-native-fbsdk";
//import { GoogleSignin } from 'react-native-google-signin';
//https://www.djamware.com/post/5bbcd38080aca7466989441b/react-native-firebase-tutorial-build-crud-firestore-app
//https://www.tutorialspoint.com/firebase
import { Google } from "expo";

class FirebaseAuthClass {
  getAuth() {
    return firebase.auth();
  }

  login(email, password) {
    //return firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password);
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
    return firebase.auth().signOut();
  }

  createAccount(email, password) {
    //return firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  getUserID() {
    return firebase.auth().currentUser.uid;
  }

  getUser() {
    return firebase.auth().currentUser;
  }

  deleteAccount() {
    return firebase.auth().currentUser.delete();
  }

  // Calling this function will open Google for login.
  /*async googleLogin() {
        try {
        // Add any configuration settings here:
        await GoogleSignin.configure();
    
        const data = await GoogleSignin.signIn();
    
        // create a new firebase credential with the token
        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
        // login with credential
        const currentUser = //await firebase.auth().signInAndRetrieveDataWithCredential(credential);
                            await firebase.auth().signInWithCredential(credential);
        console.info(JSON.stringify(currentUser.user.toJSON()));
        } catch (e) {
        console.error(e);
        }
    }*/

  async googleLogin() {
    const clientId =
      "559563382932-ng9oivt4a88o1qac3qjglmvsv89quaf1.apps.googleusercontent.com";
    const { type, accessToken, user } = await Google.logInAsync({ clientId });

    if (type === "success") {
      /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
      console.log(user);
    }
  }
  /* googleLogin = async () => {
         try {
           const result = await Expo.Google.logInAsync({
             //androidClientId: "Your Client ID",
             iosClientId: 559563382932-ng9oivt4a88o1qac3qjglmvsv89quaf1.apps.googleusercontent.com,   
             scopes: ["profile", "email"]
   
           })
           if (result.type === "success") {
             const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
                firebase.auth().signInAndRetrieveDataWithCredential(credential).then(function(result){
                  console.log(result);
                });
      } else {
        console.log("cancelled")
      }
         } catch (e) {
           console.log("error", e)
         }
     }*/

  // Calling the following function will open the FB login dialogue:
  async facebookLogin() {
    console.log("facebookLogin");
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      "<APP_ID>",
      {
        permissions: ["public_profile"],
      }
    );
    console.log("logInWithReadPermissionsAsync");
    if (type === "success") {
      // Build Firebase credential with the Facebook access token.
      console.log("logInWithReadPermissionsAsync Success");
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      // Sign in with credential from the Facebook user.
      firebase
        .auth()
        .signInWithCredential(credential)
        .catch((error) => {
          alert(error);
          return false;
        });
      return true;
    }
    return true;
  }

  async reAuth(password) {
    var credential = firebase.auth.EmailAuthProvider.credential(
      this.getUser().email,
      password
    );

    return await this.getUser()
      .reauthenticateAndRetrieveDataWithCredential(credential)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}
export let FirebaseAuth = new FirebaseAuthClass();

export class FirebaseDataClass {
  createTesterUserProfile(testerUserProfile) {
    var testerUserProfile = testerUserProfile;
    try {
      var ref = this.getUserRef();
      ref.child("TesterProfile").set(null);
      ref.child("TesterProfile").push(testerUserProfile);
      return true;
    } catch (e) {
      // alert(e.message);
      console.log(e);
      return false;
    }
  }

  updateTesterUserProfile(firstName, lastName, email, birthDay, school, city) {
    var testerUserProfile = {
      firstName,
      lastName,
      email,
      birthDay,
      school,
      city,
    };
    try {
      var ref = this.getUserRef();
      console.log("updateTesterUser", this.getUserRef().child("TesterProfile"));
      // ref.child('TesterProfile').set(null);
      ref.child("TesterProfile").update(testerUserProfile);
      return true;
    } catch (e) {
      // alert(e.message);
      console.log(e);
      return false;
    }
  }
  getTesterUserProfile() {
    try {
      var ref = this.getUserRef().child("TesterProfile");
      ref.on("value", (snap) => {
        snap.forEach((child) => {
          var testerProfile = {
            firstName: child.val().firstName,
            lastName: child.val().lastName,
            email: child.val().email,
            birthDay: child.val().birthDay,
            school: child.val().school,
            city: child.val().city,
            zpoints: child.val().zpoints,
          };
          return testerProfile;
        });
      });
    } catch (e) {
      //alert(e.message);
      console.log(e);
      return null;
    }
  }

  createDeveloperUserProfile(bName, fName, lName, email) {
    var devUserProfile = {
      businessName: bName,
      contactFirstName: fName,
      contactLastName: lName,
      email: email,
    };
    try {
      var ref = this.getUserRef();
      ref.child("DeveloperProfile").set(null);
      ref.child("DeveloperProfile").push(devUserProfile);
      return true;
    } catch (e) {
      //alert(e.message);
      console.log(e);
      return false;
    }
  }

  createGameProfile(gameProfile) {
    // var gameProfile = {
    //   gameName: gName,
    //   gameDesc: gDesc,
    //   gameIconUrl: gIconUrl,
    //   gameVersion: gVersion,
    //   primaryContactEmail: email,
    // }

    var gameProfile = gameProfile;

    try {
      var ref = this.getGamesRef();
      ref.push(gameProfile);
      return true;
    } catch (e) {
      //alert(e.message);
      console.log("My firebase error", e);
      return false;
    }
  }

  deleteGameProfile(gameId) {
    var ref = this.getGamesRef();
    ref.child(gameId).set(null);
  }

  updateGameProfile(gameProfile, id) {
    // var gameProfile = {
    //     gameName: gName,
    //     gameDesc: gDesc,
    //     gameIconUrl: gIconUrl,
    //     gameVersion: gVersion,
    //     primaryContactEmail: email,
    //   }

    var gameProfile = gameProfile;
    // var id = id
    var ref = this.getGamesRef().child(id);
    ref.update(gameProfile);
  }

  getRef(reference) {
    return firebase.database().ref(reference);
  }

  getUserRef() {
    return firebase.database().ref(`users/${firebase.auth().currentUser.uid}`);
  }

  getGamesRef() {
    //return this.getUserRef().child("Games");
    return firebase.database().ref(`games/${firebase.auth().currentUser.uid}`);
  }

  getSurveyRef(gameId) {
    return firebase
      .database()
      .ref(`games/${firebase.auth().currentUser.uid}`)
      .child(gameId)
      .child("surveys");
  }

  getSurvey(userId, gameId) {
    return firebase
      .database()
      .ref(`games/${userId}`)
      .child(gameId)
      .child("surveys");
  }

  createSurveyProfile(gameId, surveyQuestion) {
    var surveyProfile = surveyQuestion;
    var ref = this.getSurveyRef(gameId);
    ref.push(surveyProfile);
  }

  updateSurveyProfile(id, gameId, surveyQuestion) {
    var surveyProfile = surveyQuestion;
    var ref = this.getSurveyRef(gameId).child(id);
    ref.set(surveyProfile);
  }

  getAnswer(developerId, gameId) {
    return firebase
      .database()
      .ref(`games/${developerId}`)
      .child(gameId)
      .child("answer")
      .child(firebase.auth().currentUser.uid);
  }

  addAnswer(developerId, gameId, surveyAnswer) {
    var ref = this.getAnswer(developerId, gameId);
    ref.push(surveyAnswer);
  }

  getGoal() {
    return firebase
      .database()
      .ref(`users/${firebase.auth().currentUser.uid}`)
      .child("goal");
  }
  getRedeem() {
    return firebase
      .database()
      .ref(`users/${firebase.auth().currentUser.uid}`)
      .child("redeem");
  }
  getMaxRedeem() {
    return firebase
      .database()
      .ref(`users/${firebase.auth().currentUser.uid}`)
      .child("redeem")
      .orderByChild("orderConfirmationNumber")
      .limitToLast(1)
  }
  removeGoal(key) {
    firebase
      .database()
      .ref(`users/${firebase.auth().currentUser.uid}`)
      .child("goal/" + key)
      .remove();
    // var ref = this.getGoal();
    // ref.child(key).remove();
  }

  addGoal(brandKey) {
    var ref = this.getGoal();
    ref.push(brandKey);
  }
  updateGoal(refKey, value) {
    firebase
      .database()
      .ref(`users/${firebase.auth().currentUser.uid}/goal/${refKey}/`)
      .update(value);
  }

  addRedeem(redeem) {
    var ref = this.getRedeem();
    ref.push(redeem);
  }
  addAnswerToUserProfile(developerId, gameId, surveyAnswer) {
    var userRef = firebase
      .database()
      .ref(`users/${firebase.auth().currentUser.uid}`)
      .child("surveyAnswer")
      .child(gameId)
      .child(developerId);
    userRef.push(surveyAnswer);
  }

  updateZPoints(refKey, value) {
    var updateValue = firebase
      .database()
      .ref(`users/${firebase.auth().currentUser.uid}/TesterProfile/${refKey}`);
    updateValue.update(value);
  }

  getUserProfileAnswer() {
    return firebase
      .database()
      .ref(`users/${firebase.auth().currentUser.uid}`)
      .child("surveyAnswer");
  }

  updateSurveyResponseProfile(id, gameId, surveyQuestion, surveyResponse) {
    var surveyProfile = {
      surveyQuestion: surveyQuestion,
      surveyResponse: surveyResponse,
    };
    var ref = this.getSurveyRef(gameId).child(id);
    ref.set(surveyProfile);
  }

  async getListOfGames() {
    var ref = this.getGamesRef().orderByChild("value");

    var games = [];
    var resp = await ref.once("value", (itemSnapshot) => {
      return itemSnapshot;
    });

    resp.forEach(function (item) {
      games.push(item);
    });

    return games;
  }

  listenForItems() {
    console.log("listenForItems");
    var itemsRef = FirebaseData.getUserRef().child("DeveloperProfile");
    itemsRef.on("value", (snap) => {
      let items = [];
      snap.forEach((child) => {
        items.push({
          id: child.key,
          value: child.val().businessName,
          developer: child.val().email,
          description: "Testing",
        });
      });
      return items;
    });
  }

  deleteSurveyQuestionFromGameProfile(gameId, surveyId) {
    var ref = this.getGamesRef();
    ref.child(gameId).child("surveys").child(surveyId).set(null);
  }
}
export let FirebaseData = new FirebaseDataClass();
