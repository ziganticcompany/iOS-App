import React from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native';
import bgImage from '../../../assets/images/LoginPageBackground.jpg';
import logo from '../../../assets/images/zigantic1.png';

import { FormInput, FormValidationMessage, SocialIcon, Row, Header, Icon } from 'react-native-elements';
//service providers
import { Form, Item, Input, Label, Button } from 'native-base';
import { FirebaseAuth } from '../../../providers/firebase';
import { commonStyles } from '../../../navigation/SideMenu';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class PlayerLoginOLD extends React.Component {
  state = { email: '', password: '', emailError: null, passwordError: null }

  handleLogin = () => {
    const { email, password } = this.state;

    if (email == "") {
      this.setState({ emailError: 'Email required' })
    }
    if (password == "") {
      this.setState({ passwordError: 'Password required' })
    }
    if (email == "" || password == "") {
      //alert('Username and Password required');
      console.log('Username and Password required');
      return;
    }
    FirebaseAuth.login(email, password)
      .then((res) =>
       {  console.log("login response", JSON.stringify(res));
       
         this.props.navigation.navigate('PlayerTabNavigator')}
       )
      .catch(error => {
        alert(error);
        console.log(error);
      });
  }

  render() {
    return (
      
      <View>
            <Header
              outerContainerStyles={{ zIndex: 1, height:95, borderBottomColor: 'rgb(72,42,116)', backgroundColor: 'rgb(72,42,116)'}}
              innerContainerStyles = {{alignItems: 'center'}}
              leftComponent ={
                <Button transparent style = {{ justifyContent: 'flex-start', alignItems: 'flex-start', width:55, marginLeft: 10, marginTop: 40}} onPress={() => this.props.navigation.navigate('PlayerAuthDecision')}>
                  <Icon style = {{height:25, width:25}} name = 'ios-arrow-back' type='ionicon' color='white' />
                </Button>
              }
              centerComponent = {
                <View style = {{alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 30, marginLeft: -40}}>
                    <Text style = {{fontSize: 20, fontWeight: '700', color: 'white'}}>SIGN IN</Text>
                </View>
              }
              containerStyle={{
                justifyContent: 'space-around',
              }}
            />
            <KeyboardAwareScrollView
              scrollEnabled = {false}
              extraHeight = {175}
            >
              <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
                <Image source={logo} style={{
                  width: 200,
                  height: 200,
                  marginVertical: 60,
                  resizeMode: 'contain'
                }} />
              </View>

              <View style={{
                  flex: 3,
                  backgroundColor: 'white'
              }}>
                  <View style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                  }}>
                      <View style={{
                          marginBottom: 18,
                          width: SCREEN_WIDTH - 55,
                          height: 55,
                          borderRadius: 5,
                      }}>
                          <Text style={{
                              fontSize: 15,
                              marginHorizontal: 9,
                              color: 'rgb(100,100,100)',
                              fontWeight: '600'
                          }}>   EMAIL
                          </Text>

                          <FormInput onChangeText={(email) => {this.setState({ email: email }) 
                            this.setState({ emailError: null }) }}
                            style={{
                              fontSize: 16,
                              marginHorizontal: 10,
                              marginTop: 5,
                              color: 'gray'
                            }}
                            placeholder = {'Enter email'}
                            placeholderTextColor = {'gray'}   
                            value={this.state.email}                                                  
                          />
                          <FormValidationMessage>{this.state.emailError}</FormValidationMessage>
                      </View>

                      <View style={{
                          marginTop: 20,
                          marginBottom: 18,
                          width: SCREEN_WIDTH - 55,
                          height: 55,
                          borderRadius: 5,
                      }}>
                          <Text style={{
                              fontSize: 15,
                              marginHorizontal: 9,
                              color: 'rgb(100,100,100)',
                              fontWeight: '600'
                          }}>   PASSWORD
                          </Text>
                          <FormInput onChangeText={(password) => {this.setState({ password: password }) 
                            this.setState({ passwordError: null }) }}
                            secureTextEntry={true}
                            style={{
                              fontSize: 16,
                              marginHorizontal: 10,
                              marginTop: 5,
                              color: 'gray'
                            }}
                            placeholder = {'Enter password'}
                            placeholderTextColor = {'gray'}   
                            value={this.state.password}                                                  
                          />
                          <FormValidationMessage>{this.state.passwordError}</FormValidationMessage>
                      </View>

                      <TouchableOpacity
                          style={{
                              width: SCREEN_WIDTH - 90,
                              height: 45,
                              backgroundColor: 'rgb(72,42,116)',
                              justifyContent: 'center',
                              marginTop: 10,
                          }}
                          onPress={() => this.handleLogin(this.state.email, this.state.password)}
                      >
                          <Text style={{
                              color: 'rgb(255,255,255)',
                              fontSize: 14,
                              fontWeight: '700',
                              textAlign: 'center'
                          }}>
                          Sign in </Text>
                      </TouchableOpacity>
                      <View style = {{
                          alignSelf: 'center',
                          justifyContent: 'center',
                          width: SCREEN_WIDTH - 80,
                          marginTop: 60,
                          marginBottom: 60
                      }}>
                          <Text style = {{
                              color: 'rgb(195,195,195)',
                              fontSize: 12,
                              textAlign: 'center'
                          }}>
                              <Text>DON'T HAVE AN ACCOUNT? </Text>                               
                              <Text style={{fontWeight: "bold", color: 'rgb(100,100,100)'}} onPress={() => this.props.navigation.navigate('PlayerSignup')}> CREATE ONE</Text>
                          </Text>
                      </View>
                      
                  </View>
                  
              </View>
            </KeyboardAwareScrollView>
          </View>
          

          /*
      <View>
      <KeyboardAwareScrollView
         scrollEnabled = {false}
         extraHeight = {175}
       >
        <View style={{ height: 175, backgroundColor: 'rgb(100,45,110)', alignItems: 'center', justifyContent: 'center' }}>
          <Image source={logo} style={{
            width: 175,
            height: 175,
            marginTop: 15,
            resizeMode: 'contain'
          }} />
          <Text style={{ color: 'white', fontSize: 36, fontWeight: '800', marginTop: 20 }}>Zigantic</Text>
        </View>
        
        

          <View style={{
            flex: 1,
            width: null,
            height: null,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>

            <View style={{
              marginTop: 20,
              marginBottom: 18,
              width: SCREEN_WIDTH - 55,
              height: 55,
              borderRadius: 5,
            }}>
              <Text style={styles.inputText}>   EMAIL</Text>
              <FormInput onChangeText={(email) => {
                this.setState({ email: email })
                this.setState({ emailError: null })
              }}
                style={styles.input}
                placeholder={'Enter email'}
                placeholderTextColor={'gray'}
                value={this.state.email}
              />
              <FormValidationMessage>{this.state.emailError}</FormValidationMessage>
              <Text style={styles.space}></Text>
            </View>



            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>   PASSWORD</Text>
              <FormInput onChangeText={(password) => {
                this.setState({ password: password })
                this.setState({ passwordError: null })
              }}
                secureTextEntry={true}
                style={styles.input}
                placeholder={'Enter password'}
                placeholderTextColor={'gray'}
                value={this.state.password}
              />
              <FormValidationMessage>{this.state.passwordError}</FormValidationMessage>
              <Text style={styles.space}></Text>
            </View>

            <TouchableOpacity onPress={() =>
              this.handleLogin(this.state.email, this.state.password)} 
              // this.props.navigation.navigate('PlayerTabNavigator')}
              style={styles.btnContainer}>
              <Text style={styles.btnText}>Sign in </Text>
            </TouchableOpacity>


            <Text style={{ fontWeight: '700', fontSize: 20, marginTop: 10, color: 'rgb(100,100,100)' }}>OR</Text>

            <View style={{
              alignItems: 'center', marginTop: 10
            }}>

              <TouchableOpacity>
                <SocialIcon
                  title='Sign In With Facebook'
                  style={{ width: SCREEN_WIDTH - 100 }}
                  button
                  type='facebook'
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <SocialIcon
                  title='Sign In With Google'
                  style={{ width: SCREEN_WIDTH - 100, borderColor: 'rgb(125,125,125)', backgroundColor: 'rgb(220,220,220)' }}
                  button
                  type='google'
                />
              </TouchableOpacity>


            </View>
            <View style={{ flexDirection: 'row', marginTop: 7 }}>

              <Text style={{
                color: 'rgb(125,125,125)',
                fontSize: 12,
                fontWeight: '600',
                textAlign: 'center',
                marginTop: 10,
              }}>DON'T HAVE AN ACCOUNT? </Text>

              <TouchableOpacity>
                <Text style={{
                  color: 'black',
                  fontSize: 12,
                  fontWeight: '700',
                  textAlign: 'center',
                  marginTop: 10,
                }}
                  onPress={() => this.props.navigation.navigate('PlayerSignup')}>SIGN UP</Text>
              </TouchableOpacity>
            </View>
          </View>
        



      </KeyboardAwareScrollView>
      </View>
                */
      
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

    marginTop: 50
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 30
  },
  inputText: {
    fontSize: 13,
    marginHorizontal: 9,
    color: 'rgb(150,150,150)',
    fontWeight: '600'

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
    marginTop: 15,
    marginBottom: 18,
    width: SCREEN_WIDTH - 55,
    height: 55,
    borderRadius: 5,
  },
  btnContainer: {
    width: SCREEN_WIDTH - 90,
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
    color: 'black',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
  },
});




