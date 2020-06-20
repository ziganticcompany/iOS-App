import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, AsyncStorage, StyleSheet, Image, Modal } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from "../constants/Colors";
import logo from "../assets/images/ziganticlogo.png";
// import styles from '../constants/Styles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const SLIDE_INDICES = [1, 2, 3, 4, 5]
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default class OnBoardingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      popupVisible: true
    };
  }

  /**
   * pagination component
   * retuns the pagination element with active and inactive dots with seperate styles
   */
  get pagination() {
    const { activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={SLIDE_INDICES.length}
        activeDotIndex={activeSlide}
        dotStyle={styles.dot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  /**
   * Each slide is rendered based on the slide index.
   * 
   */
  _renderItem = ({ item, index }) => {
    switch (index) {
      case 0:
        return (
          <View style={{ flex: 1, marginTop: Constants.statusBarHeight + hp("7"), paddingHorizontal: 15 }}>
            <Text style={styles.mainHeading1}>Welcome to</Text>
            <Text style={styles.mainHeading2}>Zigantic</Text>
            <Image
              source={logo}
              style={{
                width: 200,
                height: 200,
                marginVertical: hp("5"),
                resizeMode: "contain",
                alignSelf: 'center'
              }}
            />
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Text style={styles.heading}>Ever wanted to be paid to play video games? Well, you’ve come to the right place...</Text>
              <Text style={styles.subHeading}>Survey Games and Answer Survey to Earn Free Gift Cards.</Text>
            </View>
          </View>
        )
      case 1:
        return (
          <View style={{ flex: 1, marginTop: Constants.statusBarHeight + 100 }}>
            <View style={styles.centerAlign}>
              <Image source={require('../assets/images/gaming-pad.png')} style={{ height: 100, width: 100 }} />
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Text style={styles.heading}>Help game developers help you.</Text>
              <Text style={styles.subHeading}>This is your chance to tell game developers what you like and dislike about their game, and what you recommend they should change.</Text>
            </View>
          </View>
        )
      case 2:
        return (
          <View style={{ flex: 1, marginTop: Constants.statusBarHeight + 100 }}>
            <View style={styles.centerAlign}>
              <Image source={require('../assets/images/giftcard.png')} style={{ height: 100, width: 100 }} />
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Text style={styles.heading}>Savor the rewards</Text>
              <Text style={styles.subHeading}>Earn Z-Points to convert into real gift cards from your favorite stores, like Amazon</Text>
            </View>
          </View>
        )
      case 3:
        return (
          <View style={{ flex: 1, marginTop: Constants.statusBarHeight + 100, alignItems: 'center', justifyContent: 'center' }}>
            {
              this.state.popupVisible && (
                <View style={styles.card}>
                  <Text style={[styles.heading, { color: 'black' }]}>Zigantic would like to send you notifications</Text>
                  <Text style={[styles.subHeading, { color: 'black' }]}>Notifications may include alerts, sounds and icon badges. These can be configured in settings.</Text>
                  <View style={styles.buttonContainer}>
                    <Text style={[styles.buttonText, { color: '#3498db' }]} onPress={() => {
                      this.setState({
                        popupVisible: false
                      })
                    }}>Don't Allow</Text>
                    <Text style={[styles.buttonText, { color: '#3498db' }]} onPress={() => {
                      this.setState({
                        popupVisible: false
                      })
                    }}>Allow</Text>
                  </View>
                </View>
              )
            }
            <Text style={styles.subHeading}>Click 'Allow' to permit Zigantic to send you notifications when there is a new survey available and when Z-Points have been added to your account</Text>
          </View>
        )
      case 4:
        return (
          <View style={{ flex: 1, marginTop: Constants.statusBarHeight + 100 }}>
            <View style={styles.centerAlign}>
              <Image source={require('../assets/images/survey.png')} style={{ height: 100, width: 100 }} />
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Text style={styles.heading}>One more thing...</Text>
              <Text style={styles.subHeading}>By signing up for our platform, you are promising to test games and complete surveys to the best of your ability and with complete honesty. Zigantic reserves the right to delete accounts and remove Z-Points</Text>
            </View>
          </View>
        )
    }
  }

  /**
   * function to navigate to the next slide
   */
  _snaptoNext = () => {
    this._carousel.snapToNext()
  }

  /**
   * on completing the tutorial, a variable is marked true on the application local storage
   * and the user is navigated to the login page.
   */
  _completeTutorial = async () => {
    await AsyncStorage.setItem('firstRun', "true");
    this.props.navigation.navigate('PlayerAuthDecision');
  }

  /**
  * function to navigate to the previous slide
  */
  _snaptoPrev = () => {
    this._carousel.snapToPrev();
  }

  /**
   * bottom navigation bar presentational view.
   * has the pagination component, previous button and next/done button based on the active slide index
   */
  get bottomNavigator() {
    return (
      <View style={styles.bottomNavigator}>
        {
          this.state.activeSlide != 0 ?
            <TouchableOpacity
              style={styles.buttonPadding}
              onPress={() => this._snaptoPrev()}
            >
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity> :
            <View />
        }
        {
          this.state.activeSlide === 4 ?
            <TouchableOpacity
              style={styles.buttonPadding}
              onPress={() => this._completeTutorial()}
            >
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity> :
            <TouchableOpacity
              style={styles.buttonPadding}
              onPress={() => this._snaptoNext()}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        }
      </View>
    )
  }

  /**
   * main render function.
   * returns a carousel with 5 different screens
   */
  render() {
    return (
      <View style={styles.container}>
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={SLIDE_INDICES}
          renderItem={this._renderItem}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={SCREEN_WIDTH}
          inactiveSlideScale={1.0}
          onSnapToItem={(index) => {
            this.setState({
              activeSlide: index
            })
          }}
        />
        {this.pagination}
        {this.bottomNavigator}
      </View>
    );
  }
}


/**
 * common immutable style object
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: Colors.purpleColor
    backgroundColor: 'white'
  },
  dot: {
    backgroundColor: Colors.purpleColor,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  bottomNavigator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    width: SCREEN_WIDTH,
  },
  buttonPadding: { padding: 10 },
  buttonText: { color: Colors.purpleColor, fontSize: 15 },
  mainHeading1: {
    fontWeight: 'bold',
    fontSize: 28,
    color: 'rgb(50,50,50)',
    marginTop: 5,
    textAlign: 'center'
  },
  mainHeading2: {
    fontWeight: 'bold',
    fontSize: 42,
    color: Colors.purpleColor,
    marginTop: 5,
    textAlign: 'center'
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgb(50,50,50)',
    marginTop: 5,
    marginHorizontal: 15,
    textAlign: 'center'
  },
  subHeading: {
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 15,
    color: 'rgb(105,105,105)',
    marginTop: hp("1"),
  },
  centerAlign: {
    alignSelf: 'center'
  },
  card: {
    padding: 20,
    width: SCREEN_WIDTH - 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 5,
    marginBottom: 15
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30
  }
})

