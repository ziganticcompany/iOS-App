import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Button, TouchableOpacity, Image, Dimensions, Platform, StatusBar} from 'react-native';
import bgImage from '../../../assets/images/LoginPageBackground.jpg';
import logo from '../../../assets/images/zigantic1.png';
import Icon from 'react-native-vector-icons/Ionicons';
import { FirebaseAuth } from '../../../providers/firebase';
import styles from '../../../constants/Styles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class PlayerAuthDecision extends React.Component {

  googleLogin = () => {
    alert("Google sign-in not enabled; please use regular sign-in");  
/*    FirebaseAuth.googleLogin()
    .then(() => this.props.navigation.navigate('PlayerTabNavigator') )
    .catch(  error => 
        {alert(error);
        console.log(error);
        });*/
  }

  facebookLogin = () => {
    alert("Facebook sign-in not enabled; please use regular sign-in");  
/*    FirebaseAuth.googleLogin()
    .then(() => this.props.navigation.navigate('PlayerTabNavigator') )
    .catch(  error => 
        {alert(error);
        console.log(error);
        });*/
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
          <View style = {{alignItems: 'center', justifyContent: 'center', marginTop: 97, marginBottom: 100}}>
                <Image source={logo} style={{
                  width: 200,
                  height: 200,
                  marginBottom: 100,
                  resizeMode: 'contain'
                }} />
  
              <TouchableOpacity onPress={() => this.props.navigation.navigate('PlayerSignup')}>
                  <View style = {{
                    width: SCREEN_WIDTH - 80,
                    height: 60,
                    backgroundColor: 'rgb(72,42,116)',
                    //backgroundColor: 'rgb(78,40,113)',
                    marginBottom: 15,
                    borderRadius:20,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Text style = {{
                      color: 'rgb(255,255,255)',
                      fontSize: 20,
                      fontWeight:'600'
                    }}>
                      Create an Account
                    </Text>
  
                  </View>
              </TouchableOpacity>
  
              <TouchableOpacity onPress={() => this.props.navigation.navigate('PlayerLogin')}>
                  <View style = {{
                    width: SCREEN_WIDTH - 80,
                    height: 60,
                    backgroundColor:'rgb(255,255,255)',
                    borderColor: 'rgb(72,42,116)',
                    borderRadius:20,
                    borderWidth: 2,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Text style = {{
                      color: 'rgb(72,42,116)',
                      fontSize: 20,
                      fontWeight: 600,
                    }}>
                      Sign In
                    </Text>
                  </View>
              </TouchableOpacity>
            </View>
            <View style = {{
              alignSelf: 'center',
              justifyContent: 'center',
              width: SCREEN_WIDTH - 80,
              marginTop: 30
            }}>
              <Text style = {{
                color: 'rgb(195,195,195)',
                fontSize: 14,
                textAlign: 'center'
               }}>
  
                <Text>By tapping on any of the above fields you are accepting our </Text>
                <Text style={{fontWeight: "bold", color: 'rgb(100,100,100)'}} onPress={() => this.props.navigation.navigate('Terms')}>Terms and Conditions</Text>
              </Text>
            </View>
  
  
      </View>
    );
  }
}
