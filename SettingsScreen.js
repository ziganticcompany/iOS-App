import React from 'react';
import { View, StyleSheet, Text, Image, Alert, Switch,  Dimensions,ImageBackground,TouchableHighlight, ScrollView } from 'react-native';
import SettingsList from 'react-native-settings-list';
import logo from '../assets/images/zigantic1.png';
import robot from '../assets/images/robot-dev.png';
import { Header, Avatar, Icon } from 'react-native-elements';
import{
  Card,
  CardItem,
  Body, Left, Right, Button
} from 'native-base'

//service providers
import { FirebaseAuth } from '../providers/firebase';

const {width: WIDTH} = Dimensions.get('window');
export default class SettingsScreen extends React.Component {

  handleLogout = () => {
    FirebaseAuth.logout()
    .then(() => this.props.navigation.navigate('PlayerAuthDecision') )
    .catch(  error => 
        {alert(error);
        console.log(error);
        });
  }

  render() {
    var bgColor = '#DCE3F4';
    return (    
      <View style={styles.container}>         
     <Header
        outerContainerStyles={{ zIndex: 1 }}
        backgroundColor='rgb(91,41,114)'
        //leftComponent={<Icon name='menu' color='#fff' onPress={() => this.props.navigation.toggleDrawer()}/>} 
        centerComponent={<View style={{alignItems: 'center'}}>
                            <Text style={{justifyContent: 'center', color: '#fff', alignContent:'center', fontSize: 20}}></Text> 
                        </View>}
//        rightComponent={<Icon name='home' color='#fff' onPress={() => this.props.navigation.navigate('PlayerAuthDecision')}/>} 
      />   
        <ScrollView>
          <Card>
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
            <CardItem bordered button >
              <Body style = {{ justifyContent: 'center'}}>
                <Text style = {{fontSize: 15, fontWeight:'600', color: 'rgb(50,50,50)'}}>Share this App</Text>
              </Body>
              <Right>
              <View style = {{ justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Icon name = 'ios-arrow-forward' type='ionicon' color='rgb(200,200,200)' />
              </View>
              </Right>
            </CardItem>
            <CardItem bordered button >
              <Body style = {{ justifyContent: 'center'}}>
                <Text style = {{fontSize: 15, fontWeight:'600', color: 'rgb(50,50,50)'}}>Help and FAQ</Text>
              </Body>
              <Right>
              <View style = {{ justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Icon name = 'ios-arrow-forward' type='ionicon' color='rgb(200,200,200)' />
              </View>
              </Right>
            </CardItem>
            <CardItem bordered button >
              <Body style = {{ justifyContent: 'center'}}>
                <Text style = {{fontSize: 15, fontWeight:'600', color: 'rgb(50,50,50)'}}>Terms and Conditions</Text>
              </Body>
              <Right>
              <View style = {{ justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Icon name = 'ios-arrow-forward' type='ionicon' color='rgb(200,200,200)' />
              </View>
              </Right>
            </CardItem>
            <CardItem bordered button >
              <Body style = {{ justifyContent: 'center'}}>
                <Text style = {{fontSize: 15, fontWeight:'600', color: 'rgb(50,50,50)'}}>Privacy Policy</Text>
              </Body>
              <Right>
              <View style = {{ justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Icon name = 'ios-arrow-forward' type='ionicon' color='rgb(200,200,200)' />
              </View>
              </Right>
            </CardItem>
            <CardItem bordered button >
              <Body style = {{ justifyContent: 'center'}}>
                <Text style = {{fontSize: 15, fontWeight:'600', color: 'rgb(50,50,50)'}}>Rate our App</Text>
              </Body>
              <Right>
              <View style = {{ justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Icon name = 'ios-arrow-forward' type='ionicon' color='rgb(200,200,200)' />
              </View>
              </Right>
            </CardItem>
            <CardItem bordered button >
              <Body style = {{ justifyContent: 'center'}}>
                <Text style = {{fontSize: 15, fontWeight:'600', color: 'rgb(50,50,50)'}}>Contact Us</Text>
              </Body>
              <Right>
              <View style = {{ justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Icon name = 'ios-arrow-forward' type='ionicon' color='rgb(200,200,200)' />
              </View>
              </Right>
            </CardItem>
            <CardItem bordered button >
              <Body style = {{ justifyContent: 'center'}}>
                <Text style = {{fontSize: 15, fontWeight:'600', color: 'rgb(50,50,50)'}}>Report a Survey</Text>
              </Body>
              <Right>
              <View style = {{ justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Icon name = 'ios-arrow-forward' type='ionicon' color='rgb(200,200,200)' />
              </View>
              </Right>
            </CardItem>
            <CardItem bordered button onPress={() => {this.props.navigation.navigate("OnBoardingScreen")}} >
              <Body style = {{ justifyContent: 'center'}}> 
                <Text style = {{fontSize: 15, fontWeight:'600', color: 'rgb(50,50,50)'}}>Log Out</Text>
              </Body>
              <Right>
              <View style = {{ justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Icon name = 'ios-arrow-forward' type='ionicon' color='rgb(200,200,200)' />
              </View>
              </Right>
            </CardItem>
            <CardItem bordered button onPress={() => this.props.navigation.navigate('DeveloperTabNavigator')} >
              <Body style = {{ justifyContent: 'center'}}>
                <Text style = {{fontSize: 15, fontWeight:'600', color: 'rgb(50,50,50)'}}>TEMP to DeveloperTabNavigator</Text>
              </Body>
              <Right>
              <View style = {{ justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Icon name = 'ios-arrow-forward' type='ionicon' color='rgb(200,200,200)' />
              </View>
              </Right>
            </CardItem>
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


  