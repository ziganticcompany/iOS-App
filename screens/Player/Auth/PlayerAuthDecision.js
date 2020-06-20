import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity, Image, Dimensions, Platform, StatusBar, BackHandler } from 'react-native';
import bgImage from '../../../assets/images/LoginPageBackground.jpg';
import logo from '../../../assets/images/zigantic1.png';
import Icon from 'react-native-vector-icons/Ionicons';
import { FirebaseAuth } from '../../../providers/firebase';
//import styles from '../../../constants/Styles';
const { width: WIDTH } = Dimensions.get('window');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class PlayerAuthDecision extends React.Component {



  googleLogin = () => {

  }

  facebookLogin = () => {

  }

  render() {
    return (

      <View style={{ flex: 1, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'flex-start', }}>
        <Image
          source={logo}
          style={{
            width: 250,
            height: 250,
            marginTop: hp("10"),
            resizeMode: "contain",
            alignSelf: "center"
          }}
        />
        <TouchableOpacity style={styles.createAc} onPress={() => this.props.navigation.navigate('PlayerSignup')}>
          <Text style={styles.btnText} >Create an Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnLogin} onPress={() => this.props.navigation.navigate('PlayerLogin')}>
          <Text style={[styles.btnText, { color: "rgb(92,52,126)" }]} >Sign In</Text>
        </TouchableOpacity>
        <View style={styles.bottom} />
        <Text style={styles.bottomText}>By tapping on any of the above fields you are accepting our <Text style={{ color: "#000", fontSize: 14, fontWeight: '600' }} onPress={() => this.props.navigation.navigate('Terms')}>Terms and Conditions</Text></Text>


      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  createAc: {
    width: SCREEN_WIDTH - 55,
    height: 55,
    borderRadius: 16,
    fontSize: 16,
    backgroundColor: 'rgb(92,52,126)',
    justifyContent: 'center',
    marginHorizontal: 25,
    marginBottom: 15,
    marginTop: hp("10")
  },
  btnLogin: {
    width: SCREEN_WIDTH - 55,
    height: 55,
    borderRadius: 16,
    fontSize: 16,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    marginHorizontal: 25,
    marginBottom: 15,
    borderColor: 'rgb(92,52,126)',
    borderWidth: 2
  },
  bottom: {
    flex: 1,
    alignItems: 'center'
  },
  bottomText: {
    fontSize: 14,
    color: '#7E7E7E',
    textAlign: 'center',
    marginHorizontal: 25,
    marginBottom: hp("5"),
    
  },
  btnText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500'
  },


});

