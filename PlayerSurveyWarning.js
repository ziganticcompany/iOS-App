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
import { Checkbox } from 'react-native-paper';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class PlayerProfile extends React.Component {
  render() {
    return (   
        
        <View style={{flex:1}}>       
            <Header
                outerContainerStyles={{ height:90 }}
                backgroundColor='rgb(100,45,110)'
                innerContainerStyles = {{alignItems: 'center'}}
                leftComponent ={
                <Button transparent style = {{ justifyContent: 'center', alignItems: 'center', width:25, marginTop: 40}} onPress={() => this.props.navigation.navigate('PlayerGamesList')}>
                    <Icon style = {{height:25, width:25}} name = 'ios-arrow-back' type='ionicon' color='white' />
                </Button>
                } 
                
            />
            <View style = {{
               width: SCREEN_WIDTH,
               height: 6,
               backgroundColor: 'rgba(107,194,130,0.4)',
               marginTop: -1
               }}>

            </View>  
            
            <View style = {{alignItems: 'flex-start', marginHorizontal: 20, justifyContent: 'center', marginTop: 15}}>
              <Text style = {{fontSize: 20, color: 'rgb(50,50,50)', fontWeight: '500', marginTop: 15}}>
                You are about to begin the survey for 'Temple Run'
              </Text>
              <Text style = {{fontSize: 15, color: 'rgb(125,125,125)', fontWeight: '400', marginTop: 10 }}>
                To ensure that we are collecting the highest quality of responses and feedback, we ask that you answer the following questions honestly. If we suspect that you a) have NOT completed all the instructions and tested the specified features or b) are NOT answering the questions to the best of your abilities, we may be forced to terminate your account and confiscate any acquired ZPoints. 
              </Text>
              <Text style = {{fontSize: 17, color: 'rgb(50,50,50)', fontWeight: '600', marginTop: 10 }}>
                By continuing, you are agreeing to answer every question truthfully and to the best of your ability.
              </Text>
              <Button style = {{ marginTop: 30, padding: 10, justifyContent: 'center', alignItems: 'center'}} onPress={() => this.props.navigation.navigate('PlayerMCQuestion')}>
                <Text style = {{color: 'white',fontWeight: '600', fontSize: 18}}>Begin Survey</Text>
              </Button>
          </View> 
        </View>
       
       
    );
    }
  }

  