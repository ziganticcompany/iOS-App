import React, {Component} from 'react';
import {Platform, StyleSheet, View, AppRegistry, Text,  Image, 
  ImageBackground, TextInput, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
// import { withNativeAd } from 'expo/build/facebook-ads';
import {CheckBox} from 'native-base'
import { Header, Avatar, Icon, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import{
  Card,
  CardItem,
  Body, Left, Right, Button
} from 'native-base'  


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class PlayerMCQuestion2 extends React.Component {
  render() {
    return (   
        
        <View style={{flex:1}}>       
            <Header
                outerContainerStyles={{ height:90 }}
                backgroundColor='rgb(100,45,110)'
                innerContainerStyles = {{alignItems: 'center'}}
                
                
            />
            <View style = {{alignItems: 'center', justifyContent: 'center', flexDirection:'row',marginTop:-1}}>
              
            <View style = {{
                width:SCREEN_WIDTH*(2/5), //Make variable that corresponds with the view before so widths add up to screen_width
                height: 6,
                backgroundColor: 'green',
              
                }}>
            </View>
            
            
            <View style = {{
               width: SCREEN_WIDTH*(3/5),
               height: 6,
               backgroundColor: 'rgba(107,194,130,0.4)',

               }}>
            </View>  
            </View>
            <View style = {{alignItems: 'flex-start', marginHorizontal: 20, justifyContent: 'center', marginTop: 15}}>
              <Text style = {{fontSize: 14, color: 'rgb(150,150,150)', fontWeight: '600'}}>
                Question 2 of 5:
              </Text>
              <Text style = {{fontSize: 20, color: 'rgb(50,50,50)', fontWeight: '500', marginTop: 15}}>
                What did you think about the dragons on level 15?
              </Text>
              <View style = {{flexDirection: 'row', marginTop: 15, marginRight: 25}}>
                <CheckBox checked = {false} style = {{marginRight: 20, borderColor: 'rgb(105,105,105)'}}></CheckBox>
                <Text style = {{fontSize: 16, color: 'rgb(105,105,105)', fontWeight: '500', marginRight: 35}}>I thought the dragons were scary and annoying but I wouldn't change anything because they made the game more complicated</Text>
              </View>
              <View style = {{flexDirection: 'row', marginTop: 15, marginRight: 25}}>
                <CheckBox checked = {false} style = {{marginRight: 20,borderColor: 'rgb(105,105,105)'}}></CheckBox>
                <Text style = {{fontSize: 16, color: 'rgb(105,105,105)', fontWeight: '500', marginRight: 35}}>I thought the dragons were easy and should be more difficult</Text>
              </View>
              <View style = {{flexDirection: 'row', marginTop: 15, marginRight: 25}}>
                <CheckBox checked = {false} style = {{marginRight: 20, borderColor: 'rgb(105,105,105)'}}></CheckBox>
                <Text style = {{fontSize: 16, color: 'rgb(105,105,105)', fontWeight: '500', marginRight: 35}}>I think the dragons should be removed from the game because they made the game overly complicated</Text>
              </View>
              <View style = {{flexDirection: 'row', marginTop: 15, marginRight: 25}}>
                <CheckBox checked = {false} style = {{marginRight: 20, borderColor: 'rgb(105,105,105)'}}></CheckBox>
                <Text style = {{fontSize: 16, color: 'rgb(105,105,105)', fontWeight: '500', marginRight: 35}}>I think there should be more dragons added to the game to increase the difficulty</Text>
              </View>
            </View>
            <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 40,}}>
 
                <Button style = {{ padding: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft:25}} onPress={() => this.props.navigation.navigate('PlayerMCQuestion')}>
                    <Icon style = {{height:25, width:25, marginRight: 5}} name = 'ios-arrow-back' type='ionicon' color='white' />
                    <Text style = {{color: 'white',fontWeight: '600', fontSize: 18}}>  Prev</Text>
                </Button>
                <View style = {{width: SCREEN_WIDTH-200}}></View>
                <Button style = {{ padding: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight:25}} onPress={() => this.props.navigation.navigate('PlayerMCQuestion3')}>
                    <Text style = {{color: 'white',fontWeight: '600', fontSize: 18}}>Next  </Text>
                    <Icon style = {{height:25, width:25, marginRight: 10}} name = 'ios-arrow-forward' type='ionicon' color='white' />
                </Button>
            </View>
        </View> 
        
       
       
    );
    }
  }

  

  