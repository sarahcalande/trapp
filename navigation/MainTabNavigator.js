import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AGTalent from '../screens/AGTalent';
import SettingsScreen from '../screens/SettingsScreen';
import MaskedSinger from '../screens/MaskedSinger';
import WorldsBestPage from '../screens/worldsbestpage';
import TheFourPage from '../screens/thefourpage'

const TheWorldsBest = createStackNavigator({
  TheWorldsBest: WorldsBestPage
})

const MaskedSingerLink= createStackNavigator({
  MaskedSingerLink: MaskedSinger,
})

const TheFour = createStackNavigator({
  TheFour: TheFourPage
})

const Home = createStackNavigator({
  Home: HomeScreen,
});

Home.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const AGT = createStackNavigator({
  AGT: AGTalent,
});

AGT.navigationOptions = {
  tabBarLabel: 'AGT',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const TheVoice = createStackNavigator({
  TheVoice: SettingsScreen,
});

TheVoice.navigationOptions = {
  tabBarLabel: 'The Voice',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createDrawerNavigator({
  Home,
  AGT,
  TheVoice,
  MaskedSingerLink,
  TheWorldsBest,
  TheFour
},
{drawerBackgroundColor: "rgb(255,20,147)",});
