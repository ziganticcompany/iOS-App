//PlayerTabNavigator
import React from "react";
import { Platform, Icon, Text } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import TabBarIcon from "../../components/TabBarIcon";
import PlayerGamesList from "./PlayerGamesList";
import PlayerSurveyList from "./PlayerSurveyList";
//import PlayerSurveyEdit from "./PlayerSurveyEdit";
import SettingsScreen from "../SettingsScreen";
import RedeemScreen from "./PlayerRedeem";

import PlayerProfile from "./PlayerProfile";


import PlayerSurveyComplete from "./PlayerSurveyComplete";

import PlayerGiftCardList from "./PlayerGiftCardList";
import PlayerGiftCardsDetails from "./PlayerGiftCardsDetails";
import PlayerGiftCardConfirm from "./PlayerGiftCardConfirm";
import PlayerGiftCardSent from "./PlayerGiftCardSent";

import PlayerSurveyScreen from "./PlayerSurveyScreen";
import OrderHistoryRedeeming from "./OrderHistoryRedeeming";
import { fromLeft,fromRight } from 'react-navigation-transitions';
import Colors from '../../constants/Colors';
const PlayerGameStack = createStackNavigator(
  {
    PlayerGamesList: { screen: PlayerGamesList },
    PlayerSurveyList: { screen: PlayerSurveyList },
    SettingsScreen: { screen: SettingsScreen },
    
    //PlayerSurveyEdit: { screen: PlayerSurveyEdit },
    PlayerProfile: { screen: PlayerProfile },
    //PlayerSurveyWarning: { screen: PlayerSurveyWarning },
 
    //PlayerSurveyComplete: { screen: PlayerSurveyComplete },
    //PlayerSurveySubmit: { screen: PlayerSurveySubmit },
 
    PlayerSurveyScreen: { screen: PlayerSurveyScreen },
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: true,
      swipeEnabled: false,
      gesturesEnabled: false
    },
    initialRouteName: "PlayerGamesList",
    transitionConfig: () => fromRight(),

  }
);
PlayerGameStack.navigationOptions = {
  tabBarLabel: <Text style={{fontWeight:"bold"}}>Games</Text>,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-home" : "ios-home"}
    />
  ),
    swipeEnabled: false,
    gesturesEnabled: false,
};
const ZPointsStack = createStackNavigator(
  {
    RedeemScreen: { screen: RedeemScreen },
    PlayerGiftCardList: { screen: PlayerGiftCardList },
    PlayerGiftCardsDetails: { screen: PlayerGiftCardsDetails },
    OrderHistoryRedeeming: { screen: OrderHistoryRedeeming },
    PlayerGiftCardConfirm: {screen: PlayerGiftCardConfirm},
    PlayerGiftCardSent: {screen: PlayerGiftCardSent}
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: true,
      swipeEnabled: false,
      gesturesEnabled: false
    },
    transitionConfig: () => fromRight(),
  }
  
);
ZPointsStack.navigationOptions = {
  tabBarLabel: <Text style={{fontWeight:"bold"}}>ZPoints</Text>,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-cash" : "md-link"}
    />
  )
};
const SettingsStack = createSwitchNavigator({
  Settings: { screen: SettingsScreen }
});
SettingsStack.navigationOptions = {
  tabBarLabel: <Text style={{fontWeight:"bold"}}>Settings</Text>,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  ),
 
};
export default createMaterialBottomTabNavigator(
  {
    PlayerGameStack: { screen: PlayerGameStack },
    ZPointsStack: { screen: ZPointsStack },
    SettingsStack: { screen: SettingsStack }
  },
  {
    initialRouteName: "PlayerGameStack",
    transitionConfig: () => zoomIn(1000),
    activeTintColor: Colors.purpleColor,
    inactiveTintColor: "#fff",
    barStyle: { backgroundColor: "white" },
    labelStyle: { fontSize: 30,fontWeight:"bold" },
    navigationOptions: {
      swipeEnabled: false,
      gesturesEnabled: false
    }

  },
);
