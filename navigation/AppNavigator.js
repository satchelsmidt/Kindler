import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/auth/AuthLoading'
import SignInScreen from '../screens/auth/SignIn'

//Create separate stacks for various app flows: appstack (main three-tab view of app upon login), authstack (authentication/pre-login screens), createstack (series of pages that guides user through date creation)
const AppStack = createStackNavigator({ Main: MainTabNavigator })
const AuthStack = createStackNavigator({ SignIn: SignInScreen })
// const CreateStack = createStackNavigator({Date: SelectDateScreen
// })

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      App: AppStack,
      // Create: CreateStack
    },
    {
      headerMode: 'none',
      initialRouteName: 'AuthLoading',
      navigationOptions: {
        header: null,
        headerVisible: false,
        headershown: false,
      }
    }
  )
);
