import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Image, Dimensions, ScrollView, SafeAreaView, TouchableOpacity, Alert, Linking } from 'react-native';
import { Header, Icon, } from 'react-native-elements';
import Colors from "../../constants/Colors";
import { FirebaseData } from '../../providers/firebase';
import { Button, Card, CardItem } from 'native-base'
const WIDTH = Dimensions.get('window').width;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import * as Progress from "react-native-progress";
import qs from 'qs';
import { CheckBox } from "react-native-elements";
import axios from 'axios';
// import { Fab,Button } from "native-base";
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
import Layout from "../../constants/Layout";
export default class PlayerGiftCardsDetails extends Component {

  state = {
    gifCardDetails: "",
    imageUrls: "",
    rewardName: "",
    brandKey: "",
    isGoal: false,
    key: '',
    totalPoints: 1800,
    myPoints: 500,
    isFiveChecked: false,
    isTenChecked: false,
    isTwentyChecked: false,
    selectedValue: "",
    selectedPoints: "",
    refKey: "",
    goalPoints: "",
    isGoalAlready: false,
    brandName: "",
    firstName: "",
    lastName: "",
    userEmail: "",
    userId: "",

  }

  componentDidMount() {
    let data = this.props.navigation.state.params;
    if (data !== "" && data !== null && data !== undefined) {
      let myAllData = this.props.navigation.state.params.dataItem;
      this.setState({
        gifCardDetails: myAllData !== "" && myAllData !== null && myAllData !== undefined ? myAllData : "",
        imageUrls: myAllData.imageUrls['300w-326ppi'] !== "" && myAllData.imageUrls['300w-326ppi'] !== null && myAllData.imageUrls['300w-326ppi'] !== undefined ? myAllData.imageUrls['300w-326ppi'] : "",
        rewardName: myAllData.items[0].rewardName !== "" && myAllData.items[0].rewardName !== null && myAllData.items[0].rewardName !== undefined ? this.removePrice(myAllData.items[0].rewardName) : "",
        brandKey: myAllData.brandKey !== "" && myAllData.brandKey !== null && myAllData.brandKey !== undefined ? myAllData.brandKey : "",
        brandName: myAllData.brandName !== "" && myAllData.brandName !== null && myAllData.brandName !== undefined ? myAllData.brandName : "",
      }, () => {
        this.getGoal()
        this.getAvailableZPoints()
        this.getTesterUserProfile()
      })
    }
  }

  getTesterUserProfile() {

    try {
      var ref = FirebaseData.getUserRef().child("TesterProfile");

      ref.on('value', (snap) => {

        snap.forEach((child) => {
          this.setState({
            firstName: child.val().firstName,
            lastName: child.val().lastName,
            userEmail: child.val().email,
            userId: child.key
          });
        });
      });
    }
    catch (e) {
      //alert(e.message);
      return null;
    }
  }

  handleEmail = () => {

  }

  getGoal = () => {
    var itemsRef = FirebaseData.getGoal();
    itemsRef.on('value', (snap) => {
      let items = [];
      snap.forEach((child) => {
        if (snap.numChildren() > 0) {
          this.setState({ isGoalAlready: true, key: child.key })
        } else {
          this.setState({ isGoalAlready: false })
        }

        if (this.state.brandKey === child.val().brandKey) {
          this.setState({
            isGoal: true,
            goalPoints: child.val().selectedPoints
          })
        }
      });
    });
  }
  getAvailableZPoints() {
    // this.setState({ loading: true });
    try {
      var ref = FirebaseData.getUserRef().child("TesterProfile");
      ref.on('value', (snap) => {
        snap.forEach((child) => {
          this.setState({
            myPoints: child.val().ZPoints !== "" && child.val().ZPoints !== undefined && child.val().ZPoints != null ? child.val().ZPoints : 0,
            error: null,
            loading: false,
            refKey: child.key
          });
        });
      });
    }
    catch (e) {
      //alert(e.message);
    }
  }
  addGoal = () => {
    const { isTenChecked, isTwentyChecked, isFiveChecked, brandKey, imageUrls, selectedPoints, selectedValue, rewardName, gifCardDetails, isGoalAlready, key } = this.state
    if (isFiveChecked == false && isTenChecked == false && isTwentyChecked == false) {
      Alert.alert(
        //title
        'Please select a value to set as a goal.',
        //body
        '',
        [
          { text: 'Ok', onPress: () => console.log(''), style: 'cancel' },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      return;
    }
    try {
      var addGoal = {
        brandKey: brandKey,
        rewardName: rewardName,
        imageUrls: imageUrls,
        selectedPoints: selectedPoints,
        selectedValue: selectedValue,
        gifCardDetails: gifCardDetails
      };

      if (isGoalAlready) {
        FirebaseData.updateGoal(key, addGoal)
      } else {
        FirebaseData.addGoal(
          addGoal
        );
      }
      Alert.alert(
        //title
        'Your goal has been set!',
        //body
        `${rewardName}, $${selectedValue}.00`,
        [
          { text: 'Ok', onPress: () => this.props.navigation.navigate("RedeemScreen"), style: 'cancel' },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
    } catch (error) {
      alert(error);
    }
  }

  redeemReward = () => {

    const { isTenChecked, isTwentyChecked, isFiveChecked, brandKey, imageUrls, selectedPoints, selectedValue, rewardName, gifCardDetails, myPoints, refKey, goalPoints } = this.state
    if (isFiveChecked == false && isTenChecked == false && isTwentyChecked == false) {
      Alert.alert(
        //title
        'Please select a value to redeem!',
        //body
        '',
        [
          { text: 'Ok', onPress: () => console.log(''), style: 'cancel' },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      return;
    } else if (myPoints < selectedPoints) {
      Alert.alert(
        //title
        "You don't have enough ZPoints to redeem this card. Test some more games!",
        //body
        '',
        [
          { text: 'Ok', onPress: () => console.log(''), style: 'cancel' },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      return;
    }
    this.props.navigation.navigate("PlayerGiftCardConfirm", {
      dataItem: this.state.gifCardDetails,
      selectedPoints: this.state.selectedPoints,
      selectedValue: this.state.selectedValue
    })

  }

  sendConfirmationMail = (htmlFormat) => {
    let url = "https://us-central1-myfirsttestproject-c712f.cloudfunctions.net/sendMail/"
    axios({
      method: 'post',
      url: url,
      headers: {},
      data: {
        dest: this.state.userEmail, // This is the body part
        subject: "Confirmation mail",
        htmlFormat: htmlFormat,
      }
    })
      .then((response) => {
        this.props.navigation.navigate("RedeemScreen");
      })
      .catch((error) => {
      });

  }

  removePrice(value) {
    return value.replace(/\$.*\d+/g, '');
  }

  removeGoal = () => {
    try {
      Alert.alert(
        //title
        'Your goal has been removed.',
        //body
        '',
        [
          { text: 'Ok', onPress: () => console.log(''), style: 'cancel' },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      FirebaseData.removeGoal(this.state.key);
      this.setState({ isGoal: false, isGoalAlready: false })
    } catch (error) {
      alert(error);
    }
  }
  openLink = (value) => {
    if (value !== undefined && value !== "" && value !== null) {
      Linking.openURL(value);
    }
  };


  onFiveDollarsChange = () => {
    this.setState({ isFiveChecked: !this.state.isFiveChecked, isTenChecked: false, isTwentyChecked: false, selectedPoints: 1000, selectedValue: 5 })
  }
  onTenDollarsChange = () => {
    this.setState({ isTenChecked: !this.state.isTenChecked, isTwentyChecked: false, isFiveChecked: false, selectedPoints: 1800, selectedValue: 10 })
  }

  onTwentyDollarsChange = () => {
    this.setState({ isTwentyChecked: !this.state.isTwentyChecked, isTenChecked: false, isFiveChecked: false, selectedPoints: 3300, selectedValue: 20 })
  }

  render() {
    const { rewardName, imageUrls, isGoal, brandName, isFiveChecked, isTenChecked, isTwentyChecked, isGoalAlready } = this.state;
    return (
      <View style={styles.mainContainer}>
        <Header
          outerContainerStyles={{ zIndex: 1, height: Layout.headerHeight, borderBottomColor: Colors.purpleColor, backgroundColor: Colors.purpleColor }}
          innerContainerStyles={{ alignItems: 'center',paddingTop:Layout.paddingTop }}
          leftComponent={
            <Button transparent style={{ justifyContent: 'center', alignItems: 'center', width: 25, }} onPress={() => this.props.navigation.goBack()}>
              <Icon size={25} name='ios-arrow-back' type='ionicon' color='white' />
            </Button>
          }
          centerComponent={
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: '700', color: 'white' }}>Rewards</Text>
            </View>
          }
          containerStyle={{
            justifyContent: 'space-around',
          }}
        />

        {/* {this.state.isGoal ? <Progress.Bar
          progress={this.state.myPoints / this.state.totalPoints}
          width={wp("100")}
          borderWidth={0}
          style={{ borderRadius: 0 }}
          unfilledColor={"rgba(107,194,130,0.4)"}
          color={"green"}
        /> : null} */}
        <ScrollView style={styles.containerScrollView}>

          <View style={{ flex: 1, marginTop: 15 }}>
            <Card style={{ alignItems: 'center', justifyContent: 'center' }}>
              <CardItem style={{ flexDirection: 'column' }}>
                <Image
                  style={styles.giftCardImg}
                  source={{ uri: imageUrls }}
                />
                <Text style={styles.brandName}>{brandName}</Text>
                <Text style={styles.titleText}>{rewardName}</Text>
              </CardItem>
            </Card>

            <Card style={{ justifyContent: 'flex-start' }}>
              <CardItem style={{ flexDirection: 'column' }}>
                <Text style={{ marginTop: 10, fontSize: 18, alignSelf: 'flex-start', fontWeight: '600', color: 'rgb(50,50,50)', marginLeft: 10 }}>SELECT VALUE:</Text>
                <View style={{ marginStart: 20, marginBottom: 10, alignSelf: 'flex-start', }}>
                  <TouchableOpacity style={styles.optionView} onPress={() => { this.onFiveDollarsChange() }} >
                    <Icon type='record' name={isFiveChecked === false ? 'radio-button-unchecked' : 'radio-button-checked'} color={isFiveChecked === false ? "#808080" : "#000"} size={25} />
                    <Text style={{ marginStart: 5, fontSize: 18, color: '#000' }}>$5.00 <Text style={{ color: '#808080' }}>(1000 points)</Text></Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.optionView} onPress={() => { this.onTenDollarsChange() }} >
                    <Icon type='record' name={isTenChecked === false ? 'radio-button-unchecked' : 'radio-button-checked'} color={isTenChecked === false ? "#808080" : "#000"} size={25} />
                    <Text style={{ marginStart: 5, fontSize: 18, color: '#000' }}>$10.00 <Text style={{ color: '#808080' }}>(1800 points)</Text></Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.optionView} onPress={() => { this.onTwentyDollarsChange() }} >
                    <Icon type='record' name={isTwentyChecked === false ? 'radio-button-unchecked' : 'radio-button-checked'} color={isTwentyChecked === false ? "#808080" : "#000"} size={25} />
                    <Text style={{ marginStart: 5, fontSize: 18, color: '#000' }}>$20.00 <Text style={{ color: '#808080' }}>(3300 points)</Text></Text>
                  </TouchableOpacity>
                </View>
              </CardItem>
            </Card>
            {/* <Text style={{ marginVertical: 20 }}>{totalPoints} Points</Text> */}
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
              <TouchableOpacity onPress={() => { this.redeemReward() }}>

                <View style={{
                  width: SCREEN_WIDTH - 180,
                  height: 40,
                  backgroundColor: Colors.purpleColor,
                  //backgroundColor: 'rgb(78,40,113)',
                  marginBottom: 15,
                  borderRadius: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row'
                }}>
                  <Text style={{
                    color: 'rgb(255,255,255)',
                    fontSize: 18,
                    fontWeight: '600'
                  }}>
                    Redeem Reward   </Text>
                  <Icon name='ios-arrow-forward' type='ionicon' color={'white'} size={20} />

                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { isGoal === true ? this.removeGoal() : this.addGoal() }}>
                <View style={{
                  width: SCREEN_WIDTH - 180,
                  height: 40,
                  backgroundColor: 'rgb(255,255,255)',
                  borderColor: isGoal === true ? "gray" : Colors.purpleColor,
                  borderRadius: 0,
                  borderWidth: 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row'
                }}>
                  <Text style={{
                    color: isGoal === true ? "gray" : Colors.purpleColor,
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                    {isGoal === true ? "Remove Goal" : isGoalAlready === true ? "Update Goal" : "Set As Goal"}   </Text>
                  <Icon name='ios-arrow-forward' type='ionicon' color={isGoal === true ? "gray" : Colors.purpleColor} size={20} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 25, marginLeft: 5, marginRight: 10, marginBottom: 10 }}>
              <Text style={{ marginTop: 10, fontWeight: '400', fontSize: 15, color: 'rgb(125,125,125)' }}>
                By continuing, you are agreeing to the terms and conditions of Zigantic and the business from which you are ordering the gift card. {"\n"}{"\n"}Zigantic is not responsible for issues that arise following the redeeming of this card, including NO refunds. {"\n"}{"\n"}If you have any questions, please refer to help at
                <Text style={{ color: Colors.purpleColor, fontWeight: '600' }} onPress={() => { this.openLink('https://zigantic.com/') }}> www.zigantic.com</Text>
                .
                </Text>
            </View>

          </View>

          {/* <Text onPress={() => this.props.navigation.navigate('PlayerGiftCardConfirm')}>To confirm page</Text> */}





        </ScrollView>
      </View >

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
    marginBottom: 5
  },
  containerScrollView: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: Colors.backgroundColor
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
    fontWeight: '500',
    alignSelf: 'center',
    marginVertical: 10
  },
  brandName: {
    color: "#808080",
    fontSize: 18,
    alignSelf: 'center'
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
    borderRadius: 10

  },
  rewardText: {
    fontSize: 15,
    color: Colors.greyColor,
    marginTop: 30,
    marginBottom: 20
  },
  optionView: {
    flexDirection: "row",
    marginTop: 15
  },
  removeGoalStyles: {
    backgroundColor: "#808080",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    marginStart: 10,
    marginTop: 15,
    width: wp("50"),
    flexDirection: 'row'
  }
});