import React from 'react';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import PlayerAuthLoading from '../screens/Player/Auth/PlayerAuthLoading';
import PlayerAuthDecision from '../screens/Player/Auth/PlayerAuthDecision';
import PlayerLogin from '../screens/Player/Auth/PlayerLogin';
import PlayerSignup from '../screens/Player/Auth/PlayerSignup';

import PlayerTabNavigator from '../screens/Player/PlayerTabNavigator';
//import PlayerSideMenu from '../screens/Player/PlayerSideMenu';

import DeveloperAuthLoading from '../screens/Developer/Auth/DeveloperAuthLoading';
import DeveloperAuthDecision from '../screens/Developer/Auth/DeveloperAuthDecision';
import DeveloperLogin from '../screens/Developer/Auth/DeveloperLogin';
import DeveloperSignup from '../screens/Developer/Auth/DeveloperSignup';
import DeveloperTabNavigator from '../screens/Developer/DeveloperTabNavigator';
//import SideMenu from './SideMenu';
import PlayerOrDeveloperDecision from '../screens/PlayerOrDeveloperDecision';
//import SettingsScreen from '../screens/SettingsScreen';
//import RedeemScreen from '../screens/Player/Redeem';
import OnBoardingScreen from '../screens/OnBoardingScreen';

const DeveloperAuthStack = createSwitchNavigator({
  DeveloperAuthLoading: { screen: DeveloperAuthLoading },
  DeveloperAuthDecision: { screen: DeveloperAuthDecision },
  DeveloperLogin: { screen: DeveloperLogin },
  DeveloperSignup: { screen: DeveloperSignup },
  DeveloperTabNavigator: { screen: DeveloperTabNavigator },
});
const PlayerAuthStack = createStackNavigator({
  //                                          PlayerAuthLoading: { screen: PlayerAuthLoading},
  //                                          PlayerAuthDecision: PlayerAuthDecision, 
  PlayerAuthDecision: { screen: PlayerAuthDecision },
  PlayerLogin: { screen: PlayerLogin },
  PlayerSignup: { screen: PlayerSignup },
  PlayerTabNavigator: { screen: PlayerTabNavigator },
  
  //                                          PlayerReedem: RedeemScreen,
},
{
  headerMode: 'none',
  lazy:false,
  navigationOptions: {
      headerVisible: false,
  },
  initialRouteName: 'PlayerAuthDecision',
});

//export default createAppContainer(createSwitchNavigator(
export default createAppContainer(createSwitchNavigator(
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
    initialRouteName: 'PlayerAuthLoading',
    //contentComponent: ({ navigation }) => (
    //<SideMenu navigation={navigation} />)    
  }
));
