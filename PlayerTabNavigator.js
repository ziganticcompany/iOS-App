import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import TabBarIcon from '../../components/TabBarIcon';
import PlayerGamesList from './PlayerGamesList';
import PlayerSurveyList from './PlayerSurveyList';
import PlayerSurveyEdit from './PlayerSurveyEdit';
import SettingsScreen from '../SettingsScreen';
import RedeemScreen from './PlayerRedeem';
import PlayerSideMenu from './PlayerSideMenu';
import PlayerProfile from './PlayerProfile';
import PlayerMCQuestion from './PlayerMCQuestion'
import PlayerSurveyWarning from './PlayerSurveyWarning'
import PlayerMCQuestion2 from './PlayerMCQuestion2'
import PlayerMCQuestion3 from './PlayerMCQuestion3'
import PlayerMCQuestion4 from './PlayerMCQuestion4'
import PlayerMCQuestion5 from './PlayerMCQuestion5'
import PlayerSurveyComplete from './PlayerSurveyComplete'
import PlayerSurveySubmit from './PlayerSurveySubmit'
import PlayerFRQQuestion from './PlayerFRQQuestion'
import PlayerGiftCardList from "./PlayerGiftCardList";
import PlayerGiftCardsDetails from "./PlayerGiftCardsDetails";

const PlayerGameStack =
  createSwitchNavigator({
    PlayerGamesList: { screen: PlayerGamesList },
    PlayerSurveyList: { screen: PlayerSurveyList },
    SettingsScreen: { screen: SettingsScreen },
    PlayerReedem: { screen: RedeemScreen },
    PlayerSurveyEdit: { screen: PlayerSurveyEdit },
    PlayerProfile: { screen: PlayerProfile },
    PlayerSurveyWarning: { screen: PlayerSurveyWarning },
    PlayerMCQuestion: { screen: PlayerMCQuestion },
    PlayerMCQuestion2: { screen: PlayerMCQuestion2 },
    PlayerMCQuestion3: { screen: PlayerMCQuestion3 },
    PlayerMCQuestion4: { screen: PlayerMCQuestion4 },
    PlayerMCQuestion5: { screen: PlayerMCQuestion5 },
    PlayerSurveyComplete: { screen: PlayerSurveyComplete },
    PlayerSurveySubmit: { screen: PlayerSurveySubmit },
    PlayerFRQQuestion: { screen: PlayerFRQQuestion }

  }, {
    initialRouteName: 'PlayerGamesList',
  });

  PlayerGameStack.navigationOptions = {
    tabBarLabel: <Text style={{ fontSize: 12, fontWeight: "bold", color: 'rgb(72,42,116)' }}>Games</Text>,
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-home'
            : 'md-information-circle'
        }
        />
    ),
};
const ZPointsStack =
  createSwitchNavigator({
    RedeemScreen: { screen: RedeemScreen },
    PlayerGiftCardList: { screen: PlayerGiftCardList },
    PlayerGiftCardsDetails: { screen: PlayerGiftCardsDetails },
  }, {
    initialRouteName: 'RedeemScreen',
  });

  ZPointsStack.navigationOptions = {
  tabBarLabel: <Text style={{ fontSize: 12, fontWeight: "bold", color: 'rgb(72,42,116)' }}>ZPoints</Text>,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-cash' : 'md-link'}
    />
    ),
};


const SettingsStack = createSwitchNavigator({
  Settings: { screen: SettingsScreen },
});

SettingsStack.navigationOptions = {
  tabBarLabel: <Text style={{ fontSize: 12, fontWeight: "bold", color: 'rgb(72,42,116)' }}>ZPoints</Text>,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
    ),

};
export default createMaterialBottomTabNavigator({
  PlayerGameStack: { screen: PlayerGameStack },
  ZPointsStack: { screen: ZPointsStack },
  SettingsStack: { screen: SettingsStack },
}, {
  initialRouteName: 'PlayerGameStack',
  barStyle: { backgroundColor: 'white' },
  lazy:false,
});

