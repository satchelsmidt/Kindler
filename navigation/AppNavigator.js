import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/auth/AuthLoading'
import SignInScreen from '../screens/auth/SignIn'
import LoginScreen from '../screens/auth/Login'

//Create separate stacks for various app flows: appstack (main three-tab view of app upon login), authstack (authentication/pre-login screens), createstack (series of pages that guides user through date creation)
const AppStack = createStackNavigator({ Main: MainTabNavigator })
const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  }
})

export default createAppContainer(

  createAnimatedSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      App: AppStack,
    },
    {
      headerMode: 'none',
      initialRouteName: 'Auth',
      navigationOptions: {
        header: null,
        headerVisible: false,
        headershown: false,
        // The previous screen will slide to the bottom while the next screen will fade in
        transition: (
          <Transition.Together>
            <Transition.Out
              type="slide-bottom"
              durationMs={400}
              interpolation="easeIn"
            />
            <Transition.In type="fade" durationMs={500} />
          </Transition.Together>
        ),
      }
    }
  )
);
