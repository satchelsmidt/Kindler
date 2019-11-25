import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/main_tabs/HomeScreen';
// import CreateScreen from '../screens/main_tabs/LinksScreen';
import SelectDateScreen from '../screens/create_flow/SelectDate'
import InputFoodParams from '../screens/create_flow/InputFood'
import InputMovieParams from '../screens/create_flow/InputMovie'
import InputEventParams from '../screens/create_flow/InputEvent'
import SelectFinalDate from '../screens/create_flow/SelectFinal'

import ProfileScreen from '../screens/main_tabs/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
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

// const CreateStack = createStackNavigator(
//   {
//     Create: CreateScreen,
//   },
//   config
// );

const CreateStack = createStackNavigator(
  {
    Date: SelectDateScreen,
    Food: InputFoodParams,
    Movie: InputMovieParams,
    Event: InputEventParams,
    Final: SelectFinalDate
  },
  config
);

CreateStack.navigationOptions = {
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
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
  ),
};

ProfileStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  CreateStack,
  ProfileStack,
});

tabNavigator.path = '';

export default tabNavigator;
