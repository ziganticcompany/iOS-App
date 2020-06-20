import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";
import bgImage from "../../../assets/images/LoginPageBackground.jpg";
import logo from "../../../assets/images/ziganticlogo.png";
import Icon from "react-native-vector-icons/Ionicons";
import {
  FormInput,
  FormValidationMessage,
  SocialIcon,
  Row,
  Header,
} from "react-native-elements";
//service providers
import { Form, Item, Input, Label, Button } from "native-base";
import { FirebaseAuth } from "../../../providers/firebase";
import { commonStyles } from "../../../navigation/SideMenu";
import { ScrollView } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Loader } from "../../Loader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
import Colors from "../../../constants/Colors";
import Layout from "../../../constants/Layout";


export default class PlayerLoginOLD extends React.Component {
  state = {
    email: "",
    password: "",
    emailError: null,
    passwordError: null,
    isLoading: false,
    routeName: "",
  };




  handleLogin = () => {
    const { email, password } = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email == "") {
      this.setState({ emailError: "Email required" });
      //  return
    } else if (reg.test(email) === false) {
      this.setState({ emailError: "Please enter a valid email" });
      // return;
    }
    if (password == "") {
      this.setState({ passwordError: "Password required" });
      // return
    }
    // else if (password.length < 8) {
    //   this.setState({ passwordError: "Your password must be at least 8 characters" });
    //   // return;
    // }
    if (email == "" || password == "" || reg.test(email) === false) {
      //alert('Username and Password required');
      return;
    }
    this.setState({ isLoading: true });
    FirebaseAuth.login(email, password)
      .then((res) => {
        this.setState({ isLoading: false });
        this.storeData(email, password)
        this.props.navigation.navigate("PlayerTabNavigator");
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        setTimeout(function () {
          alert(error);
        }, 500)
      });
  };

  storeData = async (email, password) => {
    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
    } catch (e) {
      // saving error
    }
  }

  onBackPress = () => {
    this.props.navigation.goBack();
  }
  horizontalLineForInput = () => {
    return (
      <View
        style={{
          backgroundColor: "#ccc",
          height: 1,
          marginTop: -hp("1.4"),
          //marginRight: wp("5"),
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          outerContainerStyles={{ zIndex: 1, height: Layout.headerHeight, backgroundColor: Colors.purpleColor, borderBottomColor: Colors.purpleColor }}
          backgroundColor={Colors.purpleColor}
          innerContainerStyles={{ alignItems: 'center',paddingTop:Layout.paddingTop }}
          leftComponent={
            <Button transparent style={{ justifyContent: 'center', alignItems: 'center', width: 25, }} onPress={() => this.onBackPress()}>
              <Icon size={25} name='ios-arrow-back' type='ionicon' color='white' />
            </Button>
          }
          centerComponent={
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: '700', color: 'white' }}>SIGN IN</Text>
            </View>
          }
          containerStyle={{
            justifyContent: 'space-around',
          }}
        />
        <KeyboardAwareScrollView
          extraScrollHeight = {75}
        >
          <Loader loading={this.state.isLoading} message="Please wait..." />

          {/* <ScrollView style={{ flex: 3, backgroundColor: 'white' }}>
         */}
          <View style={{ backgroundColor: "white", }} >
            <View style={{marginTop:hp("5")}}/> 
            <Image
              source={logo}
              style={{
                width: 250,
                height: hp('25'),
                resizeMode: "contain",
                alignSelf: 'center',
              
              }}
            />
            <View style={{marginTop:hp("5")}}/> 

            <View style={{alignItems:'center',justifyContent:'center', }}>
              <View style={styles.formStyles}>
                <Text style={styles.formTextStyles}>EMAIL</Text>
                <FormInput
                  onChangeText={(email) => {
                    this.setState({ email: email });
                    this.setState({ emailError: null });
                  }}
                  containerStyle={styles.input}
                  placeholder={"Enter email"}
                  autoCapitalize={"none"}
                  keyboardType="email-address"
                  placeholderTextColor={"gray"}
                  value={this.state.email}
                />
                {Platform.OS !== "ios" ? <this.horizontalLineForInput /> : null}
                {this.state.emailError !== "" &&
                  this.state.emailError !== null ? (
                    <Text style={styles.errorMessage}>
                      {this.state.emailError}
                    </Text>
                  ) : null}
              </View>

              <View style={styles.formStyles}>
                <Text style={styles.formTextStyles}>PASSWORD</Text>
                <FormInput
                  onChangeText={(password) => {
                    this.setState({ password: password });
                    this.setState({ passwordError: null });
                  }}
                  secureTextEntry={true}
                  containerStyle={styles.input}
                  placeholder={"Enter password"}
                  placeholderTextColor={"gray"}
                  value={this.state.password}
                />
                {Platform.OS !== "ios" ? <this.horizontalLineForInput /> : null}
                {this.state.passwordError !== "" &&
                  this.state.passwordError !== null ? (
                    <Text style={styles.errorMessage}>
                      {this.state.passwordError}
                    </Text>
                  ) : null}
              </View>
            </View>

            <TouchableOpacity
              style={{
                width: SCREEN_WIDTH - 90,
                height: 45,
                backgroundColor: Colors.purpleColor,
                justifyContent: 'center',
                marginTop: 15,
                alignSelf:'center'
              }}
              onPress={() => this.handleLogin(this.state.email, this.state.password)}
            >
              <Text style={{
                color: 'rgb(255,255,255)',
                fontSize: 14,
                fontWeight: '700',
                textAlign: 'center'
              }}>
                Sign in </Text>
            </TouchableOpacity>

            {/* <Text style={{ fontWeight: '700', fontSize: 20, marginTop: 10, color: 'rgb(100,100,100)' }}>OR</Text> */}

            <View
              style={{
                alignItems: "center",
                marginTop: 10,
              }}
            >
            </View>
            <View style={{ flexDirection: 'row', marginTop: 7, alignSelf:'center' }}>

              <Text style={{
                color: 'rgb(125,125,125)',
                fontSize: 12,
                fontWeight: '600',
                textAlign: 'center',
                marginTop: 10,
              }}>DON'T HAVE AN ACCOUNT? </Text>

              <TouchableOpacity>
                <Text style={{
                  color: 'black',
                  fontSize: 12,
                  fontWeight: '700',
                  textAlign: 'center',
                  marginTop: 10,
                }}
                  onPress={() => this.props.navigation.navigate('PlayerSignup')}>CREATE ONE</Text>
              </TouchableOpacity>
            </View>

          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "rgb(50,50,50)",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 30,
  },
  inputText: {
    fontSize: 13,
    marginHorizontal: 9,
    color: "rgb(150,150,150)",
    fontWeight: "600",
  },
  
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "white",
    margin: 10,
    marginBottom: 20,
  },
  inputContainer: {
    marginTop: 15,
    marginBottom: 18,
    width: SCREEN_WIDTH - 50,
    height: 55,
    borderRadius: 5,
  },
  btnContainer: {
    // height: 50,
    width: wp("90"),
    marginTop: 30,
    marginBottom: 15,
    padding: 15,
    backgroundColor: "rgba(100,100,100,0.4)",
    justifyContent: "center",
  },
  btnText: {
    color: "rgb(255,255,255)",
    fontSize: 19,
    fontWeight: "700",
    textAlign: "center",
  },
  orLoginWith: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 10,
    fontFamily: "Georgia-Italic",
  },
  forgotPass: {
    color: "rgb(95,95,95)",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 10,
  },
  space: {
    height: 45,
  },
  circle: {
    borderWidth: 3,
    borderColor: "rgb(95,95,95)",
    alignItems: "center",
    justifyContent: "center",
    width: 45,
    height: 45,
    //backgroundColor:'#fff',
    borderRadius: 50,
    marginTop: 15,
    marginHorizontal: 10,
  },
  icon: {
    width: 5,
    height: 5,
  },
  altLogin: {
    alignItems: "center",
    flexDirection: "row",
  },
  noAccount: {
    color: "black",
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 10,
  },
  formStyles: {
    // borderWidth: 1,
    
    marginTop: hp("5"),
    width: Platform.OS === "android" ? wp("85") : wp("100"),
    
  },
  formTextStyles: {
    fontSize: 18,
    color: 'rgb(100,100,100)',
    fontWeight: '600',
    marginLeft:Platform.OS === "ios" ? wp("8"):0
  },
  textStyles: {
    fontSize: 14,
    marginTop: 10,
    color: "gray",
  },
  errorMessage: {
    color: "red",
    marginLeft: Platform.OS === "ios"?  wp("8") : 0,
    fontSize: 14,
    marginTop: 5,
  },
  input: {
    color: "gray",
    marginLeft: Platform.OS === "ios"?  wp("8") : 0,
    marginRight: wp("8"),
    marginTop: 0,
  },
  headerText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: 'bold'
  },
});
