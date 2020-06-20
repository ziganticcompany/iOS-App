import React from 'react';
import { Text, View, ImageBackground, Platform, StatusBar, Button, TouchableOpacity, Image} from 'react-native';
import bgImage from '../assets/images/LoginPageBackground.jpg';
import logo from '../assets/images/zigantic1.png';

//service providers
import styles from '../constants/Styles';

export default class PlayerOrDeveloperDecision extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}

          <ImageBackground source = {bgImage} style = {styles.backgroundContainer}>
            <View style = {styles.logoContainer}>
              <Image source = {logo} style = {styles.logo}/>
              <Text style = {styles.logoText}>ZIGANTIC</Text>
            </View>
            <View style = {styles.orBox}>
                <Text style = {styles.space}></Text>
                <Text style = {styles.space}></Text>
                <Text style = {styles.space}></Text>                
            </View>
            <TouchableOpacity style = {styles.btnLogin}>                
                <Text style = {styles.btnText} onPress={() => this.props.navigation.navigate('PlayerAuthLoading')}>Continue as Player</Text>                
            </TouchableOpacity>  
            <View style = {styles.orBox}>
                <Text style = {styles.space}></Text>
                <Text style = {styles.or}>OR</Text>
                <Text style = {styles.space}></Text>
            </View>
            <View >
                <Text style = {styles.space}> </Text>
            </View>            
            <TouchableOpacity style = {styles.btnLogin}>                
                <Text style = {styles.btnText} onPress={() => this.props.navigation.navigate('DeveloperAuthLoading')}>Continue as Developer</Text>                
            </TouchableOpacity>            
          </ImageBackground>          
        </View>
    );
  }
}
