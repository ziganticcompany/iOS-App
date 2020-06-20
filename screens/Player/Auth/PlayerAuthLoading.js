import React from 'react'
import { View, Text, ActivityIndicator, Image, ImageBackground, Dimensions, AsyncStorage } from 'react-native'
//import * as firebase from 'firebase';
//service providers
import styles from '../../../constants/Styles';
import bgImage from '../../../assets/images/backgroundImage.jpg';
import logo from '../../../assets/images/zigantic1.png';
import { FirebaseAuth } from '../../../providers/firebase';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class PlayerAuthLoading extends React.Component {


  componentDidMount() {
    this.checkIfFirstRun()
  }

  /**
   * checking if the user is using the application for the first time.
   * If so, navigating the user to the onboarding screen, else navigating the user to the authentication screen
   */
  checkIfFirstRun = async () => {
    let firstRun = await AsyncStorage.getItem('firstRun');
    if (firstRun != null) {
      FirebaseAuth.getAuth().onAuthStateChanged(user => {
        this.props.navigation.navigate(user ? 'PlayerTabNavigator' : 'PlayerAuthDecision')
      })
    } else {
      this.props.navigation.navigate("OnBoardingScreen");
    }
  }

  render() {
    return (
      
      <View style = {{
        flex:1,
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT,
        justifyContent: 'center',
        backgroundColor: 'rgb(255,255,255)'
      }}>
          <View style = {{alignItems: 'center', justifyContent: 'center'}}>
              <Image source={logo} style={{
                  width: 200,
                  height: 200,
                  resizeMode: 'contain'
              }} /> 
          </View>
      </View>

    
    )
  }
}