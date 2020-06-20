import React, { Component } from 'react';
import {
  Platform, StyleSheet, View, AppRegistry, Text, Image,
  ImageBackground, TextInput, TouchableOpacity, Dimensions, ScrollView
} from 'react-native';
// import { withNativeAd } from 'expo/build/facebook-ads';
import { CheckBox } from 'native-base'
import { Header, Avatar, Icon, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import {
  Card,
  CardItem,
  Body, Left, Right, Button
} from 'native-base'
import { Checkbox } from 'react-native-paper';
import Colors from "../../constants/Colors";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
import Layout from "../../constants/Layout";
export default class PlayerSurveyComplete extends React.Component {
  render() {
    return (

      <View style={{ flex: 1 }}>
        <Header
          outerContainerStyles={{ height: Layout.headerHeight }}
          backgroundColor={Colors.purpleColor}
          innerContainerStyles={{ alignItems: 'center' }}


        />
        <View style={{ alignItems: 'center', marginHorizontal: 20, justifyContent: 'center', marginTop: 15 }}>
          <Text style={{ fontSize: 20, textAlign: 'center', color: 'rgb(50,50,50)', fontWeight: '500', marginTop: 15 }}>
            You have finished surveying 'Temple Run'!
              </Text>
          <Text style={{ fontSize: 15, textAlign: 'center', color: 'rgb(125,125,125)', fontWeight: '400', marginTop: 15 }}>
            Please give us a few days to review your submission. You will receive a notification when ZPoints have been added to your account.
              </Text>
          <Button style={{ alignSelf: 'center', marginTop: 30, padding: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate('PlayerGamesList')}>
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 18 }}>Return to Home</Text>
          </Button>
        </View>
      </View>


    );
  }
}

