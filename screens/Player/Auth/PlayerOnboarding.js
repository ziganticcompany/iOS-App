import React from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image, Dimensions, TextInput, KeyboardAvoidingView, Alert, StatusBar } from 'react-native';
import bgImage from '../../../assets/images/LoginPageBackground.jpg';
import logo from '../../../assets/images/zigantic1.png';
//import Icon from 'react-native-vector-icons/Ionicons';
import { FormInput, FormValidationMessage, SocialIcon, Button, Icon } from 'react-native-elements';
//service providers
import { FirebaseAuth } from '../../../providers/firebase';
import { commonStyles } from '../../../navigation/SideMenu';
//import styles from '../../../constants/Styles';
import Onboarding from 'react-native-onboarding-swiper';

const { width: WIDTH } = Dimensions.get('window');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class PlayerOnboarding extends React.Component {
  state = { email: '', password: '', emailError: null, passwordError: null }

  handleLogin = () => {
    const { email, password } = this.state;

    if (email == "") {
      this.setState({ emailError: 'Email Id required' })
    }
    if (password == "") {
      this.setState({ passwordError: 'Password required' })
    }
    if (email == "" || password == "") {
      //alert('Username and Password required');
      return;
    }
    FirebaseAuth.login(email, password)
      .then(() => this.props.navigation.navigate('PlayerTabNavigator'))
      .catch(error => {
        alert(error);
      });
  }

  render() {
    return (
      <Onboarding
        showDone={false}
        onSkip={() => Alert.alert('Skipped')}
        pages={[
          {
            title: 'Hey!',
            subtitle: 'Welcome to $App!',
            backgroundColor: '#003c8f',
            image: (
              <Icon
                name="hand-peace-o"
                type="font-awesome"
                size={100}
                color="white"
              />
            ),
          },
          {
            title: 'Send Messages',
            subtitle: 'You can reach everybody with us',
            backgroundColor: '#5e92f3',
            image: (
              <Icon
                name="paper-plane-o"
                type="font-awesome"
                size={100}
                color="white"
              />
            ),
          },
          {
            title: 'Get Notified',
            subtitle: 'We will send you notification as soon as something happened',
            backgroundColor: '#1565c0',
            image: (
              <Icon name="bell-o" type="font-awesome" size={100} color="white" />
            ),
          },
          {
            title: "That's Enough",
            subtitle: (
              <Button
                title={'Get Started'}
                containerViewStyle={{ marginTop: 20 }}
                backgroundColor={'white'}
                borderRadius={5}
                textStyle={{ color: '#003c8f' }}
                onPress={() => {
                  Alert.alert('done');
                  StatusBar.setBarStyle('default');
                }}
              />
            ),
            backgroundColor: '#003c8f',
            image: (
              <Icon name="rocket" type="font-awesome" size={100} color="white" />
            ),
          },
        ]}
      />

      /*
      <KeyboardAvoidingView style={styles.container}>  
        <View style = {styles.backgroundContainer}>
        <View style = {styles.logoContainer}>
          <Image source = {logo} style = {styles.logo}/>
        </View>        
        <View style = {styles.inputContainer}>
            <Text style = {styles.inputText}>   EMAIL</Text>
            <FormInput onChangeText={(email) => {this.setState({ email: email }) 
                                                    this.setState({ emailError: null }) }}
                                                    style = {styles.input}
                                                    placeholder = {'Enter email'}
                                                    placeholderTextColor = {'gray'}   
                                                    value={this.state.email}                                                  
            />
            <FormValidationMessage>{this.state.emailError}</FormValidationMessage>
            <Text style = {styles.space}></Text>
        </View> 
        <View style = {styles.inputContainer}>
            <Text style = {styles.inputText}>   PASSWORD</Text>
            <FormInput onChangeText={(password) => {this.setState({ password: password }) 
                                                    this.setState({ passwordError: null }) }}
                                                    secureTextEntry={true}
                                                    style = {styles.input}
                                                    placeholder = {'Enter password'}
                                                    placeholderTextColor = {'gray'}   
                                                    value={this.state.password}                                                  
            />
            <FormValidationMessage>{this.state.passwordError}</FormValidationMessage>
            <Text style = {styles.space}></Text>
        </View> 
        <TouchableOpacity onPress={() => this.handleLogin(this.state.email, this.state.password)} style = {styles.btnContainer}>
            <Text style = {styles.btnText}>Sign in </Text>            
        </TouchableOpacity>

       
        
        <TouchableOpacity>
          <Text style = {styles.forgotPass}>Forgot your password?</Text>
        </TouchableOpacity>

        <Text style = {styles.orLoginWith}> or login with </Text>
        <View style = {styles.altLogin}>
          <TouchableOpacity style={styles.circle}>
            <SocialIcon type='facebook' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circle}>
            <SocialIcon type='instagram' />
          </TouchableOpacity> 
        </View>
        <View style = {styles.space}></View>
        <View style = {{flexDirection:'row'}}>
          <Text style = {styles.forgotPass} onPress={() => this.props.navigation.navigate('PlayerSignup')}>Don't have an account?  </Text>
          <TouchableOpacity>
            <Text style = {styles.noAccount} onPress={() => this.props.navigation.navigate('PlayerSignup')}>Create one</Text>
          </TouchableOpacity>
        </View>
        
      </View>
      </KeyboardAvoidingView> */

    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgb(50,50,50)'
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 50
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 30
  },
  inputText: {
    fontSize: 15,
    marginHorizontal: 9,
    color: 'white',
    marginTop: 5

  },
  input: {
    fontSize: 16,
    marginHorizontal: 10,
    marginTop: 5,
    color: 'gray'
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'white',
    margin: 10,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 18,
    width: WIDTH - 55,
    height: 55,
    borderRadius: 5,
  },
  btnContainer: {
    width: WIDTH - 90,
    height: 45,
    backgroundColor: 'rgba(100,100,100,0.4)',
    justifyContent: 'center',
    marginTop: 10,
  },
  btnText: {
    color: 'rgb(255,255,255)',
    fontSize: 19,
    fontWeight: '700',
    textAlign: 'center'
  },
  orLoginWith: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Georgia-Italic'
  },
  forgotPass: {
    color: 'rgb(95,95,95)',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
  },
  space: {
    height: 45
  },
  circle: {
    borderWidth: 3,
    borderColor: 'rgb(95,95,95)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    //backgroundColor:'#fff',
    borderRadius: 50,
    marginTop: 15,
    marginHorizontal: 10
  },
  icon: {
    width: 5,
    height: 5,
  },
  altLogin: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  noAccount: {
    color: 'white',//'rgb(135,135,135)',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
  },
});




