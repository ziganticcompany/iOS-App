import React from 'react';
import { Platform, Icon } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';

import TabBarIcon from '../../components/TabBarIcon';
import DeveloperGamesList from './DeveloperGamesList';
import DeveloperGameAdd from './DeveloperGameAdd';
import DeveloperGameEdit from './DeveloperGameEdit';
import DeveloperSurveyList from './DeveloperSurveyList';
import DeveloperSurveyAdd from './DeveloperSurveyAdd';
import DeveloperSurveyEdit from './DeveloperSurveyEdit';
import SettingsScreen from '../SettingsScreen';
//import DeveloperSideMenu from './DeveloperSideMenu';
//import DeveloperSideMenu from '../Player/PlayerSideMenu';

const DeveloperGameStack = createStackNavigator({
  DeveloperGamesList: DeveloperGamesList,
  DeveloperGameAdd: DeveloperGameAdd,
  DeveloperGameEdit: DeveloperGameEdit,
  DeveloperSurveyList: DeveloperSurveyList,
  DeveloperSurveyAdd: DeveloperSurveyAdd,
  DeveloperSurveyEdit: DeveloperSurveyEdit,
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 },
  {
    initialRouteName: "DeveloperGamesList"
  });

DeveloperGameStack.navigationOptions = {
  tabBarLabel: 'Games',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home'
        //          ? `ios-home${focused ? '' : '-outline'}`
        : 'md-information-circle'
      }
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,

});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

/*export default createBottomTabNavigator({
  DeveloperGameStack,
  SettingsStack,
});*/

// export default createAppContainer(createDrawerNavigator(
  // {
    // DeveloperGameStack: DeveloperGameStack,
    // SettingsStack: SettingsStack,
    // //SideMenu: SideMenu,
  // },
  // {
    // initialRouteName: 'DeveloperGameStack',
    // contentComponent: DeveloperSideMenu,
    // drawerWidth: 300
    // //contentComponent: ({ navigation }) => (
    // //<SideMenu navigation={navigation} />)    
  // }
// ));

export default createAppContainer(DeveloperGameStack);
