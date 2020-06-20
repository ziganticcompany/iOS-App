import React from 'react';
import { Text, View, ImageBackground, Button, TouchableOpacity, Image} from 'react-native';
import bgImage from '../../../assets/images/LoginPageBackground.jpg';
import logo from '../../../assets/images/zigantic1.png';

//service providers
import styles from '../../../constants/Styles';

export default class DeveloperAuthDecision extends React.Component {
  render() {
    return (
      <View style={styles.container}>   
      <ImageBackground source = {bgImage} style = {styles.backgroundContainer}>
        <View style = {styles.logoContainer}>
          <Image source = {logo} style = {styles.logo}/>
          <Text style = {styles.logoText}>ZIGANTIC</Text>
        </View>
        <TouchableOpacity style = {styles.btnLogin}>
            
            <Text style = {styles.btnText}>Continue with Google</Text>

        </TouchableOpacity>  

        <View style = {styles.orBox}>
            <Text style = {styles.straightLine}>--------------------------</Text>
            <Text style = {styles.or}>OR</Text>
            <Text style = {styles.straightLine}>--------------------------</Text>
        </View>

        
        <View style = {styles.decision}>
        <TouchableOpacity>
            
            <Text style = {styles.logIn} onPress={() => this.props.navigation.navigate('DeveloperLogin')}>Log In </Text>
            
        </TouchableOpacity>  
        <View style = {styles.space}></View>
        <TouchableOpacity>
            <Text style = {styles.signUp} onPress={() => this.props.navigation.navigate('DeveloperSignup')}>Sign Up</Text>
        </TouchableOpacity>  
        </View>
        <View style = {styles.bottom}>
        <Text style = {styles.bottomText}>By continuing, you agree to our </Text>
        <Text style = {styles.bottomText}> Terms and Conditions and Privacy Policy</Text>
        </View>
      </ImageBackground>
      </View> 
    );
  }
}

