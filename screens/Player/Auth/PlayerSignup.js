import React from "react";
import {
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CheckBox from "react-native-checkbox";
import bgImage from "../../../assets/images/backgroundImage.jpg";
import logo from "../../../assets/images/profilepic.png";
import {
  FormInput,
  FormValidationMessage,
  Header,
  Icon,
} from "react-native-elements";
//service providers
import styles from "../../../constants/Styles";
import { FirebaseAuth } from "../../../providers/firebase";
import { FirebaseData } from "../../../providers/firebase";
// import { withTheme, Colors } from "react-native-paper";
//import Icon from "react-native-vector-icons/Ionicons";
//https://github.com/magus/react-native-facebook-login for facebook login
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FlatList } from "react-native-gesture-handler";
import customData from "../../../assets/statesData";
import { Fab, Button } from "native-base";
import { Loader } from "../../Loader";
const { width: WIDTH } = Dimensions.get("window");
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
import ScrollPicker from "react-native-picker-scrollview";
import Colors from "../../../constants/Colors";
import moment from "moment";
import Layout from "../../../constants/Layout";

export default class PlayerSignup extends React.Component {
  state = {
    firstName: "",
    firstNameError: "",
    lastName: "",
    lastNameError: "",
    email: "",
    emailError: "",
    // birthDay: "",
    // birthDayError: "",
    password: "",
    passwordError: "",
    school: "",
    schoolError: "",
    // city: "",
    // cityError: "",
    grade: 9,
    cPassword: "",
    cPasswordError: "",
    tncchecked: false,
    rpechecked: false,
    eulachecked: false,
    errorMessage: "",
    // isDateTimePickerVisible: false,
    phoneError: "",
    phoneNumber: "",
    stateResidence: "",
    // stateError: "",
    // stateList: [],
    // isDialogDisplay: false,
    // selectedState: "Select state of residence",
    termsConditionError: "",
    privacyPolicyError: "",
    isTermsConditionAccepted: false,
    isPrivacyPolicyAccepted: false,
    isReceiveEmailAccepted: false,
    // currentDate: new Date(1950, 0, 1),
    passwordStrength: 0,
    confirmPasswordStrength: 0,
    isLoading: false,
    scrollSelectedValue: "Alabama",
  };

  componentDidMount() {
    // let data = [];
    // const lapsList = customData.map((item) => {
    //   data.push(item.name);
    // });
    // this.setState({ stateList: data });
    // var date = new Date().getDate(); //Current Date
    // var month = new Date().getMonth(); //Current Month
    // var year = new Date().getFullYear(); //Current Year
    // this.setState({
    //   //Setting the value of the date time
    //   currentDate: new Date(year, month, date),
    // });
  }

  handleSignUp = () => {
    const {
      firstName,
      lastName,
      email,
      // birthDay,
      // city,
      password,
      passwordStrength,
      isPrivacyPolicyAccepted,
      cPassword,
      isTermsConditionAccepted,
      // selectedState,
      phoneNumber,
      isReceiveEmailAccepted,
    } = this.state;
    if (firstName == "") {
      this.setState({ firstNameError: "Please enter first name" });
      return;
    }
    if (lastName == "") {
      this.setState({ lastNameError: "Please enter last name" });
      return;
    }
    if (phoneNumber == "") {
      this.setState({ phoneError: "Please enter phone number" });
      return;
    }
    const phoneReg = /^[0]?[1234567890]\d{9}$/;
    if (phoneReg.test(phoneNumber) === false) {
      this.setState({ phoneError: "Please enter a valid phone number" });
      return;
    }
    if (email == "") {
      this.setState({ emailError: "Please enter an email" });
      return;
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      this.setState({ emailError: "Please enter a valid email" });
      return;
    }

    // if (birthDay == "") {
    //   this.setState({ birthDayError: "Please enter birthday" });
    //   return;
    // }
    // if (city == "") {
    //   this.setState({ cityError: "Please enter city of residence" });
    //   return;
    // }
    // if (selectedState == "Enter State of residence") {
    //   this.setState({ stateError: "Please enter state of residence" });
    //   return;
    // }

    if (password == "") {
      this.setState({ passwordError: "Please enter a password" });
      return;
    }
    // if (password.length < 8) {
    //     this.setState({ passwordError: "Your password must be at least 8 characters" });
    //     return;
    // }
    if (password.search(/[a-z]/i) < 0) {
      //this.setState({ passwordError: "Your password must contain at least one letter." });
      //return;
    }
    if (password.search(/[0-9]/) < 0) {
      //this.setState({ passwordError: "Your password must contain at least one digit." });
      //return;
    }

    if (passwordStrength == 1) {
      //  this.setState({ passwordError: "Your password must contain at least one special character." });
      return;
    }

    if (cPassword == "") {
      this.setState({ cPasswordError: "Please confirm your password" });
      return;
    }
    if (password != cPassword) {
      // this.setState({ passwordError: "Password and Confirm Password didn't match" });
      this.setState({
        cPasswordError: "Password and Confirm Password didn't match",
      });
      return;
    }

    if (cPassword == "") {
      this.setState({ cPasswordError: "Please confirm your password" });
      return;
    }
    if (isTermsConditionAccepted === false) {
      this.setState({
        termsConditionError:
          "Please agree to our terms and conditions to proceed",
      });
      return;
    }
    // if (isPrivacyPolicyAccepted === false) { this.setState({ privacyPolicyError: "Please agree our privacy policy to proceed" }); return; }

    this.setState({ isLoading: true });
    FirebaseAuth.createAccount(email, password)
      .then(() => {
        var testerUserProfile = {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          email: email,
          // birthDay: birthDay,
          // city: city,
          // stateResidence: selectedState,
          isTermsConditionAccepted: isTermsConditionAccepted,
          isReceiveEmailAccepted: isReceiveEmailAccepted,
          ZPoints: 0,
          lifeTimeZPoints: 0,
          lifeTimeEarning: 0,
        };

        FirebaseData.createTesterUserProfile(testerUserProfile);
        this.setState({ isLoading: false });
        this.props.navigation.navigate("PlayerTabNavigator");
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        alert(error);
      });
  };

  // showDateTimePicker = () => {
  //   this.setState({ isDateTimePickerVisible: true });
  // };

  // hideDateTimePicker = () => {
  //   this.setState({ isDateTimePickerVisible: false });
  // };

  // handleDatePicked = (birthDay) => {
  //   // utc = birthDay.getTime() + birthDay.getTimezoneOffset() * 60000;
  //   // offset = 17;
  //   // nd = new Date(utc + 3600000 * offset);
  //   // this.setState({ birthDay: nd.toISOString().split("T")[0] });
  //   // this.setState({ birthDayError: null });
  //   this.setState({ birthDay: moment(birthDay).format('YYYY-MM-DD'), birthDayError: null })

  //   this.hideDateTimePicker();
  // };

  // This method invoke when last name change
  onLastNameChange = (value) => {
    this.setState({ lastNameError: null, lastName: value });
  };

  // This method invoke when phone number change
  onNumberChange = (value) => {
    this.setState({ phoneNumber: value, phoneError: "" });
  };

  // This method invoke when state change
  // onStateChange = (value) => {
  //   this.setState({ stateResidence: value, stateError: "" });
  // };
  // This method invoke when state change
  // onCityChange = (value) => {
  //   this.setState({ city: value, cityError: "" });
  // };

  // onSelectState = (item) => {
  //   this.setState({ isDialogDisplay: false, selectedState: item.name });
  // };

  // renderStateItem = ({ item, index }) => {
  //   return (
  //     <TouchableOpacity
  //       style={{ height: hp("3") }}
  //       onPress={() => {
  //         this.onSelectState(item);
  //       }}
  //     >
  //       <Text style={{ color: "#000", textAlign: "center", fontSize: 18 }}>{item.name}</Text>
  //     </TouchableOpacity>
  //   );
  // };

  // showDialog = () => {
  //   this.setState({
  //     isDialogDisplay: !this.state.isDialogDisplay,
  //     stateError: "",
  //   });
  // };

  horizontalLine = () => {
    return (
      <View style={{ backgroundColor: "#ccc", height: 1, marginTop: 5 }} />
    );
  };

  horizontalLineForInput = () => {
    return (
      <View
        style={{ backgroundColor: "#ccc", height: 1, marginTop: -hp("1.4") }}
      />
    );
  };
  onTermsConditionChange = () => {
    this.setState({
      isTermsConditionAccepted: !this.state.isTermsConditionAccepted,
      termsConditionError: "",
    });
  };

  onRecieveEmailChange = () => {
    this.setState({
      isReceiveEmailAccepted: !this.state.isReceiveEmailAccepted,
    });
  };

  onPrivacyPolicyChange = (value) => {
    this.setState({ isPrivacyPolicyAccepted: value, privacyPolicyError: "" });
  };

  // testPassword = (pwString) => {
  //     var strength = 0;

  //     strength += /[A-Z]+/.test(pwString) ? 1 : 0;
  //     strength += /[a-z]+/.test(pwString) ? 1 : 0;
  //     strength += /[0-9]+/.test(pwString) ? 1 : 0;
  //     strength += /[\W]+/.test(pwString) ? 1 : 0;

  //     switch (strength) {
  //         case 3:
  //             // its's medium!
  //             this.setState({ passwordStrength: 2 })
  //             break;
  //         case 4:
  //             // it's strong!
  //             this.setState({ passwordStrength: 3 })
  //             break;
  //         default:
  //             // it's weak!
  //             this.setState({ passwordStrength: 1 })
  //             break;
  //     }
  // }

  checkPassStrength = (pass) => {
    var score = this.scorePassword(pass);
    if (score > 80) return 3;
    if (score > 30) return 2;
    if (score >= 20) return 1;

    return 0;
  };
  scorePassword = (pass) => {
    var score = 0;
    if (!pass) return score;

    // award every unique letter until 5 repetitions
    var letters = new Object();
    for (var i = 0; i < pass.length; i++) {
      letters[pass[i]] = (letters[pass[i]] || 0) + 1;
      score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    var variations = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass),
    };

    variationCount = 0;
    for (var check in variations) {
      variationCount += variations[check] == true ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return parseInt(score);
  };

  onPasswordChange = (value) => {
    this.setState({ password: value, passwordError: null }, () => {
      if (this.state.password.length < 6) {
        if (this.state.password !== "") {
          this.setState({ passwordStrength: 1 });
        } else {
          this.setState({ passwordStrength: 0 });
        }
      } else {
        this.setState({
          passwordStrength: this.checkPassStrength(this.state.password),
        });
      }
    });
  };
  onConfirmPasswordChange = (value) => {
    this.setState({ cPassword: value, cPasswordError: null }, () => {
      //this.setState({ confirmPasswordStrength: this.checkPassStrength(this.state.cPassword) })
    });
  };
  strongPassword = (value) => {
    if (value === 1) {
      return (
        <Text style={[myStyles.passwordChecker, { color: "red" }]}>
          Weak Password
        </Text>
      );
    } else if (value === 2) {
      return (
        <Text style={[myStyles.passwordChecker, { color: "#d4c417" }]}>
          Ok Password
        </Text>
      );
    } else if (value === 3) {
      return (
        <Text style={[myStyles.passwordChecker, { color: "green" }]}>
          Strong Password
        </Text>
      );
    }
  };

  onBackPress = () => {
    this.props.navigation.goBack();
  };

  // onConfirmDialog = () => {
  //   this.setState({
  //     isDialogDisplay: false,
  //     selectedState: this.state.scrollSelectedValue,
  //   });
  // };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          outerContainerStyles={{
            zIndex: 1,
            height: Layout.headerHeight,
            borderBottomColor: Colors.purpleColor,
            backgroundColor: Colors.purpleColor,
          }}
          innerContainerStyles={{
            alignItems: "center",
            paddingTop: Layout.paddingTop,
          }}
          leftComponent={
            <Button
              transparent
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 25,
              }}
              onPress={() => this.onBackPress()}
            >
              <Icon
                size={25}
                name="ios-arrow-back"
                type="ionicon"
                color="white"
              />
            </Button>
          }
          centerComponent={
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 20, fontWeight: "700", color: "white" }}>
                JOIN ZIGANTIC
              </Text>
            </View>
          }
          containerStyle={{
            justifyContent: "space-around",
          }}
        />

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
            padding: 1,
          }}
        >
          <SafeAreaView />
          <Loader
            loading={this.state.isLoading}
            message="Creating account..."
          />
          {/* <Modal visible={this.state.isDialogDisplay} transparent={true}>
            <View style={myStyles.dialogContainer}>
              <View style={myStyles.stateDialogStyles}>
                <View
                  style={{
                    height: hp("38"),
                    width: wp("92%"),
                    backgroundColor: "white",
                    borderRadius: 15,
                  }}
                >
                  <Text style={myStyles.statesTextStyles}>Select States</Text>

                  <ScrollPicker
                    ref={(sp) => {
                      this.sp = sp;
                    }}
                    dataSource={this.state.stateList}
                    selectedIndex={0}
                    itemHeight={50}
                    wrapperHeight={150}
                    wrapperColor={"#ffffff"}
                    highlightColor={"#d8d8d8"}
                    renderItem={(data, index, isSelected) => {
                      return (
                        <View>
                          <Text
                            style={{ color: isSelected ? "#000" : "#808080" }}
                          >
                            {data}
                          </Text>
                        </View>
                      );
                    }}
                    onValueChange={(data, selectedIndex) => {
                      this.setState({ scrollSelectedValue: data });
                    }}
                  />

                  <TouchableOpacity
                    style={{
                      height: 50,
                      // backgroundColor:"transparent",
                      alignItems: "center",
                      justifyContent: "center",
                      borderColor: "#CCC",
                      borderWidth: 1,
                      borderBottomLeftRadius: 15,
                      borderBottomRightRadius: 15,
                    }}
                    onPress={() => {
                      this.onConfirmDialog();
                    }}
                  >
                    <Text style={{ color: "#00a8ff", fontSize: 18 }}>
                      Confirm
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                    marginTop: 10,
                    borderRadius: 15,
                  }}
                  onPress={() => {
                    this.showDialog();
                  }}
                >
                  <Text
                    style={{
                      color: "#00a8ff",
                      fontSize: 18,
                      justifyContent: "center",
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal> */}

          <KeyboardAwareScrollView
            enableOnAndroid
            showsVerticalScrollIndicator={false}
            extraScrollHeight={25}
          >
            <View style={{ width: wp("90") }}>
              {/* <View style={{ marginTop: 30, marginBottom: 10, alignItems: 'center' }}>
                            <Image source={logo} style={{ width: 75, height: 75 }} />
                        </View> */}

              <View style={myStyles.formStyles}>
                <Text style={myStyles.generalFontStyle}>GENERAL</Text>
                <Text style={myStyles.formTextStyles}>FIRST NAME</Text>
                <FormInput
                  onChangeText={(firstName) => {
                    this.setState({ firstName });
                    this.setState({ firstNameError: "" });
                  }}
                  containerStyle={myStyles.input}
                  placeholder={"Enter first name"}
                  placeholderTextColor={"gray"}
                  value={this.state.firstName}
                />
                {Platform.OS !== "ios" ? <this.horizontalLineForInput /> : null}
                {this.state.firstNameError !== "" &&
                this.state.firstNameError !== null ? (
                  <Text style={myStyles.errorMessage}>
                    {this.state.firstNameError}
                  </Text>
                ) : null}
              </View>
              <View style={myStyles.formStyles}>
                <Text style={myStyles.formTextStyles}>LAST NAME</Text>
                <FormInput
                  onChangeText={this.onLastNameChange}
                  containerStyle={myStyles.input}
                  placeholder={"Enter last name"}
                  placeholderTextColor={"gray"}
                  value={this.state.lastName}
                />
                {Platform.OS !== "ios" ? <this.horizontalLineForInput /> : null}
                {this.state.lastNameError !== "" &&
                this.state.lastNameError !== null ? (
                  <Text style={myStyles.errorMessage}>
                    {this.state.lastNameError}
                  </Text>
                ) : null}
              </View>
              <View style={myStyles.formStyles}>
                <Text style={myStyles.formTextStyles}>PHONE NUMBER</Text>
                <FormInput
                  onChangeText={this.onNumberChange}
                  containerStyle={myStyles.input}
                  placeholder={"Enter phone number"}
                  placeholderTextColor={"gray"}
                  keyboardType="numeric"
                  // value={this.state.phoneNumber}
                />
                {Platform.OS !== "ios" ? <this.horizontalLineForInput /> : null}
                {this.state.phoneError !== "" &&
                this.state.phoneError !== null ? (
                  <Text style={myStyles.errorMessage}>
                    {this.state.phoneError}
                  </Text>
                ) : null}
              </View>
              <View style={myStyles.formStyles}>
                <Text style={myStyles.formTextStyles}>EMAIL</Text>
                <FormInput
                  onChangeText={(email) => {
                    this.setState({ email: email });
                    this.setState({ emailError: null });
                  }}
                  containerStyle={[myStyles.input]}
                  placeholder={"Enter email"}
                  placeholderTextColor={"gray"}
                  autoCapitalize={"none"}
                  keyboardType="email-address"
                  value={this.state.email}
                />
                {Platform.OS !== "ios" ? <this.horizontalLineForInput /> : null}
                {this.state.emailError !== "" &&
                this.state.emailError !== null ? (
                  <Text style={myStyles.errorMessage}>
                    {this.state.emailError}
                  </Text>
                ) : null}
              </View>
              {/* <View style={myStyles.formStyles}>
                <Text style={myStyles.formTextStyles}>BIRTHDAY</Text>
                <Text
                  onPress={this.showDateTimePicker}
                  style={myStyles.textStyles}
                >
                  {this.state.birthDay
                    ? this.state.birthDay
                    : "Select birthday"}
                </Text>
                <this.horizontalLine />
                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this.handleDatePicked}
                  onCancel={this.hideDateTimePicker}
                  // style={styles.input}
                  minimumDate={new Date(1950, 0, 1)}
                  maximumDate={this.state.currentDate}
                  date={new Date()}
                />
                {this.state.birthDayError !== "" &&
                  this.state.birthDayError !== null ? (
                    <Text style={myStyles.errorMessage}>
                      {this.state.birthDayError}
                    </Text>
                  ) : null}
              </View> */}
              {/* <View style={{
                        marginTop: 15,
                        marginBottom: 18,
                        width: SCREEN_WIDTH - 55,
                        height: 55,
                        borderRadius: 5,
                    }}>
                        <Text style={{
                            fontSize: 13,
                            marginHorizontal: 9,
                            color: 'rgb(150,150,150)',
                            fontWeight: '600'
                        }}>   School</Text>
                        <FormInput onChangeText={(school) => {
                            this.setState({ school })
                            this.setState({ schoolError: null })
                        }}
                            style={styles.input}
                            placeholder={'Enter school name'}
                            placeholderTextColor={'gray'}
                            value={this.state.school}
                        />
                        <FormValidationMessage>{this.state.schoolError}</FormValidationMessage>
                    </View> */}

              {/* <View style={myStyles.formStyles}>
                <Text style={myStyles.formTextStyles}>CITY OF RESIDENCE</Text>
                <FormInput
                  onChangeText={this.onCityChange}
                  containerStyle={myStyles.input}
                  placeholder={"Enter city of residence"}
                  placeholderTextColor={"gray"}
                  value={this.state.city}
                />
                {Platform.OS !== "ios" ? <this.horizontalLineForInput /> : null}
                {this.state.cityError !== "" &&
                this.state.cityError !== null ? (
                  <Text style={myStyles.errorMessage}>
                    {this.state.cityError}
                  </Text>
                ) : null}
              </View> */}

              {/* <View style={myStyles.formStyles}>
                <Text style={myStyles.formTextStyles}>STATE OF RESIDENCE</Text>
                <Text
                  onPress={this.showDialog}
                  style={myStyles.textStyles}
                >
                  {this.state.selectedState}
                </Text>
                <this.horizontalLine />
                {this.state.stateError !== "" &&
                  this.state.stateError !== null ? (
                    <Text style={myStyles.errorMessage}>
                      {this.state.stateError}
                    </Text>
                  ) : null}
              </View> */}

              {/* <View style = {{marginTop: 15,
                        marginBottom: 18,
                        width: SCREEN_WIDTH - 55,
                        height: 55,
                        borderRadius: 5,}}>            
                        <Text style = {{fontSize: 13,
                            marginHorizontal: 9,
                            color: 'rgb(150,150,150)',
                            fontWeight: '600'}}>   Grade</Text>
                        <Text style = {styles.inputText}>   {this.state.grade}</Text>
                        <Slider
                            style={{ width: 250, marginHorizontal:30}}
                            step={1}
                            minimumValue={1}
                            maximumValue={12}
                            value={this.state.grade}
                            onValueChange={(grade) => this.setState({ grade })}
                        />
                        <View style = {styles.lineStyle} />
                    </View>                                    */}
              <View style={{ marginTop: hp("2") }} />
              <View style={myStyles.formStyles}>
                <Text style={myStyles.generalFontStyle}>PASSWORD</Text>
                <Text style={myStyles.formTextStyles}>PASSWORD</Text>
                <Text
                  style={{
                    flexDirection: "row",
                    width: wp("90"),
                    marginTop: 5,
                    color: "gray",
                  }}
                >
                  Must include a symbol or number and have at least 6 characters
                </Text>
                {this.strongPassword(this.state.passwordStrength)}
                <View style={{ flexDirection: "row", width: wp("90") }}>
                  <FormInput
                    onChangeText={this.onPasswordChange}
                    secureTextEntry={true}
                    //inputStyle={myStyles.input}
                    containerStyle={[myStyles.input, { flex: 1 }]}
                    placeholder={"Enter password"}
                    placeholderTextColor={"gray"}
                    value={this.state.password}
                  />
                </View>
                {Platform.OS !== "ios" ? <this.horizontalLineForInput /> : null}
                {this.state.passwordError !== "" &&
                this.state.passwordError !== null ? (
                  <Text style={myStyles.errorMessage}>
                    {this.state.passwordError}
                  </Text>
                ) : null}
              </View>

              <View style={myStyles.formStyles}>
                <Text style={myStyles.formTextStyles}>CONFIRM PASSWORD</Text>
                <View style={{ flexDirection: "row", width: wp("90") }}>
                  <FormInput
                    onChangeText={this.onConfirmPasswordChange}
                    secureTextEntry={true}
                    containerStyle={[myStyles.input, { flex: 1 }]}
                    placeholder={"Confirm password"}
                    placeholderTextColor={"gray"}
                    value={this.state.cPassword}
                  />
                  {this.strongPassword(this.state.confirmPasswordStrength)}
                </View>
                {Platform.OS !== "ios" ? <this.horizontalLineForInput /> : null}
                {this.state.cPasswordError !== "" &&
                this.state.cPasswordError !== null ? (
                  <Text style={myStyles.errorMessage}>
                    {this.state.cPasswordError}
                  </Text>
                ) : null}
              </View>
              <View style={{ marginTop: hp("2") }} />
              <View style={myStyles.checkBoxesStyles}>
                <TouchableOpacity
                  style={{ alignItems: "center", justifyContent: "center" }}
                  onPress={() => {
                    this.onTermsConditionChange();
                  }}
                >
                  <Icon
                    type="font-awesome"
                    name={
                      this.state.isTermsConditionAccepted === false
                        ? "circle-thin"
                        : "check-circle"
                    }
                    color={
                      this.state.isTermsConditionAccepted === false
                        ? "#808080"
                        : "#000"
                    }
                    size={22}
                  />
                </TouchableOpacity>
                {/* <Text onPress={() => this.props.navigation.navigate('PlayerOnboarding')} style={{ color: 'black' }}> I Accept the Terms and Conditions</Text> */}
                <Text
                  onPress={() => this.onTermsConditionChange()}
                  style={{ color: "black", marginStart: 10 }}
                >
                  I agree to the{" "}
                  <Text
                    onPress={() => this.props.navigation.navigate("Terms")}
                    style={{ fontWeight: "600" }}
                  >
                    terms and conditions
                  </Text>
                  ,{" "}
                  <Text
                    onPress={() =>
                      this.props.navigation.navigate("PrivacyPolicy")
                    }
                    style={{ fontWeight: "600" }}
                  >
                    privacy{"\n"} policy
                  </Text>
                  , and{" "}
                  <Text
                    onPress={() => this.props.navigation.navigate("NDA")}
                    style={{ fontWeight: "600" }}
                  >
                    NDA
                  </Text>
                  .
                </Text>
              </View>
              {this.state.termsConditionError !== "" &&
              this.state.termsConditionError !== null ? (
                <Text
                  style={[myStyles.errorMessage, { marginStart: wp("13") }]}
                >
                  {this.state.termsConditionError}
                </Text>
              ) : null}

              <View style={myStyles.checkBoxesStyles}>
                <TouchableOpacity
                  style={{ alignItems: "center", justifyContent: "center" }}
                  onPress={() => {
                    this.onRecieveEmailChange();
                  }}
                >
                  <Icon
                    type="font-awesome"
                    name={
                      this.state.isReceiveEmailAccepted === false
                        ? "circle-thin"
                        : "check-circle"
                    }
                    color={
                      this.state.isReceiveEmailAccepted === false
                        ? "#808080"
                        : "#000"
                    }
                    size={22}
                  />
                </TouchableOpacity>
                {/* <Text onPress={() => this.props.navigation.navigate('PlayerOnboarding')} style={{ color: 'black' }}> I agree to the EULA and NDA </Text> */}
                <Text
                  style={{ color: "black", marginStart: 10 }}
                  onPress={() => {
                    this.onRecieveEmailChange();
                  }}
                >
                  {" "}
                  I would like to receive promotional emails
                </Text>
              </View>
            </View>
            <View style={myStyles.submitContainer}>
              <Text style={styles.space}></Text>
              <TouchableOpacity
                onPress={() => this.handleSignUp()}
                style={{
                  width: SCREEN_WIDTH - 90,
                  height: 35,
                  backgroundColor: "rgba(100,100,100,0.4)",
                  justifyContent: "center",
                  marginTop: 10,
                  marginBottom: 40,
                  alignSelf: "center",
                }}
              >
                <Text style={styles.btnText}>Create Account</Text>
              </TouchableOpacity>

              {/* <Text
                style={{
                  color: "rgb(125,125,125)",
                  fontSize: 14,
                  fontWeight: "600",
                  textAlign: "center",
                  marginBottom: 10,
                }}
              >
                Already have an account?{" "}
                <Text
                  style={{
                    color: "black",
                    fontSize: 14,
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                  onPress={() => this.props.navigation.navigate("PlayerLogin")}
                >
                  SIGN IN
                </Text>
              </Text> */}
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  }
}

const myStyles = StyleSheet.create({
  dialogContainer: {
    flex: 1,
    paddingHorizontal: wp("2"),
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  stateDialogStyles: {
    height: hp("45"),
    width: wp("92%"),
    marginStart: wp("3.5"),
    // backgroundColor: "white",
    position: "absolute",
    bottom: hp("5"),
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
    // elevation: 5,
    // borderRadius: 5,
  },
  statesTextStyles: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    marginTop: 5,
  },
  generalFontStyle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formStyles: {
    // marginTop: hp("1"),
    marginTop: hp("4"),
    width: wp("90"),
  },
  formTextStyles: {
    fontSize: 15,
    color: "rgb(60,60,60)",
    fontWeight: "600",
  },
  textStyles: {
    color: "gray",
    fontSize: 14,
    marginTop: 10,
  },
  errorMessage: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  checkBoxesStyles: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginTop: 10,
    width: wp("90"),
  },
  input: {
    color: "gray",
    fontSize: 12,
    marginLeft: 0,
    marginTop: 0,
  },
  passwordChecker: {
    // fontSize: 14,
    marginTop: 15,
  },
  headerText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
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
  space: {
    height: 45,
  },
  btnText: {
    color: "rgb(255,255,255)",
    fontSize: 19,
    fontWeight: "700",
    textAlign: "center",
  },
});
