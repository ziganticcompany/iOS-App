import React from 'react';
import { Text, View, ImageBackground, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView} from 'react-native';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckBox from 'react-native-checkbox';
import bgImage from '../../../assets/images/LoginPageBackground.jpg';
import logo from '../../../assets/images/zigantic1.png';
//import Icon from 'react-native-vector-icons/Ionicons';
import { FormInput, FormValidationMessage } from 'react-native-elements';
//service providers
import styles from '../../../constants/Styles';
import { FirebaseAuth } from '../../../providers/firebase';
import { FirebaseData } from '../../../providers/firebase';
//https://github.com/magus/react-native-facebook-login for facebook login
 
export default class DeveloperSignup extends React.Component {  
    state = { email: '', 
              emailError: null,
              password: '', 
              passwordError: null,
              bName: '', 
              bNameError: null,
              fName: '', lName: '',
              cPassword: '', 
              cPasswordError: null,
              tncchecked: false, 
              errorMessage: null }
    handleSignUp = () => {
  
      const { email, password, bName, fName, lName, cPassword, tncchecked } = this.state;
      if(email == "") {this.setState({emailError: "email required"}); return;}
      if(password == "") {this.setState({passwordError: "password required"}); return;}
      if(cPassword == "") {this.setState({cPasswordError: "confirm password required"}); return;}
      if(password != cPassword)
      { this.setState({passwordError: "Password and Confirm Password didn't match"});
        this.setState({cPasswordError: "Password and Confirm Password didn't match"});
        return;
        }   
      FirebaseAuth.createAccount(email, password)
      .then(() => 
        {
            FirebaseData.createDeveloperUserProfile(bName, fName, lName, email );
            this.props.navigation.navigate('DeveloperTabNavigator');
        }
        )
      .catch(  error => 
        {
            alert(error);
            console.log(error);
        }
        );
    }

    render() {
    return (
        <KeyboardAwareScrollView>
            <View style={styles.container}>    
                <ImageBackground source = {bgImage} style = {styles.backgroundContainer}>
                    <View style = {styles.logoContainer}>
                    <Image source = {logo} style = {styles.logo}/>
                    </View> 
                    <ScrollView contentContainerStyle={styles.contentContainerForScollView}>
                    <View style = {styles.inputContainer}>
                        <Text style = {styles.inputText}>  Business</Text>
                            <FormInput onChangeText={(bName) => {this.setState({ bName: bName }) 
                                                                    this.setState({ bName: null }) }}
                                                                    style = {styles.input}
                                                                    placeholder = {'enter business name'}
                                                                    placeholderTextColor = {'gray'}   
                                                                    value={this.state.bName}                                                  
                            />
                            <FormValidationMessage>{this.state.bNameError}</FormValidationMessage>
                    </View>    
                    <View style = {styles.inputContainer}>
                        <Text style = {styles.inputText}>  Email</Text>
                        <FormInput onChangeText={(email) => {this.setState({ email: email }) 
                                                                this.setState({ emailError: null }) }}
                                                                style = {styles.input}
                                                                placeholder = {'enter email'}
                                                                placeholderTextColor = {'gray'}   
                                                                value={this.state.email}                                                  
                        />
                        <FormValidationMessage>{this.state.emailError}</FormValidationMessage>
                    </View> 
                    <View style = {styles.inputContainer}>
                    <Text style = {styles.inputText}>  Password</Text>
                        <FormInput onChangeText={(password) => {this.setState({ password: password }) 
                                                                this.setState({ passwordError: null }) }}
                                                                secureTextEntry={true}
                                                                style = {styles.input}
                                                                placeholder = {'enter password'}
                                                                placeholderTextColor = {'gray'}   
                                                                value={this.state.password}                                                  
                        />
                        <FormValidationMessage>{this.state.passwordError}</FormValidationMessage>
                    </View>    
                    <View style = {styles.inputContainer}>
                    <Text style = {styles.inputText}>  Confirm Password</Text>
                        <FormInput onChangeText={(cPassword) => {this.setState({ cPassword: cPassword }) 
                                                                this.setState({ cPasswordError: null }) }}
                                                                secureTextEntry={true}
                                                                style = {styles.input}
                                                                placeholder = {'confirm password'}
                                                                placeholderTextColor = {'gray'}   
                                                                value={this.state.cPassword}                                                  
                        />
                        <FormValidationMessage>{this.state.cPasswordError}</FormValidationMessage>
                    </View>    
                                            
                    <CheckBox
                        label = 'I Accept the Terms and Conditions'
                        value={false}
                        onValueChange={(value) => {this.setState({ tncchecked: !value }); console.log('value changed')}}
                        value={this.setState.tncchecked}
                    />
                    </ScrollView>
                    <View style = {styles.submitContainer}>
                    <TouchableOpacity onPress={() => this.handleSignUp()} style = {styles.btnContainer}>
                        <Text style = {styles.btnText}>Sign up as a developer</Text>
                    </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </KeyboardAwareScrollView>
    );
  }
}

