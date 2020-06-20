import React from 'react'
import { View, Text, ActivityIndicator, Image,ImageBackground } from 'react-native'
//import * as firebase from 'firebase';
//service providers
import styles from '../../../constants/Styles';
import bgImage from '../../../assets/images/LoginPageBackground.jpg';
import logo from '../../../assets/images/zigantic1.png';
import { FirebaseAuth } from '../../../providers/firebase';
 
export default class DeveloperAuthLoading extends React.Component {

 
  componentDidMount() {
    FirebaseAuth.getAuth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'DeveloperTabNavigator' : 'DeveloperAuthDecision')  
    })
  }

  render() {
    return (
      
    <View style={styles.container}>   
      <ImageBackground source = {bgImage} style = {styles.backgroundContainer}>
        <View style = {styles.logoContainer}>
          <Image source = {logo} style = {styles.logo}/>
          <Text style = {styles.logoText}>ZIGANTIC</Text>
          <ActivityIndicator size="large" />
        </View>
        </ImageBackground>
    </View>
    )
  }
}

