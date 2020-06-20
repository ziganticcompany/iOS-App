import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, AsyncStorage, StyleSheet, Image, Modal } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';

// import styles from '../constants/Styles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const SLIDE_INDICES = [1, 2, 3, 4, 5]

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

                
                
             
              <View style={{ marginTop: Constants.statusBarHeight + 100, marginHorizontal: 20, alignItems: 'center', justifyContent: 'center',}}>
                <Text style={{
                    fontWeight: '700',
                    fontSize: 28,
                    color: 'rgb(70,70,70)',
                    marginBottom: 20,
                    textAlign: 'center'
                }}>Welcome to Zigantic</Text>
                <View style={{ alignSelf: 'center', marginVertical: 30 }}>
                <Image source={require('../assets/images/zigantic1.png')}  style = {{ width: 200, height:200, resizeMode: 'contain'}}/>
                </View> 
                <Text style={{
                    fontSize: 20, 
                    fontWeight: '500',
                    color: 'rgb(90,90,90)',
                    marginHorizontal: 15,
                    textAlign: 'center',
                    marginTop: 20,
                }}>
                    Ever wanted to be paid to play video games? Well, you’ve come to the right place...</Text>

              <Text style={styles.subHeading}>Test games and answer surveys to earn free gift cards!</Text>
              </View>
              
              
             
            )

      case 1:
        return (
          <View style={{ marginTop: Constants.statusBarHeight + 100, marginHorizontal: 20, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text style={styles.heading}>Help game developers help you</Text>
            <View style={styles.centerAlign}>
              <Image source={require('../assets/images/gaming-pad.png')} style={{ height: 100, width: 100 }} />
            </View>  
            <Text style={styles.subHeading}>This is your chance to tell game developers what you like and dislike about their game, as well what you recommend they should change.</Text>
          </View>
        )
      case 2:
        return (
          <View style={{ marginTop: Constants.statusBarHeight + 100, marginHorizontal: 20, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text style={styles.heading}>Savor the rewards</Text>
            <View style={styles.centerAlign}>
              <Image source={require('../assets/images/giftcard.png')} style={{ height: 100, width: 100 }} />
            </View>  
            <Text style={styles.subHeading}>Earn 'Z-Points' to convert into real gift cards from Amazon, Xbox, and hundreds of other services!</Text>
          </View>
          /*  
          <View style={{ flex: 1, marginTop: Constants.statusBarHeight + 100 }}>
            <View style={styles.centerAlign}>
              <Image source={require('../assets/images/giftcard.png')} style={{ height: 100, width: 100 }} />
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Text style={styles.heading}>Relish/Bask/Revel/Savor the rewards</Text>
              <Text style={styles.subHeading}>Earn Z-Points to convert into real gift cards, like Amazon and Xbox</Text>
            </View>
          </View>
          */
        )
      case 3:
        return (
          <View style={{ flex: 1, marginTop: Constants.statusBarHeight + 100, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.heading}>Turn on notifications</Text>
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
            <Text style={styles.subHeading}>Click 'Allow' to permit Zigantic to send you notifications when a new survey becomes available and when Z-Points have been added to your account.</Text>
          </View>
        )
      case 4:
        return (

          <View style={{ flex: 1, marginTop: Constants.statusBarHeight + 100, marginHorizontal: 20, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text style={styles.heading}>One more thing...</Text>
            <View style={styles.centerAlign}>
              <Image source={require('../assets/images/survey.png')} style={{ height: 100, width: 100 }} />
            </View>  
            <Text style={styles.subHeading}>By signing up for our platform, you are promising to test games and complete surveys to the best of your ability and with complete honesty. Zigantic reserves the right to delete accounts and remove Z-Points.</Text>
            <TouchableOpacity
                          style={{
                              width: SCREEN_WIDTH - 90,
                              height: 45,
                              backgroundColor: 'rgb(72,42,116)',
                              justifyContent: 'center',
                              marginTop: 30,
                          }}
                          onPress={() => this.handleLogin(this.state.email, this.state.password)}onPress={() => this.props.navigation.navigate('PlayerAuthDecision')}
                      >
                          <Text style={{
                              color: 'rgb(255,255,255)',
                              fontSize: 14,
                              fontWeight: '700',
                              textAlign: 'center'
                          }}>
                          Continue </Text>
                      </TouchableOpacity>
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
        
        {/*
            
          this.state.activeSlide != 0 ?
            <TouchableOpacity
              style={styles.buttonPadding}
              onPress={() => this._snaptoPrev()}
            >
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity> :
            <View />
            */
        }
        
        {
            /*
          this.state.activeSlide === 4 ?
            <TouchableOpacity
              style={styles.buttonPadding}
              onPress={() => this._completeTutorial()}
            >
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity> :
            <View />
            
            <TouchableOpacity
              style={styles.buttonPadding}
              onPress={() => this._snaptoNext()}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
            */
           
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
    backgroundColor: 'white'
  },
  dot: {
    backgroundColor: 'rgb(72,42,116)',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 20
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
    marginBottom: 20,
    backgroundColor: 'white'
  },
  buttonPadding: { padding: 10 },
  buttonText: { color: 'white', fontSize: 15 },
  heading: {
    fontWeight: '600',
    fontSize: 24,
    color: 'rgb(90,90,90)',
    marginBottom: 20,
    textAlign: 'center'
  },
  subHeading: {
    fontSize: 18,
    fontWeight: '400',
    color: 'rgb(100,100,100)',
    marginTop: 20,
    marginHorizontal: 15,
    textAlign: 'center'
  },
  /*
  subHeading: {
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 15,
    color: 'rgb(150,150,150)',
    marginTop: 10,
  },
  */
  
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
