import React from 'react'
import { Text, View, ImageBackground, TouchableOpacity, Image, TextInput, KeyboardAvoidingView} from 'react-native';
import bgImage from '../../../assets/images/LoginPageBackground.jpg';
import logo from '../../../assets/images/zigantic1.png';
//import Icon from 'react-native-vector-icons/Ionicons';

//service providers
import { FirebaseAuth } from '../../../providers/firebase';
import { commonStyles } from '../../../navigation/SideMenu';
import styles from '../../../constants/Styles';

export default class DeveloperLogin extends React.Component {
  state = { email: '', password: '', emailError: null, passwordError: null }

  handleLogin = () => {
    const { email, password } = this.state;

    if(email == "") 
    {
      this.setState({emailError: 'Email Id required'})
    }
    if(password == "") 
    {
      this.setState({passwordError: 'Password required'})
    }
    if(email == "" || password == ""){
      alert('Username and Password required');
      console.log('Username and Password required');
      return;
    }
    FirebaseAuth.login(email, password)
    .then(() => this.props.navigation.navigate('DeveloperTabNavigator') )
    .catch(  error => 
        {alert(error);
        console.log(error);
        });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>  
        <ImageBackground source = {bgImage} style = {styles.backgroundContainer}>
        <View style = {styles.logoContainer}>
          <Image source = {logo} style = {styles.logo}/>
        </View>        
        <View style = {styles.inputContainer}>
            <Text style = {styles.inputText}>Email</Text>
            <TextInput
                style = {styles.input}
                placeholder = {'Enter email'}
                placeholderTextColor = {'gray'}
                onChangeText={email => this.setState({email: email.trim()})}
                value={this.state.email}    
                error={this.state.emailError}            
            />
        </View>
        <View style = {styles.inputContainer}>
            <Text style = {styles.inputText} secureTextEntry={true} >Password</Text>
            <TextInput
                style = {styles.input}
                placeholder = {'Enter password'}
                secureTextEntry={true} 
                placeholderTextColor = {'gray'}
                onChangeText={password => this.setState({password: password.trim()})}
                value={this.state.password}             
                error={this.state.passwordError}   
            />
        </View>
        <TouchableOpacity onPress={() => this.handleLogin(this.state.email, this.state.password)} style = {styles.btnContainer}>
            <Text style = {styles.btnText}>Log in </Text>            
        </TouchableOpacity>


        <View style = {styles.orBox}>
            <Text style = {styles.straightLine}>--------------------------</Text>
            <Text style = {styles.or}>OR</Text>
            <Text style = {styles.straightLine}>--------------------------</Text>
        </View>

        <View style = {styles.space}></View>
        <Text style = {styles.space}> </Text>
        <Text style = {styles.space}></Text>
        <TouchableOpacity>
            <Text style = {styles.btnText} onPress={() => this.props.navigation.navigate('DeveloperSignup')}>Sign Up </Text>
        </TouchableOpacity>  
      </ImageBackground>
      </KeyboardAvoidingView>
    )
  }
}

