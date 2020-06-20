import React, { Component } from 'react';
import {
  Platform, StyleSheet, View, AppRegistry, Text, Image,
  ImageBackground, TextInput, TouchableOpacity, Dimensions, ScrollView,
} from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import Colors from "../../constants/Colors";
// import { withNativeAd } from 'expo/build/facebook-ads';
import { CheckBox } from 'native-base'
import { Header, Avatar, Icon, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import {
  Card,
  CardItem,
  Body, Left, Right, Button
} from 'native-base'
import { FirebaseData } from '../../providers/firebase';
import Layout from "../../constants/Layout";

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
  getUserDetails() {
    var userDetails = FirebaseData.getTesterUserProfile();
    // this.setState({ name: userDetails.name });
 
  }
  getTesterUserProfile() {

    try {
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
        });
      });
    }
    catch (e) {
      //alert(e.message);
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
    nd = new Date(utc + (3600000 * offset));
    this.setState({ birthDay: nd.toISOString().split('T')[0] })
    this.setState({ birthDayError: null })
    this.hideDateTimePicker();
  };
  onSave = () => {
    const { firstName, lastName, email, birthDay, school, city } = this.state;
    FirebaseData.updateTesterUserProfile(firstName, lastName, email, birthDay, school, city);
    this.props.navigation.navigate('PlayerGamesList');
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          outerContainerStyles={{ height: 90 }}
          backgroundColor={Colors.purpleColor}
          innerContainerStyles={{ alignItems: 'center' }}
          leftComponent={
            <Button transparent style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 40 }} onPress={() => this.props.navigation.navigate('PlayerGamesList')}>
              <Icon style={{ height: 25, width: 25 }} name='ios-arrow-back' type='ionicon' color='white' />
              <Text style={{ fontSize: 18, color: 'white', fontWeight: '600' }}>  Cancel</Text>

            </Button>
          }
          rightComponent={
            <Button transparent style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40 }} onPress={this.onSave}>
              <Text style={{ fontSize: 18, color: 'white', fontWeight: '600' }}>Save</Text>
            </Button>
          }

        />

        <ScrollView
          showsVerticalScrollIndicator={false}
        >

          <View style={{
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
            <Button transparent style={{ marginTop: 2, padding: 3, alignSelf: 'center' }}>
              <Text style={{ fontSize: 13, fontWeight: '600', color: 'rgb(40,120,255)' }}>EDIT PICTURE</Text>
            </Button>

          </View>

          <View style={{ alignItems: 'flex-start', justifyContent: 'center', marginHorizontal: 30, marginTop: 15 }}>
            <Text style={{ fontWeight: '700', fontSize: 20 }}>GENERAL</Text>
          </View>

          <View style={myStyles.myContainer}>

            <View style={myStyles.myInputStyles}>
              <FormLabel labelStyle={myStyles.labelStyle}>FIRST NAME</FormLabel>
              <FormInput
                inputStyle={myStyles.inputTextStyle}
                containerStyle={myStyles.containerFormStyle}
                value={this.state.firstName}
                placeholderTextColor={'black'}
                onChangeText={(firstName) => { this.setState({ firstName }) }}
              />
            </View>
            <View style={myStyles.myInputStyles}>
              <FormLabel labelStyle={myStyles.labelStyle}>LAST NAME</FormLabel>
              <FormInput
                inputStyle={myStyles.inputTextStyle}
                containerStyle={myStyles.containerFormStyle}
                value={this.state.lastName}
                placeholderTextColor={'black'}
                onChangeText={(lastName) => { this.setState({ lastName }) }}

              />
            </View>
            <View style={myStyles.myInputStyles}>
              <FormLabel labelStyle={myStyles.labelStyle}>EMAIL</FormLabel>
              <FormInput
                inputStyle={myStyles.inputTextStyle}
                containerStyle={myStyles.containerFormStyle}
                value={this.state.email}
                placeholderTextColor={'black'}
                onChangeText={(email) => { this.setState({ email }) }}

              />
            </View>
            <View style={myStyles.myInputStyles}>
              <FormLabel labelStyle={myStyles.labelStyle}>BIRTHDAY</FormLabel>
              <Text onPress={this.showDateTimePicker}
                style={myStyles.dateText}
                placeholderTextColor={'gray'}
              >
                {this.state.birthDay}
              </Text>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
              />
            </View>
            <View style={myStyles.myInputStyles}>
              <FormLabel labelStyle={myStyles.labelStyle}>SCHOOL</FormLabel>
              <FormInput
                inputStyle={myStyles.inputTextStyle}
                containerStyle={myStyles.containerFormStyle}
                value={this.state.school}
                placeholderTextColor={'black'}
                onChangeText={(school) => { this.setState({ school }) }}
              />
            </View>
            <View style={myStyles.myInputStyles}>
              <FormLabel labelStyle={myStyles.labelStyle}>CITY</FormLabel>
              <FormInput
                inputStyle={myStyles.inputTextStyle}
                containerStyle={myStyles.containerFormStyle}
                value={this.state.city}
                placeholderTextColor={'black'}
                onChangeText={(city) => { this.setState({ city }) }}

              />
            </View>
          </View>

          <View style={{ alignItems: 'flex-start', justifyContent: 'center', marginHorizontal: 30, marginTop: 45 }}>
            <Text style={{ fontWeight: '700', fontSize: 20 }}>CHANGE PASSWORD</Text>
          </View>

          <View style={{
            marginTop:20
          }}>

            <View style={myStyles.myInputStyles}>
              <FormLabel labelStyle={myStyles.labelStyle}>CURRENT PASSWORD</FormLabel>
              <FormInput
                inputStyle={myStyles.inputTextStyle}
                containerStyle={myStyles.containerFormStyle}
                placeholder={'Enter current password'}
                placeholderTextColor={'gray'}
                secureTextEntry={true}
              />
            </View>

            <View style={myStyles.myInputStyles}>
              <FormLabel labelStyle={myStyles.labelStyle}>NEW PASSWORD</FormLabel>
              <FormInput
                inputStyle={myStyles.inputTextStyle}
                containerStyle={myStyles.containerFormStyle}
                placeholder={'Enter new password'}
                placeholderTextColor={'gray'}
                secureTextEntry={true}
              />
            </View>

            <View style={[myStyles.myInputStyles, { marginBottom: 20 }]}>
              <FormLabel labelStyle={myStyles.labelStyle}>CONFIRM NEW PASSWORD</FormLabel>
              <FormInput
                inputStyle={myStyles.inputTextStyle}
                containerStyle={myStyles.containerFormStyle}
                placeholder={'Confirm new password'}
                placeholderTextColor={'gray'}
                secureTextEntry={true}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}


const myStyles = StyleSheet.create({
  myContainer: {

    flex: 1,
    width: null,
    height: null,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  myInputStyles: {
    marginTop: 5,
    width: SCREEN_WIDTH - 55,
  },
  labelStyle: {
    fontSize: 13,
    color: 'rgb(150,150,150)',
    fontWeight: '600'
  },
  inputTextStyle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black'
  },
  containerFormStyle: {
    marginHorizontal: 10,
    marginTop: 5,
  },
  dateText: {
    marginHorizontal: 10,
    marginTop: 5,
    fontSize: 16,
    fontWeight: '600',
    color: 'black'
  }
})







