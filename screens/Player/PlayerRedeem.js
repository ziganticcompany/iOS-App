import React, { Component } from 'react';
import {
  Platform, StyleSheet, View, AppRegistry, Text, Image,
  ImageBackground, TextInput, TouchableOpacity, Dimensions, ScrollView,
  Alert
} from 'react-native';
// import { withNativeAd } from 'expo/build/facebook-ads';
import Colors from "../../constants/Colors";
import { Header, Avatar, Icon, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import {
  Card,
  CardItem,
  Body, Left, Right, Button, Linking
} from 'native-base'
import bgImage from '../../assets/images/backgroundImage.jpg';
import { FirebaseData } from '../../providers/firebase';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
import * as Progress from "react-native-progress";
import firebase from '../../providers/firebaseConfig';
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Loader } from "../Loader";
export default class Redeem extends Component {
  state = {
    zpoints: '',
    loading: false,
    error: null,
    totalGamesSurveyed: "",
    isGoal: false,
    myPoints: 0,
    goalPoints: 0,
    goalValue: "",
    rewardName: "",
    brandKey: "",
    gifCardDetails: "",
    totalRedeem: 0,
    lastOrderHistory: "",
    lastOrderHistoryName: "",
    lifeTimeEarning: 0,
    lifiTimeZpoints: 0,
    isLoading: false,
    lastName: "",
    firstName: "",
    userEmail: "",
    userId: "",
    isFiveChecked: false,
    isTenChecked: false,
    isTwentyChecked: false,
    selectedValue: "",
    selectedPoints: "",
    isLoading: false,
    phoneNumber: "",
    myEarning: 0,
    isRequirezpoints: false,
    refKey: "",


  }

  goToOrderHistoryPoints = () => {
    this.props.navigation.navigate("OrderHistoryPoints");
  }

  goToOrderHistoryRedeeming = () => {
    this.props.navigation.navigate("OrderHistoryRedeeming");
  }

  redeemGiftCard = () => {
    alert("Please contact Zigantic support to have your gift card mailed to you");
  }
  donatePoints = () => {
    alert("Please contact Zigantic support to donate your points to a charity");
  }

  componentDidMount() {
    this.getGoal()
    this.getAvailableZPoints();
    this.getTotalGameSurveyed();
    this.getTotalRedeem()
  }



  getAvailableZPoints() {
    this.setState({ loading: true });
    try {
      var ref = FirebaseData.getUserRef().child("TesterProfile");
      ref.on('value', (snap) => {
        snap.forEach((child) => {
          this.setState({
            zpoints: child.val().ZPoints !== "" && child.val().ZPoints !== undefined && child.val().ZPoints !== null ? child.val().ZPoints : 0,
            error: null,
            loading: false,
            firstName: child.val().firstName,
            lastName: child.val().lastName,
            userEmail: child.val().email,
            phoneNumber: child.val().phoneNumber,
            userId: child.key,
            refKey: child.key,
            lifeTimeEarning: child.val().lifeTimeEarning !== "" && child.val().lifeTimeEarning !== undefined && child.val().lifeTimeEarning !== null ? child.val().lifeTimeEarning : 0,
            lifiTimeZpoints: child.val().lifeTimeZPoints !== "" && child.val().lifeTimeZPoints !== undefined && child.val().lifeTimeZPoints !== null ? child.val().lifeTimeZPoints : 0,
            myEarning: child.val().lifeTimeEarning !== null && child.val().lifeTimeEarning !== "" && child.val().lifeTimeEarning !== undefined ? child.val().lifeTimeEarning : 0,

          }, () => {
            if (this.state.zpoints >= 1000) {
              this.setState({ isRequirezpoints: true });
            } else {
              this.setState({ isRequirezpoints: false });
            }
          });
        });
      });
    }
    catch (e) {
      //alert(e.message);
      //     console.log(e);
    }
  }
  getGoal = () => {
    var itemsRef = FirebaseData.getGoal();
    itemsRef.on('value', (snap) => {
      let items = [];
      if (snap.numChildren() > 0) {
        this.setState({ isGoal: true })
      } else {
        this.setState({ isGoal: false })
      }
      snap.forEach((child) => {
        this.setState({
          goalPoints: child.val().brandKey,
          key: child.key,
          rewardName: child.val().rewardName,
          goalPoints: child.val().selectedPoints,
          goalValue: child.val().selectedValue,
          gifCardDetails: child.val().gifCardDetails,
          lifeTimeEarning: child.val().lifeTimeEarning !== "" && child.val().lifeTimeEarning !== null && child.val().lifeTimeEarning !== undefined ? child.val().lifeTimeEarning : 0
        })
      });
    });
  }
  getTotalGameSurveyed = () => {
    var gamesRootRef = FirebaseData.getUserProfileAnswer();

    gamesRootRef.on('value', (userRef) => {
      let items = [];
      userRef.forEach((eachUser) => {

      });
      this.setState({ totalGamesSurveyed: userRef.numChildren() })
    }); //end of gamesRootRef.on('value', (snap) =>   
  }

  getTotalRedeem = () => {
    var gamesRootRef = FirebaseData.getRedeem();

    gamesRootRef.on('value', (userRef) => {
      let items = [];
      userRef.forEach((eachUser) => {
        items.push({
          status: eachUser.val().isStatus,
          rewards: eachUser.val().rewardName,
          points: eachUser.val().points,
          date: eachUser.val().date,
          brandKey: eachUser.val().brandKey,
          price: eachUser.val().price,
          isOrderDetailsDisplay: false

        })
        this.setState({ lastOrderHistoryName: eachUser.val().rewardName })
      });
      this.setState({ totalRedeem: userRef.numChildren(), lastOrderHistory: items })
    }); //end of gamesRootRef.on('value', (snap) =>   
  }

  giftCardDetails = () => {

    if (this.state.zpoints < this.state.goalPoints) {
      Alert.alert(
        //title
        'Whoops…',
        //body
        "You don't have enough ZPoints to redeem this card.",
        [
          { text: 'Ok', onPress: () => console.log(''), style: 'cancel' },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
    } else {
      this.props.navigation.navigate("PlayerGiftCardConfirm", {
        dataItem: this.state.gifCardDetails,
        selectedPoints: this.state.goalPoints,
        selectedValue: this.state.goalValue
      })
    }
  }

  formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;

      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
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

  redeemReward = () => {
    const { selectedPoints, selectedValue, zpoints, firstName, lastName, userEmail, phoneNumber, lifiTimeZpoints, isFiveChecked, isTenChecked, isTwentyChecked, myEarning, refKey } = this.state;
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
    } else if (zpoints < selectedPoints) {
      Alert.alert(
        //title
        'Whoops...',
        //body
        "You do not have the required number of points to redeem this value.",
        [
          { text: 'Ok' },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      //alert("You don't have the required number of points");
      return;
    }
    this.setState({ isLoading: true });
    var today = new Date();
    try {
      var updateZPoints = zpoints - selectedPoints;
      var updateEarning = myEarning + selectedValue;
      let myUpdateValue = {
        ZPoints: updateZPoints,
        lifeTimeEarning: updateEarning,
      };
      FirebaseData.updateZPoints(refKey, myUpdateValue);

      let htmlFormat = `
      <div>
          <p>Name : ${firstName} ${lastName}</p>
          <p>Email : ${userEmail}</p>
          <p>Phone number : ${phoneNumber}</p>
          </br>
          </br>
          <p>Value : $${selectedValue}</p>
          <p>Points worth : ${selectedPoints} points</p>
          </br>
          </br>
          <p>Total ZPoints : ${zpoints}</p>
          <p>Firebase ID : ${firebase.auth().currentUser.uid}</p>
          </br>
      </div>`;

      this.sendConfirmationMail(htmlFormat);
    } catch (error) {
      this.setState({ isLoading: false });
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
        dest: "zigantic.a@gmail.com", // This is the body part
        subject: "Reward Request",
        htmlFormat: htmlFormat,
      },
    })
      .then((response) => {
        this.setState({ isLoading: false });
        setTimeout(function () {
          Alert.alert(
            //title
            'Congratulations!',
            //body
            'Your request has been sent. Your ZPoints have been decreased and a representative will get in touch soon. Thanks!',
            [
              { text: 'Ok' },
            ],
            { cancelable: false }
            //clicking out side of alert will not cancel
          );
          //alert("Your request has been sent. Your ZPoints have been decreased and a representative will get in touch soon. Thanks!");
        }, 500)
      })
      .catch((error) => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { isFiveChecked, isTenChecked, isTwentyChecked, isLoading, isRequirezpoints } = this.state;

    return (
      <View style={styles.container}>
        <Loader loading={isLoading} message="Requesting..." />
        <Header
          outerContainerStyles={{ zIndex: 1, borderBottomColor: Colors.purpleColor }}
          backgroundColor={Colors.purpleColor}
          // leftComponent={<Icon name='menu' color='#fff' onPress={() => this.props.navigation.toggleDrawer()}/>} 
          centerComponent={<View style={{ alignItems: 'center' }}>
            <Text style={{ justifyContent: 'center', color: '#fff', alignContent: 'center', fontSize: 20 }}></Text>
          </View>}
        //        rightComponent={<Icon name='home' color='#fff' onPress={() => this.props.navigation.navigate('PlayerAuthDecision')}/>} 
        />
        <View style={styles.backgroundContainer}>

          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <Card style={{ marginVertical: 35, width: SCREEN_WIDTH - 40, alignItems: 'flex-start',alignSelf:'center' }}>
              <CardItem header bordered>
                <Text style={styles.currentZPoints}>YOUR Z-POINTS                                                                                 </Text>
              </CardItem>
              <CardItem style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 70, fontWeight: '600', color: 'rgb(75,75,75)' }}>{this.state.zpoints}</Text>
              </CardItem>
            </Card>

            {this.state.isGoal == true ?
              <Card style={{ marginVertical: 35, width: SCREEN_WIDTH - 55, alignItems: 'flex-start' }}>
                <CardItem header bordered>
                  <Text style={styles.currentZPoints}>YOUR GOAL                                                                      </Text>
                </CardItem>

                <CardItem>
                  <Body style={{ justifyContent: 'center' }}>
                    <Text style={{ fontSize: 15, fontWeight: '600', color: 'rgb(50,50,50)', marginTop: 10 }}>{this.state.rewardName} - ${this.state.goalValue}.00</Text>
                  </Body>
                </CardItem>

                <CardItem style={{}}>
                  <Text style={{ fontSize: 30, fontWeight: '600', color: 'rgb(75,75,75)' }}>{this.state.zpoints}</Text>
                  <Text style={{ fontSize: 30, fontWeight: '300', color: 'rgb(130,130,130)' }}>/{this.state.goalPoints}</Text>
                </CardItem>
                {this.state.goalPoints != 0 ? <CardItem >
                  <Progress.Bar
                    progress={this.state.zpoints / this.state.goalPoints}
                    width={wp("75")}
                    borderWidth={0}
                    //   style={{ borderRadius: 0 }}
                    unfilledColor={"rgba(107,194,130,0.4)"}
                    color={"green"}
                  />
                </CardItem > : null}
                {this.state.zpoints >= this.state.goalPoints ?
                  <CardItem style={{ alignSelf: "center", marginTop: 10, marginBottom: 5 }} button onPress={() => { this.giftCardDetails() }} >
                    <Text style={{ fontSize: 16, color: this.state.zpoints >= this.state.goalPoints ? Colors.purpleColor : '#A9A9A9', marginHorizontal: 8, textAlign: 'center', fontWeight: "bold" }}>REDEEM REWARD</Text>
                    <Icon name='ios-arrow-forward' type='ionicon' color={this.state.zpoints >= this.state.goalPoints ? Colors.purpleColor : '#A9A9A9'} size={20} />
                  </CardItem>
                  :
                  <CardItem style={{ alignSelf: "center", marginTop: 10, marginBottom: 5 }}  >
                    <Text style={{ fontSize: 16, color: this.state.zpoints >= this.state.goalPoints ? Colors.purpleColor : '#A9A9A9', marginHorizontal: 8, textAlign: 'center', fontWeight: "bold" }}>REDEEM REWARD</Text>
                    <Icon name='ios-arrow-forward' type='ionicon' color={this.state.zpoints >= this.state.goalPoints ? Colors.purpleColor : '#A9A9A9'} size={20} />
                  </CardItem>
                }

                {/*
              <CardItem style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={{
                  width: 285,
                  height: 8,
                  backgroundColor: 'rgba(107,194,130,0.4)',
                  borderRadius: 5,
                  marginTop: 10
                }}>
                </View>

              </CardItem>
              <CardItem>
                <View style={{
                  width: this.state.zpoints / 100 * 285,
                  //  width: 1,
                  height: 8,
                  backgroundColor: 'green',
                  borderRadius: 5,
                  marginTop: -48
                }}>
                </View>
              </CardItem>

              <CardItem footer bordered button>
                <Body style={{ justifyContent: 'center' }}>
                  <Text style={{ fontSize: 15, fontWeight: '600', color: 'rgb(50,50,50)' }}>Change Goal</Text>
                </Body>
                <Right>
                  <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <Icon name='ios-arrow-forward' type='ionicon' color='rgb(200,200,200)' />
                  </View>
                </Right>
              </CardItem>*/}
              </Card> : null}

            <View>
              <Card style={{ justifyContent: 'flex-start', width: SCREEN_WIDTH - 40,alignSelf:'center' }}>
              <CardItem header bordered>
                <Text style={styles.currentZPoints}>REQUEST AMAZON GIFT CARD </Text>
              </CardItem>
                
                <CardItem style={{ flexDirection: 'column' }}>
                  <View style={{ marginStart: 10, marginBottom: 10, alignSelf: 'flex-start', }}>
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
              <TouchableOpacity onPress={() => { this.redeemReward() }} style={styles.requestBtnStyle}>
                <Text style={styles.requestText}>REQUEST REWARD</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 5, marginTop: 20, marginRight: 10,marginBottom:5 }}>
            <Text style={{ marginTop: 10, fontWeight: '400', fontSize: 15, color: 'rgb(125,125,125)',textAlign:'center',textAlignVertical:'center' }}>
              If you have requested a reward and have not received your confirmation email within a week, please contact us at
                    <Text style={{ color: Colors.purpleColor, fontWeight: '600' }}> info@zigantic.com</Text>
                .
                </Text>
          </View>
            {/* <Card style={{ marginVertical: 20, width: SCREEN_WIDTH - 55, alignItems: 'flex-end' }}>
              <CardItem header bordered>
                <Text style={styles.currentZPoints}>REDEEM                                                                       </Text>
              </CardItem>
              <CardItem button onPress={() => this.props.navigation.navigate("PlayerGiftCardList")}>
                <Left>
                  <Text style={styles.buttonTxt} > Gift Cards</Text>
                </Left>
                <Right>
                  <Button transparent
                  // onPress={() => this.redeemGiftCard()}
                  >
                    <Icon name='ios-arrow-forward' type='ionicon' color='rgb(200,200,200)' />
                  </Button>
                </Right>
              </CardItem>
            </Card> */}
            {/* {this.state.lastOrderHistoryName !== null && this.state.lastOrderHistoryName !== "" && this.state.lastOrderHistoryName !== undefined ?
            <Card style={{ marginVertical: 35, width: SCREEN_WIDTH - 55, alignItems: 'flex-start' }}>
              <CardItem header bordered>
                <Text style={styles.currentZPoints}>ORDER HISTORY                                                                      </Text>
              </CardItem>
              <CardItem style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: 'rgb(75,75,75)' }}>Latest Order</Text>
              </CardItem>
              <CardItem bordered style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 14, color: '#808080', flex: 1 }}>{this.state.lastOrderHistoryName}</Text>
              </CardItem>
              <CardItem button onPress={() => this.props.navigation.navigate("OrderHistoryRedeeming")}>
                <Left>
                  <Text style={[styles.buttonTxt, { fontSize: 16 }]}>See All Past Orders</Text>
                </Left>
                <Right>
                  <Button transparent
                  // onPress={() => this.redeemGiftCard()}
                  >
                    <Icon name='ios-arrow-forward' type='ionicon' color='rgb(200,200,200)' />
                  </Button>
                </Right>
              </CardItem>
            </Card> : null} */}
            {/*
            <Card style={{ marginVertical: 35, width: SCREEN_WIDTH - 55, alignItems: 'center' }}>
              <CardItem header bordered>
                <Text style={styles.currentZPoints}>CURRENT REWARDS                                                                       </Text>
              </CardItem>
              <CardItem style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 14, color: 'rgb(200,200,200)' }}>You have no rewards at this time</Text>
              </CardItem>
            </Card>
            */}
            {/* <Card style={{ marginVertical: 35, width: SCREEN_WIDTH - 55 }}>
              <CardItem header bordered>
                <Text style={styles.currentZPoints}>HISTORY                                                                       </Text>
              </CardItem>
              <View style={{ justifyContent: 'flex-start' }}>
                <CardItem>
                  <TouchableOpacity onPress={() => this.goToOrderHistoryPoints()}>
                    <Text style={{ fontSize: 15, fontWeight: '500', color: 'rgb(80,80,80)' }}>Lifetime ZPoints</Text>
                  </TouchableOpacity>
                </CardItem>
                <CardItem style={{ justifyContent: 'flex-start' }}>
                  <Text style={{ fontSize: 30, fontWeight: '500', color: 'rgb(130,130,130)' }}>{this.state.lifiTimeZpoints}</Text>
                </CardItem>
                <CardItem>
                  <Text style={{ fontSize: 15, fontWeight: '500', color: 'rgb(80,80,80)' }}>Total Games Surveyed</Text>
                </CardItem>
                <CardItem style={{ justifyContent: 'flex-start' }}>
                  <Text style={{ fontSize: 30, fontWeight: '500', color: 'rgb(130,130,130)' }}>{this.state.totalGamesSurveyed}</Text>
                </CardItem>
                <CardItem>
                  <TouchableOpacity >
                    <Text style={{ fontSize: 15, fontWeight: '500', color: 'rgb(80,80,80)' }}>Total Rewards Redeemed</Text>
                  </TouchableOpacity>
                </CardItem>
                <CardItem style={{ justifyContent: 'flex-start' }}>
                  <Text style={{ fontSize: 30, fontWeight: '500', color: 'rgb(130,130,130)' }}>{this.state.totalRedeem}</Text>
                </CardItem>
                <CardItem>
                  <Text style={{ fontSize: 15, fontWeight: '500', color: 'rgb(80,80,80)' }}>Lifetime Earnings</Text>
                </CardItem>
                <CardItem style={{ justifyContent: 'flex-start' }}>
                  <Text style={{ fontSize: 30, fontWeight: '500', color: 'rgb(130,130,130)' }}>${this.formatMoney(this.state.lifeTimeEarning)}</Text>
                </CardItem>
              </View>
            </Card> */}
          </ScrollView>
        </View>
      </View >

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems:'center',
    // justifyContent:'center',
    backgroundColor: 'gray',
    flexDirection: 'column',
   // alignSelf:'center'
  },
  backgroundContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(240,240,240)',
  
  },


  buttonTxt: {
    color: 'rgb(0,0,0)',
    fontSize: 19,
    fontWeight: '400',
    textAlign: 'center'
  },
  currentZPoints: {
    //    color: 'rgb(0,0,0)',
    color: 'black',
    fontSize: 13,
    fontWeight: '400',
    textAlign: 'left'
  },
  progressBar: {
    width: 285,
    height: 8,
    backgroundColor: 'rgba(107,194,130,0.4)',
    borderRadius: 5,
    marginTop: 10
  },
  progressBar2: {

    height: 8,
    backgroundColor: 'green',
    borderRadius: 5,
    marginTop: -48
  },
  optionView: {
    flexDirection: "row",
    marginTop: 15
  },
  requestBtnStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    height: 50,
    backgroundColor: Colors.purpleColor,
    width: wp("70"),
    alignSelf: 'center'
  },
  requestText: {
    color: 'rgb(255,255,255)',
    fontSize: 18,
    fontWeight: '600'
  }

});