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
export default class PlayerSurveySubmit extends React.Component {

  
  render() {
    return (   
        
        <View style={{flex:1}}>       
            <Header
                outerContainerStyles={{ height:90 }}
                backgroundColor='rgb(100,45,110)'
                innerContainerStyles = {{alignItems: 'center'}}
                
            />
            <View style = {{
               width: SCREEN_WIDTH,
               height: 6,
               backgroundColor: 'green',
               marginTop: -1
               }}>

            </View>  
            
            <View style = {{alignItems: 'center', marginHorizontal: 20, justifyContent: 'center', marginTop: 15}}>
              <Text style = {{fontSize: 20, textAlign: 'center',  color: 'rgb(50,50,50)', fontWeight: '500', marginTop: 15}}>
                You have reached the end of this survey
              </Text>
              <Text style = {{fontSize: 15, textAlign: 'center', color: 'rgb(125,125,125)', fontWeight: '400', marginTop: 15 }}>
                Any unanswered or poorly answered questions may result in a lowered number of ZPoints rewarded.
              </Text>
            </View>

            
            <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 40,}}>
 
                <Button style = {{ padding: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft:25}} onPress={() => this.props.navigation.navigate('PlayerMCQuestion5')}>
                    <Icon style = {{height:25, width:25, marginRight: 5}} name = 'ios-arrow-back' type='ionicon' color='white' />
                    <Text style = {{color: 'white',fontWeight: '600', fontSize: 18}}>  Prev</Text>
                </Button>
                <View style = {{width: SCREEN_WIDTH-260}}></View>
                <Button style = {{ backgroundColor: 'green', padding: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight:25}} onPress={() => this.props.navigation.navigate('PlayerSurveyComplete')}>
                    <Text style = {{color: 'white',fontWeight: '600', fontSize: 18}}>Submit Survey</Text>
                </Button>
            </View>
       
        </View>
       
       
    );
    }
  }

  