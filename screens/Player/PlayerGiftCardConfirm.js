import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Linking
} from "react-native";
import { Header, Icon } from "react-native-elements";
import Colors from "../../constants/Colors";
import { FirebaseData } from "../../providers/firebase";
import { Button, Card, CardItem } from "native-base";
import card from "../../assets/images/giftcard.png";
const WIDTH = Dimensions.get("window").width;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Progress from "react-native-progress";
import qs from "qs";
import { CheckBox } from "react-native-elements";
import axios from "axios";
const SCREEN_WIDTH = Dimensions.get("window").width;
import { Loader } from "../Loader";
import Layout from "../../constants/Layout";
export default class PlayerGiftCardConfirm extends Component {
  state = {
    gifCardDetails: "",
    imageUrls: "",
    rewardName: "",
    brandKey: "",
    isGoal: false,
    key: "",
    totalPoints: 1800,
    myPoints: 500,
    selectedValue: "",
    selectedPoints: 0,
    refKey: "",
    goalPoints: "",
    brandName: "",
    firstName: "",
    lastName: "",
    userEmail: "",
    userId: "",
    isLoading: false,
    myEarning: 0,
  };

  componentDidMount() {
    let data = this.props.navigation.state.params;
    if (data !== "" && data !== null && data !== undefined) {
      let myAllData = data.dataItem;
      this.setState(
        {
          gifCardDetails:
            myAllData !== "" && myAllData !== null && myAllData !== undefined
              ? myAllData
              : "",
          imageUrls:
            myAllData.imageUrls["300w-326ppi"] !== "" &&
            myAllData.imageUrls["300w-326ppi"] !== null &&
            myAllData.imageUrls["300w-326ppi"] !== undefined
              ? myAllData.imageUrls["300w-326ppi"]
              : "",
          rewardName:
            myAllData.items[0].rewardName !== "" &&
            myAllData.items[0].rewardName !== null &&
            myAllData.items[0].rewardName !== undefined
              ? this.removePrice(myAllData.items[0].rewardName)
              : "",
          brandKey:
            myAllData.brandKey !== "" &&
            myAllData.brandKey !== null &&
            myAllData.brandKey !== undefined
              ? myAllData.brandKey
              : "",
          brandName:
            myAllData.brandName !== "" &&
            myAllData.brandName !== null &&
            myAllData.brandName !== undefined
              ? myAllData.brandName
              : "",
          selectedPoints:
            data.selectedPoints !== "" &&
            data.selectedPoints !== null &&
            data.selectedPoints !== undefined
              ? data.selectedPoints
              : "",
          selectedValue:
            data.selectedValue !== "" &&
            data.selectedValue !== null &&
            data.selectedValue !== undefined
              ? data.selectedValue
              : "",
        },
        () => {
          this.getGoal();
          this.getAvailableZPoints();
          this.getTesterUserProfile();
        }
      );
    }
  }


  removePrice(value) {
    return value.replace(/\$.*\d+/g, '');
  }

  getTesterUserProfile() {
    try {
      var ref = FirebaseData.getUserRef().child("TesterProfile");

      ref.on("value", (snap) => {
        snap.forEach((child) => {
          this.setState({
            firstName: child.val().firstName,
            lastName: child.val().lastName,
            userEmail: child.val().email,
            myEarning:
              child.val().lifeTimeEarning !== null &&
              child.val().lifeTimeEarning !== "" &&
              child.val().lifeTimeEarning !== undefined
                ? child.val().lifeTimeEarning
                : 0,
            userId: child.key,
          });
        });
      });
    } catch (e) {
      //alert(e.message);
      return null;
    }
  }

  handleEmail = () => {};

  getGoal = () => {
    var itemsRef = FirebaseData.getGoal();
    itemsRef.on("value", (snap) => {
      let items = [];
      snap.forEach((child) => {
        if (snap.numChildren() > 0) {
          this.setState({ isGoalAlready: true, key: child.key });
        } else {
          this.setState({ isGoalAlready: false });
        }

        if (this.state.brandKey === child.val().brandKey) {
          this.setState({
            isGoal: true,
            goalPoints: child.val().selectedPoints,
          });
        }
      });
    });
  };
  getAvailableZPoints() {
    // this.setState({ loading: true });
    try {
      var ref = FirebaseData.getUserRef().child("TesterProfile");
      ref.on("value", (snap) => {
        snap.forEach((child) => {
          this.setState({
            myPoints:
              child.val().ZPoints !== "" &&
              child.val().ZPoints !== undefined &&
              child.val().ZPoints != null
                ? child.val().ZPoints
                : 0,
            error: null,
            loading: false,
            refKey: child.key,
          });
        });
      });
    } catch (e) {
      //alert(e.message);
    }
  }

  getUniqueNumber = () => {
    let uniqueNum = 100000;
    let data = FirebaseData.getMaxRedeem();

    data.on("value", (snap) => {
      snap.forEach((child) => {
        if (child.val().orderConfirmationNumber) {
          uniqueNum = ++child.val().orderConfirmationNumber;
        }
      });
    });

    return uniqueNum;
  };

  redeemReward = () => {
    const {
      brandKey,
      imageUrls,
      selectedPoints,
      selectedValue,
      rewardName,
      gifCardDetails,
      myPoints,
      refKey,
      goalPoints,
      myEarning,
    } = this.state;
    if (myPoints < selectedPoints) {
      alert("You don't have the required number of points");
      return;
    }
    this.setState({ isLoading: true });
    var today = new Date();
    let date =
      parseInt(today.getMonth() + 1) +
      "/" +
      today.getDate() +
      "/" +
      today.getFullYear();

    let orderConfirmationNumber = this.getUniqueNumber();
    try {
      var addRedeem = {
        brandKey: brandKey,
        rewardName: rewardName,
        imageUrls: imageUrls,
        points: selectedPoints,
        price: selectedValue,
        gifCardDetails: gifCardDetails,
        date: date,
        isStatus: true,
        orderConfirmationNumber: orderConfirmationNumber,
      };
      FirebaseData.addRedeem(addRedeem);
      var updateZPoints = myPoints - selectedPoints;
      var updateEarning = myEarning + selectedValue;
      let myUpdateValue = {
        ZPoints: updateZPoints,
        lifeTimeEarning: updateEarning,
      };
      FirebaseData.updateZPoints(refKey, myUpdateValue);
      if (goalPoints == selectedPoints) {
        FirebaseData.removeGoal(this.state.key);
        this.setState({ isGoalAlready: false });
      }
      this.setState({ isGoal: false });

      let htmlFormat = `
      <div>
        <p>Hello ${this.state.firstName},</p>
        <br/>
        <p>Your $${selectedValue}.00 Zigantic Gift Card has arrived! Here is the gift card you ordered from Zigantic. Make sure to save this email since it contains vital information that is necessary for you to use your gift card!</p>
        <br/>
        <img src='${imageUrls}' width="250"/>
        <br/>
        <p>Reward: ${rewardName}</p>
        <p>Order Confirmation Number: ${orderConfirmationNumber}</p>
        <p>Claim Code: ${brandKey}</p>
        <br/>
        <p>Redemption Instructions: ${gifCardDetails.items[0].redemptionInstructions}</p>
        <br/>
        <p>By proceeding, you are agreeing to the Terms and Conditions of this business, as well as Zigantic LLC. Thank you for using Zigantic and we hope that you continue testing the newest games! </p>
        <br/>
        <br/>
        <p>Thanks,</p>
        <p>The Zigantic Team</p>

      </div>`;

      this.sendConfirmationMail(htmlFormat);
    } catch (error) {
      alert(error);
    }
  };

  sendConfirmationMail = (htmlFormat) => {
    let url =
      "https://us-central1-myfirsttestproject-c712f.cloudfunctions.net/sendMail/";
    axios({
      method: "post",
      url: url,
      headers: {},
      data: {
        dest: this.state.userEmail, // This is the body part
        subject: "Your Zigantic Gift Card is here",
        htmlFormat: htmlFormat,
      },
    })
      .then((response) => {
        this.setState({ isLoading: false });
        this.props.navigation.navigate("PlayerGiftCardSent", {
          dataItem: this.state.gifCardDetails,
          selectedPoints: this.state.selectedPoints,
          selectedValue: this.state.selectedValue,
        });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
      });
  };

  openLink = (value) => {
    if (value !== undefined && value !== "" && value !== null) {
      Linking.openURL(value);
    }
  };

  render() {
    const { rewardName, imageUrls, selectedPoints, userEmail } = this.state;

    return (
      <View style={styles.mainContainer}>
        <Loader loading={this.state.isLoading} message="Confirming..." />
        <Header
          outerContainerStyles={{
            zIndex: 1,
            height: Layout.headerHeight,
            borderBottomColor: Colors.purpleColor,
          }}
          backgroundColor={Colors.purpleColor}
          innerContainerStyles={{ alignItems: "center",paddingTop:Layout.paddingTop }}
          leftComponent={
            <Button
              transparent
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon
                size={25}
                name="ios-arrow-back"
                type="ionicon"
                color="white"
              />
              <Text style={{ fontSize: 18, color: "white", fontWeight: "600" }}>
                {" "}
                Cancel
              </Text>
            </Button>
          }
          //rightComponent={<Icon name='window-close' type='font-ayarn add @ant-design/icons-reactwesome'  color='#fff' onPress={() => this.props.navigation.navigate('PlayerGamesList')}/>} //
          containerStyle={{
            justifyContent: "space-around",
          }}
        />

        <ScrollView style={styles.containerScrollView}>
          <Card
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 15,
            }}
          >
            <CardItem style={{ flexDirection: "column" }}>
              <Image style={styles.giftCardImg} source={{ uri: imageUrls }} />
            </CardItem>
          </Card>

          <Card style={{ justifyContent: "flex-start" }}>
            <CardItem style={{ flexDirection: "column" }}>
              <View
                style={{
                  flex: 1,
                  marginVertical: 10,
                  marginHorizontal: 10,
                  alignSelf: "flex-start",
                }}
              >
                <Text style={styles.confirm}>Confirm your reward</Text>
                <Text style={styles.rewardText}>{rewardName}</Text>
                <Text style={styles.pointValue}>
                  Cost: {selectedPoints} ZPoints
                </Text>
                <Text style={styles.confirm}>Confirm your email</Text>
                <Text style={styles.rewardText}>{userEmail}</Text>
              </View>
            </CardItem>
          </Card>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.redeemReward();
              }}
            >
              <View
                style={{
                  width: SCREEN_WIDTH - 180,
                  height: 40,
                  backgroundColor: Colors.purpleColor,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "rgb(255,255,255)",
                    fontSize: 18,
                    fontWeight: "600",
                  }}
                >
                  Confirm Reward{" "}
                </Text>
                <Icon
                  name="ios-arrow-forward"
                  type="ionicon"
                  color={"white"}
                  size={20}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 30,
              marginLeft: 5,
              marginRight: 10,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                marginTop: 10,
                fontWeight: "400",
                fontSize: 15,
                color: "rgb(125,125,125)",
              }}
            >
              By confirming your order, you are agreeing to the terms and
              conditions of Zigantic and the business from which you are
              ordering the gift card. {"\n"}
              {"\n"}Zigantic is not responsible for issues that arise following
              the redeeming of this card, including NO refunds. {"\n"}
              {"\n"}If you have any questions, please refer to help at
              <Text
                style={{ color: Colors.purpleColor, fontWeight: "600" }}
                onPress={() => {
                  this.openLink("https://zigantic.com/");
                }}
              >
                {" "}
                www.zigantic.com
              </Text>
              .
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    
  },
  headerText: {
    color: Colors.white,
    fontSize: 20,
    marginBottom: 5,
  },
  containerScrollView: {
    flex: 1,
    paddingHorizontal: 15,
  },
  giftCardImg: {
    marginVertical: 20,
    width: WIDTH - 100,
    height: 180,
    alignSelf: "center",
    resizeMode: "contain",
  },
  titleText: {
    color: Colors.black,
    fontSize: 22,
    alignSelf: "center",
    marginTop: 10,
  },
  confirm: {
    color: "rgb(50,50,50)",
    fontSize: 22,
    alignSelf: "flex-start",
    fontWeight: "600",
  },
  btnBg: {
    borderColor: Colors.purpleColor,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingVertical: 5,
    margin: 6,
    borderRadius: 10,
  },
  rewardText: {
    fontSize: 18,
    color: "rgb(105,105,105)",
    marginTop: 15,
    alignSelf: "flex-start",
  },
  pointValue: {
    fontSize: 18,
    color: "rgb(105,105,105)",
    marginTop: 15,
    alignSelf: "flex-start",
    marginBottom: 30,
  },
  optionView: {
    flexDirection: "row",
    marginTop: 15,
  },
  removeGoalStyles: {
    backgroundColor: "#808080",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    marginStart: 10,
    marginTop: 15,
    width: wp("50"),
    flexDirection: "row",
  },
});
