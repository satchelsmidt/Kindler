import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';


import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/main_tabs/HomeScreen';
import InputDateScreen from '../screens/create_flow/InputDate'
import InputFoodParams from '../screens/create_flow/InputFood'
import InputMovieParams from '../screens/create_flow/InputMovie'
import InputEventParams from '../screens/create_flow/InputEvent'
import SelectFinalDate from '../screens/create_flow/SelectFinal'

import ProfileScreen from '../screens/main_tabs/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config,
);

HomeStack.navigationOptions = {
  header: null,
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-home'
          : 'md-home'
      }
    />
  ),
};

HomeStack.path = '';

const CreateStack = createStackNavigator(
  {
    Date: InputDateScreen,
    Food: InputFoodParams,
    Movie: InputMovieParams,
    Event: InputEventParams,
    Final: SelectFinalDate
  },
  config
);

CreateStack.navigationOptions = {
  header: null,
  tabBarLabel: 'Create',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'} />
  ),
};

CreateStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  config
);

ProfileStack.navigationOptions = {
  header: null,
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  },
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
  ),
};

ProfileStack.path = '';

const tabNavigator = createMaterialBottomTabNavigator({
  HomeStack,
  CreateStack,
  ProfileStack,
}, {
  headerMode: 'none',
  navigationOptions: {
    header: null,
    headerVisible: false,
    headershown: false,
  },
  activeColor: '#13ff8a',
  inactiveColor: '#3e2465',
  barStyle: { backgroundColor: 'black' },
});

tabNavigator.path = '';

export default tabNavigator;
