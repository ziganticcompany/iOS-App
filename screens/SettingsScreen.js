import React from 'react';
import { View, StyleSheet, Text, Image, Alert, Switch,  Dimensions,ImageBackground,TouchableHighlight, ScrollView, AsyncStorage } from 'react-native';
import SettingsList from 'react-native-settings-list';
import logo from '../assets/images/zigantic1.png';
import robot from '../assets/images/robot-dev.png';
import { Header, Avatar, Icon } from 'react-native-elements';
import{
  Card,
  CardItem,
  Body, Left, Right, Button
} from 'native-base'
import Colors from "../constants/Colors";
import { NavigationActions } from 'react-navigation'

//service providers
import { FirebaseAuth } from '../providers/firebase';

const {width: WIDTH} = Dimensions.get('window');
export default class SettingsScreen extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            isTabNavigatorRequire: false,
            password: "",
            error: null,
        };
    }


  handleLogout = () => {
    FirebaseAuth.logout()
    .then(() =>{ 
      this.storeData("","")
      this.props.navigation.navigate('PlayerAuthDecision')
    
    } )
    .catch(  error => 
        {alert(error);
        });
  }

  componentDidMount() {
      this._retrieveData()
  }
  
  storeData = async (email, password) => {
    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
    } catch (e) {
      // saving error
    }
  }


  _retrieveData = async () => {
  try {
    const email = await AsyncStorage.getItem('email');
    const password = await AsyncStorage.getItem('password');
    
    if(email === "zigantic.company@gmail.com" && password === "$ZAdmin#1"){
        this.setState({isTabNavigatorRequire:true})
    }else{
        this.setState({isTabNavigatorRequire:false})
    }
        // We have data!!
  } catch (error) {
   // Error retrieving data
  }
}
onItemPress = () => {
  
    Alert.alert(
      //title
      'Whoops…',
      //body
      'This feature is not in place yet. Check back soon!',
      [
        { text: 'Ok', onPress: () => console.log(''), style: 'cancel' },
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );

  }
  onLogOut=()=>{
    Alert.alert(
      //title
      'Logging out?',
      //body
      'Are you sure you want to log out?',
      [
        { text: 'No', style: 'cancel', },
        { text: 'Yes', onPress: () => this.handleLogout(), style: 'cancel' },
        
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );
    
  }

  render() {
    var bgColor = '#DCE3F4';
    return (    
      <View style={styles.container}>         
     <Header
        outerContainerStyles={{ zIndex: 1 }}
        backgroundColor={Colors.purpleColor}
        centerComponent={<View style={{alignItems: 'center'}}>
                            <Text style={{justifyContent: 'center', color: '#fff', alignContent:'center', fontSize: 20}}></Text> 
                        </View>}
      />   
        <ScrollView>
          <Card>

            {/*
            <CardItem bordered>
              <Body style = {{ justifyContent: 'center'}}>
                <Text style = {{fontSize: 15, fontWeight:'600', color: 'rgb(50,50,50)'}}>Notifications</Text>
              </Body>
              <Right>
                <View style = {{alignItems: 'flex-start'}}>
                  <Switch/>     
                </View>
              </Right>
            </CardItem>
            */}
{/*
            <CardItem bordered button onPress={() => this.onItemPress()} >
              
              <Body style = {{ justifyContent: 'center'}}>
                <Text style = {{fontSize: 15, fontWeight:'600', color: 'rgb(50,50,50)'}}>Notifications</Text>
              </Body>
              <Right>
              <View style = {{ justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Icon name = 'ios-arrow-forward' type='ionicon' color='rgb(200,200,200)' />
              </View>
              </Right>
            </CardItem>
            <CardItem bordered button onPress={() => this.onItemPress()} >
              <Body style = {{ justifyContent: 'center'}}>
                <Text style = {{fontSize: 15, fontWeight:'600', color: 'rgb(50,50,50)'}}>Share this App</Text>
              </Body>
              <Right>
              <View style = {{ justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Icon name = 'ios-arrow-forward' type='ionicon' color='rgb(200,200,200)' />
              </View>
              </Right>
            </CardItem>
            <CardItem bordered button onPress={() => this.onItemPress()} >
              <Body style = {{ justifyContent: 'center'}}>
                <Text style = {{fontSize: 15, fontWeight:'600', color: 'rgb(50,50,50)'}}>Help and FAQ</Text>
              </Body>
              <Right>
              <View style = {{ justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Icon name = 'ios-arrow-forward' type='ionicon' color='rgb(200,200,200)' />
              </View>
              </Right>
            </CardItem>
              */}
            <CardItem bordered button onPress={() => this.props.navigation.navigate('Terms')} >
              <Body style = {{ justifyContent: 'center'}}>
                <Text style = {{fontSize: 15, fontWeight:'600', color: 'rgb(50,50,50)'}}>Terms and Conditions</Text>
              </Body>
              <Right>
              <View style = {{ justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Icon name = 'ios-arrow-forward' type='ionicon' color='rgb(200,200,200)' />
              </View>
              </Right>
            </CardItem>
            <CardItem bordered button onPress={() => this.props.navigation.navigate('PrivacyPolicy')} >
              <Body style = {{ justifyContent: 'center'}}>
                <Text style = {{fontSize: 15, fontWeight:'600', color: 'rgb(50,50,50)'}}>Privacy Policy</Text>
              </Body>
              <Right>
              <View style = {{ justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Icon name = 'ios-arrow-forward' type='ionicon' color='rgb(200,200,200)' />
              </View>
              </Right>
            </CardItem>
            <CardItem bordered button onPress={() => this.props.navigation.navigate('NDA')} >
              <Body style = {{ justifyContent: 'center'}}>
                <Text style = {{fontSize: 15, fontWeight:'600', color: 'rgb(50,50,50)'}}>NDA</Text>
              </Body>
              <Right>
              <View style = {{ justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Icon name = 'ios-arrow-forward' type='ionicon' color='rgb(200,200,200)' />
              </View>
              </Right>
            </CardItem>
            {/*
            <CardItem bordered button onPress={() => this.onItemPress()} >
              <Body style = {{ justifyContent: 'center'}}>
                <Text style = {{fontSize: 15, fontWeight:'600', color: 'rgb(50,50,50)'}}>Rate our App</Text>
              </Body>
              <Right>
              <View style = {{ justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Icon name = 'ios-arrow-forward' type='ionicon' color='rgb(200,200,200)' />
              </View>
              </Right>
            </CardItem>
            <CardItem bordered button onPress={() => this.onItemPress()} >
              <Body style = {{ justifyContent: 'center'}}>
                <Text style = {{fontSize: 15, fontWeight:'600', color: 'rgb(50,50,50)'}}>Contact Us</Text>
              </Body>
              <Right>
              <View style = {{ justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Icon name = 'ios-arrow-forward' type='ionicon' color='rgb(200,200,200)' />
              </View>
              </Right>
            </CardItem>
            <CardItem bordered button onPress={() => this.onItemPress()} >
              <Body style = {{ justifyContent: 'center'}}>
                <Text style = {{fontSize: 15, fontWeight:'600', color: 'rgb(50,50,50)'}}>Report a Survey</Text>
              </Body>
              <Right>
              <View style = {{ justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Icon name = 'ios-arrow-forward' type='ionicon' color='rgb(200,200,200)' />
              </View>
              </Right>
            </CardItem>
            */}
            <CardItem bordered button onPress={() =>this.onLogOut() } >
              <Body style = {{ justifyContent: 'center'}}> 
                <Text style = {{fontSize: 15, fontWeight:'600', color: 'rgb(50,50,50)'}}>Log Out</Text>
              </Body>
              <Right>
              <View style = {{ justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Icon name = 'ios-arrow-forward' type='ionicon' color='rgb(200,200,200)' />
              </View>
              </Right>
            </CardItem>
            {this.state.isTabNavigatorRequire === true ? 
            <CardItem bordered button onPress={() => this.props.navigation.navigate('DeveloperTabNavigator')} >
              <Body style = {{ justifyContent: 'center'}}>
                <Text style = {{fontSize: 16, fontWeight:'600', color: 'rgb(50,50,50)'}}>ADMIN CONTROLS</Text>
              </Body>
              <Right>
              <View style = {{ justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Icon name = 'ios-arrow-forward' type='ionicon' color='rgb(200,200,200)' />
              </View>
              </Right>
            </CardItem> : null}
          </Card>
        </ScrollView>
      </View >
    );
  }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    backgroundContainer: {
        flex:1,
        width:null,
        height:null,
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      backgroundImage:{
        width:null,
        height:null,
      },
      logoContainer:{
        alignItems: 'center',
        marginBottom: 30,
      },
      logo: {
        width:150,
        height:150,
        marginTop: 30
      },
      inputText:{
        fontSize: 19,
        marginHorizontal: 10,
        color: 'black',
        marginTop: 5
        
      },
      input: {
        fontSize: 16,
        marginHorizontal: 10,
        marginTop: 5
        
      },
      inputContainer:{
        marginBottom: 18,
        backgroundColor: 'white',
        width: WIDTH - 55,
        height: 55,
        borderRadius: 5,
      },
      btnContainer:{
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: 'rgb(255,200,0)',
        justifyContent: 'center',
        marginTop:10,
      },
      btnText:{       
        color: 'rgb(255,255,255)',
        fontSize: 19,
        fontWeight: '700',
        textAlign: 'center'
      },
      or:{
        textAlign: 'center',
        fontSize: 14,
        color: 'white',
        fontWeight: '600',
        padding: 7
      },
      straightLine: {
        textAlign: 'center',
        fontSize: 10,
        color: 'white',
        fontWeight: '500',
        marginHorizontal: 20,
        opacity: 0.5
      },
      orBox:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20
      },
      welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
      },
      signUp: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
        fontWeight: '700',
        marginLeft: 10,
      }
});


  