import * as firebase from "firebase";
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: 'AIzaSyD49Vb4EkyW8M9OYbWCmTWWfdb2rpDV0gc',
    authDomain:'myfirsttestproject-c712f.firebaseapp.com',
    databaseURL: "https://myfirsttestproject-c712f.firebaseio.com",    
    storageBucket: "myfirsttestproject-c712f.appspot.com",
//  projectId: "YOUR_PROJECT_ID",
//  storageBucket: "YOUR_STORAGE_BUCKET",
//  messagingSenderId: "YOUR_MESSAGING_ID"
};
//firebase.initializeApp(config);

//firebase.firestore().settings(settings);
if (!firebase.apps.length) 
    { 
        firebase.initializeApp(config);
        //firebase.firestore().settings(settings);
    } 
else
    {
        firebase.app();
    }   
export default firebase;
