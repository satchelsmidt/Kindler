import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/auth/AuthLoading'
import SignInScreen from '../screens/auth/SignIn'
import SignOut from './SignOut';

const AppStack = createStackNavigator({Main: MainTabNavigator})
const AuthStack = createStackNavigator({SignIn: SignInScreen})

export default createAppContainer(
  createSwitchNavigator(
    {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: AppStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
  )
);
