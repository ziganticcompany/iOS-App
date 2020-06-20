import React, {Component} from 'react';
import {Platform, StyleSheet, View, AppRegistry, Text,  Image, 
  ImageBackground, TextInput, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
  import DateTimePicker from "react-native-modal-datetime-picker";

// import { withNativeAd } from 'expo/build/facebook-ads';
import {CheckBox} from 'native-base'
import { Header, Avatar, Icon, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import{
  Card,
  CardItem,
  Body, Left, Right, Button
} from 'native-base'  
import { FirebaseData } from '../../providers/firebase';
 

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class PlayerProfile extends React.Component {
  state = { 
    firstName: '',
    lastName: '',
    email: '',
    birthDay: '',
    school: '',
    city: '',
}
componentDidMount() {
  this.getTesterUserProfile();
}
  getUserDetails(){
    var userDetails = FirebaseData.getTesterUserProfile();
   // this.setState({ name: userDetails.name });
   console.log(userDetails);
    
  }
  getTesterUserProfile() {
 
    try{ 
        var ref = FirebaseData.getUserRef().child("TesterProfile");
            
            ref.on('value', (snap) => {  
                 
                  snap.forEach((child) => {      
                      this.setState({
                        firstName: child.val().firstName,
                        lastName: child.val().lastName,
                        email: child.val().email,
                        birthDay: child.val().birthDay,
                        school: child.val().school,
                        city: child.val().city,
                        zpoints: child.val().zpoints,
                        grade: child.val().grade,
                    });
                    console.log(child);
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
  onSave = () => {
    const { firstName, lastName, email, birthDay, school, city } = this.state;
    console.log('savedUser', firstName, lastName, email, birthDay, school, city);
    FirebaseData.updateTesterUserProfile(firstName, lastName, email, birthDay, school, city);
    this.props.navigation.navigate('PlayerGamesList');
  }
  render() {
    return (   

        <View style={{flex:1}}>       
            <Header
                outerContainerStyles={{ height:90 }}
                backgroundColor='rgb(91,41,114)'
                innerContainerStyles = {{alignItems: 'center'}}
                leftComponent ={
                <Button transparent style = {{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 40}} onPress={() => this.props.navigation.navigate('PlayerGamesList')}>
                    <Icon style = {{height:25, width:25}} name = 'ios-arrow-back' type='ionicon' color='white' />
                    <Text style = {{fontSize:18, color:'white', fontWeight: '600'}}>  Cancel</Text>

                </Button>
                } 
                rightComponent ={
                  <Button transparent style = {{ justifyContent: 'center', alignItems: 'center', marginTop: 40}} onPress={this.onSave}>
                      <Text style = {{fontSize:18, color:'white', fontWeight: '600'}}>Save</Text>
                  </Button>
                  } 
                
            />

            <ScrollView
              showsVerticalScrollIndicator = {false}
            >
            
            <View style = {{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20
            }}>
              <Avatar
                large
                rounded
                source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                }}
              />
              <Button transparent style = {{marginTop: 2, padding: 3, alignSelf: 'center'}}>
                <Text style = {{fontSize: 13, fontWeight: '600', color: 'rgb(40,120,255)'}}>EDIT PICTURE</Text>
              </Button>

            </View>

            <View style = {{alignItems: 'flex-start', justifyContent: 'center', marginHorizontal: 30, marginTop: 15}}>
              <Text style = {{fontWeight: '700', fontSize: 20}}>GENERAL</Text>
            </View>

            <View style = {{
                flex:1,
                width:null,
                height:null,
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>

              <View style = {{
                marginTop: 5,
                width: SCREEN_WIDTH - 55,
              }}>
                <FormLabel labelStyle = {{
                fontSize: 13,
                color: 'rgb(150,150,150)',
                fontWeight: '600'
              }}>FIRST NAME</FormLabel>

              <FormInput 
              inputStyle = {{
                fontSize: 16,
                fontWeight: '600',
                color: 'black'
              }}
                containerStyle = {{
                  marginHorizontal: 10,
                  marginTop: 5,
                }}
                value = {this.state.firstName}
                placeholderTextColor = {'black'}
                onChangeText={(firstName) => {this.setState({ firstName })}}                                                                         
              />
              </View>
              <View style = {{
                marginTop: 5,
                width: SCREEN_WIDTH - 55,
              }}>
                <FormLabel labelStyle = {{
                fontSize: 13,
                color: 'rgb(150,150,150)',
                fontWeight: '600'
              }}>LAST NAME</FormLabel>

              <FormInput 
              inputStyle = {{
                fontSize: 16,
                fontWeight: '600',
                color: 'black'
              }}
                containerStyle = {{
                  marginHorizontal: 10,
                  marginTop: 5,
                }}
                value = {this.state.lastName}
                placeholderTextColor = {'black'}  
                onChangeText={(lastName) => {this.setState({ lastName })}}                                                                         

              />
              </View>
              <View style = {{
                marginTop: 5,
                width: SCREEN_WIDTH - 55,
              }}>
                <FormLabel labelStyle = {{
                fontSize: 13,
                color: 'rgb(150,150,150)',
                fontWeight: '600'
              }}>EMAIL</FormLabel>

              <FormInput 
              inputStyle = {{
                fontSize: 16,
                fontWeight: '600',
                color: 'black'
              }}
                containerStyle = {{
                  marginHorizontal: 10,
                  marginTop: 5,
                }}
                value = {this.state.email}
                placeholderTextColor = {'black'}   
                onChangeText={(email) => {this.setState({ email })}}                                                                         

              />
              </View>
              <View style = {{
                marginTop: 5,
                width: SCREEN_WIDTH - 55,
              }}>
                <FormLabel labelStyle = {{
                fontSize: 13,
                color: 'rgb(150,150,150)',
                fontWeight: '600'
              }}>BIRTHDAY</FormLabel>

                <Text onPress={this.showDateTimePicker} 
                    style = {{
                      marginHorizontal: 10,
                      marginTop: 5,
                      fontSize: 16,
                      fontWeight: '600',
                      color: 'black'
                    }}
                    placeholderTextColor = {'gray'}   
                >
                    {this.state.birthDay} 
                </Text>
                <DateTimePicker 
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker} 
                />
              </View>
              <View style = {{
                marginTop: 5,
                width: SCREEN_WIDTH - 55,
              }}>
                <FormLabel labelStyle = {{
                fontSize: 13,
                color: 'rgb(150,150,150)',
                fontWeight: '600'
              }}>SCHOOL</FormLabel>

              <FormInput 
              inputStyle = {{
                fontSize: 16,
                fontWeight: '600',
                color: 'black'
              }}
                containerStyle = {{
                  marginHorizontal: 10,
                  marginTop: 5,
                }}
                value = {this.state.school}
                placeholderTextColor = {'black'}   
                onChangeText={(school) => {this.setState({ school })}}                                                                                    
              />
              </View>
              <View style = {{
                marginTop: 5,
                width: SCREEN_WIDTH - 55,
              }}>
                <FormLabel labelStyle = {{
                fontSize: 13,
                color: 'rgb(150,150,150)',
                fontWeight: '600'
              }}>CITY</FormLabel>

              <FormInput 
              inputStyle = {{
                fontSize: 16,
                fontWeight: '600',
                color: 'black'
              }}
                containerStyle = {{
                  marginHorizontal: 10,
                  marginTop: 5,
                }}
                value = {this.state.city}
                placeholderTextColor = {'black'}     
                onChangeText={(city) => {this.setState({ city })}}                                                                                    

              />
              </View>
              {/* <View style = {{
                marginTop: 5,
                width: SCREEN_WIDTH - 55,
              }}>
                <FormLabel labelStyle = {{
                fontSize: 13,
                color: 'rgb(150,150,150)',
                fontWeight: '600'
              }}>GRADE</FormLabel>

              <FormInput 
              inputStyle = {{
                fontSize: 16,
                fontWeight: '600',
                color: 'black'
              }}
                containerStyle = {{
                  marginHorizontal: 10,
                  marginTop: 5,
                }}
                placeholder = {this.state.grade}
                placeholderTextColor = {'black'}                                                                                     
              />
              </View> */}
              </View>
           
              <View style = {{alignItems: 'flex-start', justifyContent: 'center', marginHorizontal: 30, marginTop: 45}}>
                <Text style = {{fontWeight: '700', fontSize: 20}}>CHANGE PASSWORD</Text>
              </View> 

              <View style = {{
                flex:1,
                width:null,
                height:null,
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>

              <View style = {{
                marginTop: 5,
                width: SCREEN_WIDTH - 55,
              }}>
                <FormLabel labelStyle = {{
                fontSize: 13,
                color: 'rgb(150,150,150)',
                fontWeight: '600'
              }}>CURRENT PASSWORD</FormLabel>

              <FormInput 
              inputStyle = {{
                fontSize: 16,
                fontWeight: '600',
                color: 'black'
              }}
                containerStyle = {{
                  marginHorizontal: 10,
                  marginTop: 5,
                }}
                placeholder = {'Enter current password'}
                placeholderTextColor = {'gray'}
                secureTextEntry={true}                                                                                  
              />
              </View>

           

              <View style = {{
                marginTop: 5,
                width: SCREEN_WIDTH - 55,
              }}>
                <FormLabel labelStyle = {{
                fontSize: 13,
                color: 'rgb(150,150,150)',
                fontWeight: '600'
              }}>NEW PASSWORD</FormLabel>

              <FormInput 
              inputStyle = {{
                fontSize: 16,
                fontWeight: '600',
                color: 'black'
              }}
                containerStyle = {{
                  marginHorizontal: 10,
                  marginTop: 5,
                }}
                placeholder = {'Enter new password'}
                placeholderTextColor = {'gray'} 
                secureTextEntry={true}                                                                                    
              />
              </View>
            
              <View style = {{
                marginTop: 5,
                marginBottom: 20,
                width: SCREEN_WIDTH - 55,
              }}>
                <FormLabel labelStyle = {{
                fontSize: 13,
                color: 'rgb(150,150,150)',
                fontWeight: '600'
              }}>CONFIRM NEW PASSWORD</FormLabel>

              <FormInput 
              inputStyle = {{
                fontSize: 16,
                fontWeight: '600',
                color: 'black'
              }}
                containerStyle = {{
                  marginHorizontal: 10,
                  marginTop: 5,
                }}
                placeholder = {'Confirm new password'}
                placeholderTextColor = {'gray'} 
                secureTextEntry={true}                                                                                    
              />
              </View>

              </View>
              </ScrollView>
        
        
            
        
      </View>
      
       
       
    );
    }
  }

  

  
      
      
      



  