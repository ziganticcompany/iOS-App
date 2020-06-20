import React from "react";
import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createDrawerNavigator,
} from "react-navigation";
import PlayerAuthLoading from "../screens/Player/Auth/PlayerAuthLoading";
import PlayerAuthDecision from "../screens/Player/Auth/PlayerAuthDecision";
import PlayerLogin from "../screens/Player/Auth/PlayerLogin";
import PlayerSignup from "../screens/Player/Auth/PlayerSignup";
import PlayerOnboarding from "../screens/Player/Auth/PlayerOnboarding";
import EULA from "../screens/Player/Auth/EULA.js";
import NDA from "../screens/Player/Auth/NDA.js";
import Terms from "../screens/Player/Auth/Terms.js";
import PrivacyPolicy from "../screens/Player/Auth/PrivacyPolicy.js"; 
import PlayerTabNavigator from "../screens/Player/PlayerTabNavigator";
//import PlayerSideMenu from '../screens/Player/PlayerSideMenu';

import DeveloperAuthLoading from "../screens/Developer/Auth/DeveloperAuthLoading";
import DeveloperAuthDecision from "../screens/Developer/Auth/DeveloperAuthDecision";
import DeveloperLogin from "../screens/Developer/Auth/DeveloperLogin";
import DeveloperSignup from "../screens/Developer/Auth/DeveloperSignup";
import DeveloperTabNavigator from "../screens/Developer/DeveloperTabNavigator";
1;

//import SideMenu from './SideMenu';
import PlayerOrDeveloperDecision from "../screens/PlayerOrDeveloperDecision";
//import SettingsScreen from '../screens/SettingsScreen';
//import RedeemScreen from '../screens/Player/Redeem';

import OnBoardingScreen from "../screens/OnBoardingScreen";

const DeveloperAuthStack = createSwitchNavigator({
  DeveloperAuthLoading: { screen: DeveloperAuthLoading },
  DeveloperAuthDecision: { screen: DeveloperAuthDecision },
  DeveloperLogin: { screen: DeveloperLogin },
  DeveloperSignup: { screen: DeveloperSignup },
  DeveloperTabNavigator: { screen: DeveloperTabNavigator },
});
const PlayerAuthStack = createStackNavigator(
  {
    //                                          PlayerAuthLoading: { screen: PlayerAuthLoading},
    //                                          PlayerAuthDecision: PlayerAuthDecision,
    PlayerAuthDecision: { screen: PlayerAuthDecision },
    PlayerLogin: { screen: PlayerLogin },
    PlayerSignup: { screen: PlayerSignup },
    EULA: {screen: EULA},
    NDA : {screen: NDA},
    PrivacyPolicy: {screen: PrivacyPolicy},
    Terms: {screen: Terms},
    PlayerTabNavigator: { screen: PlayerTabNavigator },
    PlayerOnboarding: { screen: PlayerOnboarding },
    //                                          PlayerReedem: RedeemScreen,
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: true,
      swipeEnabled: false,
      gesturesEnabled: false,
    },
  }
);
//export default createAppContainer(createSwitchNavigator(
export default createAppContainer(
  createStackNavigator(
    {
      PlayerOrDeveloperDecision: PlayerOrDeveloperDecision,
      PlayerAuthLoading: PlayerAuthLoading,
      OnBoardingScreen: OnBoardingScreen,
      DeveloperAuthStack: DeveloperAuthStack,
      PlayerAuthStack: PlayerAuthStack,
      //    SettingsScreen: SettingsScreen,
      //SideMenu: SideMenu,
    },
    {
      initialRouteName: "PlayerAuthLoading",
      headerMode: "none",
      navigationOptions: {
        headerVisible: true,
        swipeEnabled: false,
        gesturesEnabled: false,
      },
    }
  )
);
