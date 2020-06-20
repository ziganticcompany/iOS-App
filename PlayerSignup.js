import React from 'react';
import { Text, View, ImageBackground, Dimensions, TouchableOpacity, Image, ScrollView, Slider} from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import { Button } from 'native-base';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import bgImage from '../../../assets/images/backgroundImage.jpg';
import logo from '../../../assets/images/profilepic.png';
import { FormInput, FormValidationMessage, Header, Icon, SocialIcon, CheckBox } from 'react-native-elements';
//service providers
import styles from '../../../constants/Styles';
import { FirebaseAuth } from '../../../providers/firebase';
import { FirebaseData } from '../../../providers/firebase';
//https://github.com/magus/react-native-facebook-login for facebook login

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class PlayerSignup extends React.Component {  
    state = { firstName: '', 
              firstNameError: null,
              lastName: '', 
              lastNameError: null,
              email: '', 
              emailError: null,
              birthDay: '',
              birthDayError: null,
              password: '', 
              passwordError: null,
              school: '', 
              schoolError: null,
              city: '',
              cityError: null,
              grade: 9,              
              cPassword: '', 
              cPasswordError: null,
              tncchecked: false, 
              rpechecked: false,
              eulachecked: false, 
              errorMessage: null,
              isDateTimePickerVisible: false }

    handleSignUp = () => {
      const { firstName, lastName ,email, birthDay, city, password, school, grade, cPassword, tncchecked, rpechecked } = this.state;
      if(firstName == "") {this.setState({firstNameError: "Please enter first name"}); return;}
      if(lastName == "") {this.setState({lastNameError: "Please enter last name"}); return;}

      if(email == "") {this.setState({emailError: "Please enter an email"}); return;}
      if(birthDay == "") {this.setState({birthDayError: "Please enter birthday"}); return;}
      if(city == "") {this.setState({cityError: "Please enter city of residence"}); return;}

      if(password == "") {this.setState({passwordError: "Please enter a password required"}); return;}
      if(cPassword == "") {this.setState({cPasswordError: "Please confirm your password"}); return;}
      if(password != cPassword)
      { this.setState({passwordError: "Password and Confirm Password didn't match"});
        this.setState({cPasswordError: "Password and Confirm Password didn't match"});
        return;
        }   
        console.log(email, password)
      FirebaseAuth.createAccount(email, password)
      .then(() => 
        {
            FirebaseData.createTesterUserProfile(firstName, lastName, email, birthDay, school, city);
            this.props.navigation.navigate('PlayerTabNavigator');
        }
        )
      .catch(  error => 
        {
            alert(error);
            console.log(error);
        }
        );
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = birthDay => {
        utc = birthDay.getTime() + (birthDay.getTimezoneOffset() * 60000);
        offset = 17;
        nd = new Date(utc + (3600000*offset));
        this.setState({ birthDay: nd.toISOString().split('T')[0] }) 
        this.setState({ birthDayError: null }) 
        console.log("A date has been picked: ", nd, nd.toISOString().split('T')[0]);
        this.hideDateTimePicker();
    };
    render() {
        console.log(this.state.birthDay)
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
                    <Text style = {{fontSize: 20, fontWeight: '700', color: 'white'}}>JOIN ZIGANTIC</Text>
                </View>
              }
              containerStyle={{
                justifyContent: 'space-around',
              }}
            />
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                extraHeight = {175}
                style = {{marginBottom: 60}}
            >
                <View style={{
                    alignItems: 'center', marginTop: 10, flexDirection: 'row',
                }}>
                    <View style = {{flex: 1, marginLeft: 20}}>
                        <TouchableOpacity>
                            <SocialIcon
                                title='Facebook'
                                style={{ width: SCREEN_WIDTH - 220, borderRadius: 5, height: 50}}
                                button
                                type='facebook'
                            />
                        </TouchableOpacity>
                    </View>

                    <View style = {{flex: 1, marginRight: 20}}>
                        <TouchableOpacity>
                            <SocialIcon
                            title='Google'
                            style={{ width: SCREEN_WIDTH - 220, borderColor: 'rgb(125,125,125)', height:50, borderRadius: 5, backgroundColor: 'rgb(220,220,220)' }}
                            button
                            type='google'
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 20
                }}>
                    
                    <View style = {{flex:1, alignItems: 'center', justifyContent: 'center', marginLeft: 20}}>
                        <Text style = {{color: 'rgb(235,235,235)', marginTop: -10}}>_________________  </Text>
                    </View>
                    <View style = {{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style = {{fontSize: 17, fontWeight: '600', color: 'rgb(90,90,90)'}}>or sign up</Text>
                    </View>
                    <View style = {{flex:1, alignItems: 'center', justifyContent: 'center', marginRight: 20}}>
                        <Text style = {{color: 'rgb(235,235,235)', marginTop: -10}}>  _________________</Text>
                    </View>
                </View>

                <View style = {{
                    flex: 1,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginLeft: 20,
                    marginTop: 20,
                }}>
                    <Text style={{
                        fontSize: 20,
                        marginHorizontal: 9,
                        color: 'rgb(20,20,20)',
                        fontWeight: '700',
                        
                        marginBottom: 10,
                        marginLeft: 19
                    }}>GENERAL
                    </Text>
                    <View style={{
                        marginBottom: 30,
                        width: SCREEN_WIDTH - 55,
                        height: 55,
                        borderRadius: 5,
                    }}>
                        <Text style={{
                            fontSize: 15,
                            marginHorizontal: 9,
                            color: 'rgb(60,60,60)',
                            fontWeight: '600'
                        }}>   FIRST NAME</Text>
                        <FormInput onChangeText={(firstName) => {this.setState({ firstName }) 
                                                                this.setState({ firstNameError: null }) }}
                                                                style = {styles.input}
                                                                placeholder = {''}
                                                                placeholderTextColor = {'gray'}   
                                                                value={this.state.firstName}                                                  
                        />
                        <FormValidationMessage>{this.state.firstNameError}</FormValidationMessage>
                    </View>  

                    <View style={{
                        marginBottom: 30,
                        width: SCREEN_WIDTH - 55,
                        height: 55,
                        borderRadius: 5,
                    }}>
                        <Text style={{
                            fontSize: 15,
                            marginHorizontal: 9,
                            color: 'rgb(60,60,60)',
                            fontWeight: '600'
                        }}>   LAST NAME</Text>   
                        <FormInput onChangeText={(lastName) => {this.setState({ lastName }) 
                                                                this.setState({ lastNameError: null }) }}
                                                                style = {styles.input}
                                                                placeholder = {''}
                                                                placeholderTextColor = {'gray'}   
                                                                value={this.state.lastName}                                                  
                        />
                        <FormValidationMessage>{this.state.lastNameError}</FormValidationMessage>
                    </View>

                    <View style={{
                        marginBottom: 30,
                        width: SCREEN_WIDTH - 55,
                        height: 55,
                        borderRadius: 5,
                    }}>
                        <Text style={{
                            fontSize: 15,
                            marginHorizontal: 9,
                            color: 'rgb(60,60,60)',
                            fontWeight: '600'
                        }}>   EMAIL
                        </Text>
                        <FormInput onChangeText={(email) => {this.setState({ email: email }) 
                                                                this.setState({ emailError: null }) }}
                                                                style = {styles.input}
                                                                placeholder = {''}
                                                                placeholderTextColor = {'gray'}   
                                                                value={this.state.email}                                                  
                        />
                        <FormValidationMessage>{this.state.emailError}</FormValidationMessage>
                    </View>

                    <View style = {{
                        marginBottom: 30,
                        width: SCREEN_WIDTH - 55,
                        height: 55,
                        borderRadius: 5,
                        borderColor: 'rgb(202,200, 200)'}}>
                        <Text style={{
                            fontSize: 15,
                            marginHorizontal: 9,
                            color: 'rgb(60,60,60)',
                            fontWeight: '600'
                        }}>   BIRTHDAY </Text>
                        
                        <Text onPress={this.showDateTimePicker} 
                            style = {{
                                fontSize: 15,
                                marginLeft: 20,
                                marginTop: 20,
                                color: 'gray',
                                fontWeight: '500'
                            }}  
                        > 
                            {this.state.birthDay ? this.state.birthDay: 'SELECT BIRTHDAY'} 
                        </Text>
                        <Text style = {{
                                fontSize: 15,
                                marginLeft: 20,
                                color: 'rgb(202,200, 200)',
                                fontWeight: '500',
                                
                            }}>
                                ___________________________________________
                        </Text>
                        <DateTimePicker 
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker} 
                            style = {styles.input}                                     
                        />
                        <FormValidationMessage>{this.state.birthDayError}</FormValidationMessage>
                    </View>      

                    <View style={{
                        marginTop: 30,
                        marginBottom: 30,
                        width: SCREEN_WIDTH - 55,
                        height: 55,
                        borderRadius: 5,
                    }}>
                        <Text style={{
                            fontSize: 15,
                            marginHorizontal: 9,
                            color: 'rgb(60,60,60)',
                            fontWeight: '600'
                        }}>   SCHOOL NAME
                        </Text>


                        <FormInput onChangeText={(school) => {this.setState({ school }) 
                                                                    this.setState({ schoolError: null }) }}
                                                                    style = {styles.input}
                                                                    placeholder = {''}
                                                                    placeholderTextColor = {'gray'}   
                                                                    value={this.state.school}                                                  
                            />
                            <FormValidationMessage>{this.state.schoolError}</FormValidationMessage>
                    </View>

                    <View style={{
                        marginBottom: 30,
                        width: SCREEN_WIDTH - 55,
                        height: 55,
                        borderRadius: 5,
                    }}>
                        <Text style={{
                            fontSize: 15,
                            marginHorizontal: 9,
                            color: 'rgb(60,60,60)',
                            fontWeight: '600'
                        }}>   CITY
                        </Text>


                        <FormInput onChangeText={(city) => {this.setState({ city }) 
                                                                    this.setState({ cityError: null }) }}
                                                                    style = {styles.input}
                                                                    placeholder = {''}
                                                                    placeholderTextColor = {'gray'}   
                                                                    value={this.state.city}                                                  
                            />
                            <FormValidationMessage>{this.state.cityError}</FormValidationMessage>
                    </View>
                    <Text style={{
                        fontSize: 20,
                        marginHorizontal: 9,
                        color: 'rgb(20,20,20)',
                        fontWeight: '700',
                        marginTop: 20,
                        marginBottom: 10,
                        marginLeft: 19
                    }}>PASSWORD
                    </Text>
                    <View style={{
                        marginBottom: 60,
                        width: SCREEN_WIDTH - 55,
                        height: 55,
                        borderRadius: 5,
                    }}>
                        <Text style={{
                            fontSize: 15,
                            marginHorizontal: 9,
                            color: 'rgb(60,60,60)',
                            fontWeight: '600'
                        }}>   PASSWORD
                        </Text>
                        <Text style={{
                            fontSize: 13,
                            marginTop: 5,
                            marginHorizontal: 9,
                            color: 'rgb(150,150,150)',
                            fontWeight: '400',
                            textAlign: 'left'
                        }}>   
                        
                        <Text>   Must include a symbol or number and have at</Text>
                        {"\n"}
                        <Text>   least 6 characters</Text>
                        </Text>


                        <FormInput onChangeText={(password) => {this.setState({ password: password }) 
                                                                this.setState({ passwordError: null }) }}
                                                                secureTextEntry={true}
                                                                style = {styles.input}
                                                                placeholder = {''}
                                                                placeholderTextColor = {'gray'}   
                                                                value={this.state.password}                                                  
                        />
                        <FormValidationMessage>{this.state.passwordError}</FormValidationMessage>
                    </View>

                    <View style={{
                        marginBottom: 20,
                        width: SCREEN_WIDTH - 55,
                        height: 55,
                        borderRadius: 5,
                    }}>
                        <Text style={{
                            fontSize: 15,
                            marginHorizontal: 9,
                            color: 'rgb(60,60,60)',
                            fontWeight: '600'
                        }}>   CONFIRM PASSWORD
                        </Text>


                        <FormInput onChangeText={(cPassword) => {this.setState({ cPassword: cPassword }) 
                                                                this.setState({ cPasswordError: null }) }}
                                                                secureTextEntry={true}
                                                                style = {styles.input}
                                                                placeholder = {''}
                                                                placeholderTextColor = {'gray'}   
                                                                value={this.state.cPassword}                                                  
                        />
                        <FormValidationMessage>{this.state.cPasswordError}</FormValidationMessage>
                    </View>
                </View>
                <View style = {{alignItems: 'center', justifyContent: 'center', width: 300}}>
                                          
                        <CheckBox
                            title = 'I have read over and agree to the Terms and Conditions'
                            checked={this.state.tncchecked}
                            onPress={(value) => {this.setState({ tncchecked: !value })}}
                        />
                        <CheckBox
                            title='I have read over and agree to the Privacy Policy'
                            checked={this.state.rpechecked}
                            onPress={(value) => {this.setState({ rpechecked: !value })}}
                        />              
                        <CheckBox
                            title = 'I have read over and agree to the NDA and EULA'
                            checked={this.state.eulachecked}
                            onPress={(value) => {this.setState({ eulachecked: !value })}}
                        />
                </View>
                <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity
                    style={{
                        width: SCREEN_WIDTH - 90,
                        height: 45,
                        backgroundColor: 'rgb(72,42,116)',
                        justifyContent: 'center',
                        marginTop: 10,
                    }}
                    onPress={() => this.handleSignUp()}
                >
                    <Text style={{
                        color: 'rgb(255,255,255)',
                        fontSize: 14,
                        fontWeight: '700',
                        textAlign: 'center'
                    }}>
                    Sign up </Text>
                </TouchableOpacity>
                </View>
                <View style = {{
                          alignSelf: 'center',
                          justifyContent: 'center',
                          width: SCREEN_WIDTH - 80,
                          marginTop: 20,
                          marginBottom: 100
                      }}>
                          <Text style = {{
                              color: 'rgb(195,195,195)',
                              fontSize: 12,
                              textAlign: 'center'
                          }}>
                              <Text>ALREADY HAVE AN ACCOUNT? </Text>                               
                              <Text style={{fontWeight: "bold", color: 'rgb(100,100,100)'}} onPress={() => this.props.navigation.navigate('PlayerLogin')}> SIGN IN</Text>
                          </Text>
                      </View>
                </KeyboardAwareScrollView>
                </View>
        /*
            <View>    
                
                    <KeyboardAwareScrollView>
                    <View style = {{marginTop:30,marginBottom:10, alignItems: 'center'}}>
                    <Image source = {logo} style = {{width:75,height:75}}/>
                    </View> 
 
                    <View style = {{marginTop: 15,
                        marginBottom: 18,
                        width: SCREEN_WIDTH - 55,
                        height: 55,
                        borderRadius: 5,}}>
                        <Text style = {{
                            fontSize: 13,
                            marginHorizontal: 9,
                            color: 'rgb(150,150,150)',
                            fontWeight: '600'}}>   First Name</Text>
                        <FormInput onChangeText={(firstName) => {this.setState({ firstName }) 
                                                                this.setState({ firstNameError: null }) }}
                                                                style = {styles.input}
                                                                placeholder = {'Enter First Name'}
                                                                placeholderTextColor = {'gray'}   
                                                                value={this.state.firstName}                                                  
                        />
                        <FormValidationMessage>{this.state.firstNameError}</FormValidationMessage>
                    </View>   
                    <View style = {{marginTop: 15,
                        marginBottom: 18,
                        width: SCREEN_WIDTH - 55,
                        height: 55,
                        borderRadius: 5,}}>
                        <Text style = {{
                            fontSize: 13,
                            marginHorizontal: 9,
                            color: 'rgb(150,150,150)',
                            fontWeight: '600'}}>   Last Name</Text>
                        <FormInput onChangeText={(lastName) => {this.setState({ lastName }) 
                                                                this.setState({ lastNameError: null }) }}
                                                                style = {styles.input}
                                                                placeholder = {'Enter Last Name'}
                                                                placeholderTextColor = {'gray'}   
                                                                value={this.state.lastName}                                                  
                        />
                        <FormValidationMessage>{this.state.lastNameError}</FormValidationMessage>
                    </View>    
                             
                    <View style = {{marginTop: 15,
                        marginBottom: 18,
                        width: SCREEN_WIDTH - 55,
                        height: 55,
                        borderRadius: 5,}}>
                        <Text style = {{
                            fontSize: 13,
                            marginHorizontal: 9,
                            color: 'rgb(150,150,150)',
                            fontWeight: '600'}}>   Email</Text>
                        <FormInput onChangeText={(email) => {this.setState({ email: email }) 
                                                                this.setState({ emailError: null }) }}
                                                                style = {styles.input}
                                                                placeholder = {'Enter email'}
                                                                placeholderTextColor = {'gray'}   
                                                                value={this.state.email}                                                  
                        />
                        <FormValidationMessage>{this.state.emailError}</FormValidationMessage>
                    </View> 
                    <View style = {{marginTop: 15,
                        marginBottom: 18,
                        width: SCREEN_WIDTH - 55,
                        height: 55,
                        borderRadius: 5,}}>
                        <Text style = {{
                            fontSize: 13,
                            marginHorizontal: 9,
                            color: 'rgb(150,150,150)',
                            fontWeight: '600'}}>   BirthDay </Text>
                        <Text onPress={this.showDateTimePicker} 
                            style = {styles.input}
                            placeholderTextColor = {'gray'}   
                        >
                            {this.state.birthDay ? this.state.birthDay: 'Enter birthDay'} 
                        </Text>
                        <DateTimePicker 
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker} 
                            style = {styles.input}                                     
                        />
                        <FormValidationMessage>{this.state.birthDayError}</FormValidationMessage>
                    </View>          
                    <View style = {{marginTop: 15,
                        marginBottom: 18,
                        width: SCREEN_WIDTH - 55,
                        height: 55,
                        borderRadius: 5,}}>
                        <Text style = {{fontSize: 13,
                            marginHorizontal: 9,
                            color: 'rgb(150,150,150)',
                            fontWeight: '600'}}>   School</Text>
                            <FormInput onChangeText={(school) => {this.setState({ school }) 
                                                                    this.setState({ schoolError: null }) }}
                                                                    style = {styles.input}
                                                                    placeholder = {'Enter school name'}
                                                                    placeholderTextColor = {'gray'}   
                                                                    value={this.state.school}                                                  
                            />
                            <FormValidationMessage>{this.state.schoolError}</FormValidationMessage>
                    </View>  
                    <View style = {{marginTop: 15,
                        marginBottom: 18,
                        width: SCREEN_WIDTH - 55,
                        height: 55,
                        borderRadius: 5,}}>
                        <Text style = {{fontSize: 13,
                            marginHorizontal: 9,
                            color: 'rgb(150,150,150)',
                            fontWeight: '600'}}>   City of residence</Text>
                            <FormInput onChangeText={(city) => {this.setState({ city }) 
                                                                    this.setState({ cityError: null }) }}
                                                                    style = {styles.input}
                                                                    placeholder = {'Enter City of residence'}
                                                                    placeholderTextColor = {'gray'}   
                                                                    value={this.state.city}                                                  
                            />
                            <FormValidationMessage>{this.state.cityError}</FormValidationMessage>
                    </View>  
                    

                    <View style = {{marginTop: 15,
                        marginBottom: 18,
                        width: SCREEN_WIDTH - 55,
                        height: 55,
                        borderRadius: 5,}}>
                    <Text style = {{fontSize: 13,
                        marginHorizontal: 9,
                        color: 'rgb(150,150,150)',
                        fontWeight: '600'}}>   Password</Text>
                        <FormInput onChangeText={(password) => {this.setState({ password: password }) 
                                                                this.setState({ passwordError: null }) }}
                                                                secureTextEntry={true}
                                                                style = {styles.input}
                                                                placeholder = {'Enter password'}
                                                                placeholderTextColor = {'gray'}   
                                                                value={this.state.password}                                                  
                        />
                        <FormValidationMessage>{this.state.passwordError}</FormValidationMessage>
                    </View>   
                     
                    <View style = {{marginTop: 15,
                        marginBottom: 18,
                        width: SCREEN_WIDTH - 55,
                        height: 55,
                        borderRadius: 5,}}>
                    <Text style = {{fontSize: 13,
                        marginHorizontal: 9,
                        color: 'rgb(150,150,150)',
                        fontWeight: '600'}}>   Confirm Password</Text>
                        <FormInput onChangeText={(cPassword) => {this.setState({ cPassword: cPassword }) 
                                                                this.setState({ cPasswordError: null }) }}
                                                                secureTextEntry={true}
                                                                style = {styles.input}
                                                                placeholder = {'Confirm password'}
                                                                placeholderTextColor = {'gray'}   
                                                                value={this.state.cPassword}                                                  
                        />
                        <FormValidationMessage>{this.state.cPasswordError}</FormValidationMessage>
                    </View>    
                    <View style = {{alignItems:'flex-start', flexDirection: "row"}}>                        
                        <CheckBox
                            label = ''
                            style = {{color:'white'}}
                            value={false}
                            onValueChange={(value) => {this.setState({ tncchecked: !value }); console.log('value changed')}}
                            value={this.setState.tncchecked}
                        />
                        <Text  onPress={() => this.props.navigation.navigate('PlayerOnboarding')} style = {{color:'black'}}> I Accept the Terms and Conditions</Text>
                    </View>
                    
                    <View style = {{alignItems:'flex-start', flexDirection: "row"}}  onPress={() => this.props.navigation.navigate('PlayerOnboarding')}>      

                    <CheckBox
                        label = ''
                        style = {{color:'white'}}
                        value={false}
                        onValueChange={(value) => {this.setState({ rpechecked: !value }); console.log('value changed')}}
                        value={this.setState.rpechecked}
                    />
                    <Text  onPress={() => this.props.navigation.navigate('PlayerOnboarding')} style = {{color:'black'}}> I agree to the Privacy Policy </Text>
                    </View>

                    <View style = {{alignItems:'flex-start', flexDirection: "row"}}>                        
                        <CheckBox
                            label = ''
                            style = {{color:'white'}}
                            value={false}
                            onValueChange={(value) => {this.setState({ eulachecked: !value }); console.log('value changed')}}
                            value={this.setState.eulachecked}
                        />
                        <Text  onPress={() => this.props.navigation.navigate('PlayerOnboarding')} style = {{color:'black'}}> I agree to the EULA and NDA </Text>
                    </View>


                     </KeyboardAwareScrollView>
                    <View style = {styles.submitContainer}>
                        <Text style = {styles.space}></Text>
                        <TouchableOpacity onPress={() => this.handleSignUp()} style = {{
                            width: SCREEN_WIDTH - 90,
                            height: 35,
                            backgroundColor: 'rgba(100,100,100,0.4)',
                            justifyContent: 'center',
                            marginTop:10,}}>
                            <Text style = {styles.btnText}>Create Account</Text>
                        </TouchableOpacity>
                        <Text style = {styles.space}></Text>
                        <Text style = {styles.bottomTextWithMargin} onPress={() => this.props.navigation.navigate('PlayerLogin')}>Already have an account?</Text>
                    </View>
               
            </View>
        */


    );
  }
}

