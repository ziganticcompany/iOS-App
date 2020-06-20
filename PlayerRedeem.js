import React, { Component } from 'react';
import {
  Platform, StyleSheet, View, AppRegistry, Text, Image,
  ImageBackground, TextInput, TouchableOpacity, Dimensions, ScrollView
} from 'react-native';
// import { withNativeAd } from 'expo/build/facebook-ads';

import { Header, Avatar, Icon, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import {
  Card,
  CardItem,
  Body, Left, Right, Button
} from 'native-base'
import bgImage from '../../assets/images/backgroundImage.jpg';
import { FirebaseData } from '../../providers/firebase';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Redeem extends Component {
  state = {
    zpoints: '',
    loading: false,
    error: null,
  }

  redeemGiftCard = () => {
    console.log("redeemGiftCard");
    alert("Please contact Zigantic support to have your gift card mailed to you");
  }
  donatePoints = () => {
    alert("Please contact Zigantic support to donate your points to a charity");
  }

  componentDidMount() {
    this.getAvailableZPoints();
  }

  getAvailableZPoints() {
    this.setState({ loading: true });
    try {
      var ref = FirebaseData.getUserRef().child("TesterProfile");
      ref.on('value', (snap) => {
        snap.forEach((child) => {
          console.log("Child", child.val());

          this.setState({
            zpoints: child.val().zpoints,
            error: null,
            loading: false,
          });
        });
      });
    }
    catch (e) {
      //alert(e.message);
      console.log(e);
    }
  }

  render() {
    console.log("this.state.zpoints", this.state.zpoints);

    return (
      <View style={styles.container}>
        <Header
          outerContainerStyles={{ zIndex: 1 }}
          backgroundColor='rgb(91,41,114)'
          // leftComponent={<Icon name='menu' color='#fff' onPress={() => this.props.navigation.toggleDrawer()}/>} 
          centerComponent={<View style={{ alignItems: 'center' }}>
            <Text style={{ justifyContent: 'center', color: '#fff', alignContent: 'center', fontSize: 20 }}></Text>
          </View>}
        //        rightComponent={<Icon name='home' color='#fff' onPress={() => this.props.navigation.navigate('PlayerAuthDecision')}/>} 
        />
        <View style={styles.backgroundContainer}>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Card style={{ marginVertical: 35, width: SCREEN_WIDTH - 55, alignItems: 'flex-start' }}>
              <CardItem header bordered>
                <Text style={styles.currentZPoints}>YOUR Z-POINTS                                                                       </Text>
              </CardItem>
              <CardItem style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 70, fontWeight: '600', color: 'rgb(75,75,75)' }}>{this.state.zpoints}</Text>
              </CardItem>
            </Card>

            <Card style={{ marginVertical: 35, width: SCREEN_WIDTH - 55, alignItems: 'flex-start' }}>
              <CardItem header bordered>
                <Text style={styles.currentZPoints}>YOUR GOAL                                                                      </Text>
              </CardItem>

              <CardItem>
                <Body style={{ justifyContent: 'center' }}>
                  <Text style={{ fontSize: 15, fontWeight: '600', color: 'rgb(50,50,50)', marginTop: 10 }}>Amazon Gift Card - $5.00</Text>
                </Body>
              </CardItem>

              <CardItem style={{}}>
                <Text style={{ fontSize: 30, fontWeight: '600', color: 'rgb(75,75,75)' }}>{this.state.zpoints}</Text>
                <Text style={{ fontSize: 30, fontWeight: '300', color: 'rgb(130,130,130)' }}>/100</Text>
              </CardItem>

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
              </CardItem>
            </Card>



            <Card style={{ marginVertical: 20, width: SCREEN_WIDTH - 55, alignItems: 'flex-end' }}>
              <CardItem header bordered>
                <Text style={styles.currentZPoints}>REDEEM                                                                       </Text>
              </CardItem>
              <CardItem button onPress={() => this.props.navigation.navigate("PlayerGiftCardList")}>
                <Left>
                  <Text style={styles.buttonTxt}> Gift Cards</Text>
                </Left>
                <Right>
                  <Button transparent
                  // onPress={() => this.redeemGiftCard()}
                  >
                    <Icon name='ios-arrow-forward' type='ionicon' color='rgb(200,200,200)' />
                  </Button>
                </Right>
              </CardItem>


            </Card>

            <Card style={{ marginVertical: 35, width: SCREEN_WIDTH - 55, alignItems: 'center' }}>
              <CardItem header bordered>
                <Text style={styles.currentZPoints}>CURRENT REWARDS                                                                       </Text>
              </CardItem>
              <CardItem style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 14, color: 'rgb(200,200,200)' }}>You have no rewards at this time</Text>
              </CardItem>
            </Card>

            <Card style={{ marginVertical: 35, width: SCREEN_WIDTH - 55 }}>
              <CardItem header bordered>
                <Text style={styles.currentZPoints}>HISTORY                                                                       </Text>
              </CardItem>
              <View style={{ justifyContent: 'flex-start' }}>
                <CardItem>
                  <Text style={{ fontSize: 15, fontWeight: '500', color: 'rgb(80,80,80)' }}>Lifetime Z-Points</Text>
                </CardItem>
                <CardItem style={{ justifyContent: 'flex-start' }}>
                  <Text style={{ fontSize: 30, fontWeight: '500', color: 'rgb(130,130,130)' }}>{this.state.zpoints}</Text>
                </CardItem>
                <CardItem>
                  <Text style={{ fontSize: 15, fontWeight: '500', color: 'rgb(80,80,80)' }}>Total Games Surveyed</Text>
                </CardItem>
                <CardItem style={{ justifyContent: 'flex-start' }}>
                  <Text style={{ fontSize: 30, fontWeight: '500', color: 'rgb(130,130,130)' }}>15</Text>
                </CardItem>
                <CardItem>
                  <Text style={{ fontSize: 15, fontWeight: '500', color: 'rgb(80,80,80)' }}>Total Rewards Redeemed</Text>
                </CardItem>
                <CardItem style={{ justifyContent: 'flex-start' }}>
                  <Text style={{ fontSize: 30, fontWeight: '500', color: 'rgb(130,130,130)' }}>3</Text>
                </CardItem>
                <CardItem>
                  <Text style={{ fontSize: 15, fontWeight: '500', color: 'rgb(80,80,80)' }}>Lifetime Earnings</Text>
                </CardItem>
                <CardItem style={{ justifyContent: 'flex-start' }}>
                  <Text style={{ fontSize: 30, fontWeight: '500', color: 'rgb(130,130,130)' }}>$20.00</Text>
                </CardItem>
              </View>
            </Card>
          </ScrollView>
        </View>
      </View>

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
  },
  backgroundContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgb(240,240,240)'
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
  }
});