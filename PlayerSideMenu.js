import React from 'react'
//import { View, Text, StyleSheet, Image} from 'react-native'
import { StyleSheet,View, Image} from 'react-native'
import { Content, Container, Header, Body, Button, Text, Icon, List, ListItem  } from 'native-base'
import {createDrawerNavigator, createAppContainer, DrawerItems} from 'react-navigation';
import { FirebaseAuth } from '../../providers/firebase';
import { FirebaseData } from '../../providers/firebase';
const routes = ["Player Home", "Developer Home", "Player Rewards", "Settings", "Logout"]; 
const CustomDrawerContentComponent = (props) => (
    <Container>
      <Header style = {{height:200}}>
        <Body style = {styles.bodyStyle}>
          <Image style = {styles.drawerImage} source = {require('../../assets/images/profilepic.png')}/>
          <Text style = {styles.name}>this.state.name</Text>
          <Text style = {{fontSize: 15}}>this.state.email</Text>
        </Body>
      </Header>
      <Content>
        <DrawerItems {...props}/>
      </Content>
    </Container>
  )

export var BlankNavigationOptions = {
    header: null
}

export var LockedNavigationOptions = {
    header: null,
    drawerLockMode: 'locked-closed',
}

export default class PlayerSideMenu extends React.Component {

  state = { 
    name: 'Player Profile missing',
    email: ' ',
    grade: ' ',
    school: ' ',
}

  componentDidMount() {
 
    try{ 
      var ref = FirebaseData.getUserRef().child("TesterProfile");
          ref.on('value', (snap) => {  
                snap.forEach((child) => {      
                  this.setState({
                    name: child.val().firstName + ' ' + child.val().lastName,
                    email: child.val().email,
                    birthDay: child.val().birthDay,
                    school: child.val().school,
                    city: child.val().city,
                    zpoints: child.val().zpoints
                  });
                });                               
      });
    }
    catch(e)
    {
        //alert(e.message);
        console.log(e);
        return null;
    }
  }
  


    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
          routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
      }


    render() {
        return (                     
            <Container>
            <Header style = {{height:200}}>
              <Body style = {commonStyles.bodyStyle}>
                <Image style = {commonStyles.drawerImage} source = {require('../../assets/images/profilepic.png')} 
                />
                <Text onPress={() => this.props.navigation.navigate('PlayerProfile')} style = {commonStyles.name}>{this.state.name}</Text>
                <Text style = {{fontSize: 15}}>{this.state.email}</Text>
              </Body>           
            </Header>                    
            <Content>
              <List>
                <ListItem button onPress={() => this.props.navigation.navigate("PlayerTabNavigator")}>
                  <Text>Home</Text>
                </ListItem>
                <ListItem button onPress={() => this.props.navigation.navigate("PlayerReedem")}>
                  <Text>Z-Points</Text>
                </ListItem>
                <ListItem button onPress={() => this.props.navigation.navigate("SettingsScreen")}>
                  <Text>Settings</Text>
                </ListItem>
                <ListItem button onPress={() => {FirebaseAuth.logout(); this.props.navigation.navigate("PlayerAuthDecision")}}>
                  <Text>Logout</Text>
                </ListItem>
              </List>               
            </Content>            
          </Container>                 
        )
    }    
}

export const commonStyles = StyleSheet.create({

    viewBackground: {
        backgroundColor: "rgb(0,0,139)"
    },

    backgroundAlt: {
        backgroundColor: "#E1DABB",
    },

    altText: {
        color: "black",
        textAlign: "center",
    },
    
    card: {
        flex: 1,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
      marginBottom: 10,
      padding: 20,
    },
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      drawerImage:{
        height:75,
        width:75,
        marginBottom:10
       
      },
      bodyStyle:{
        alignItems: 'flex-start',
        marginHorizontal:20
      },
      name:{
        fontWeight: "500",
        marginBottom:5,
        fontSize: 15
      },
    button: {marginLeft:10,marginRight:10, marginTop: 10, marginBottom: 10,width:"90%"},
    text_input: {
        height: 60,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    }
  });