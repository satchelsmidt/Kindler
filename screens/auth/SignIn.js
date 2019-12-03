import React, { Component } from 'react';
import { Image, AsyncStorage, ActivityIndicator, View } from 'react-native';
// import axios from 'axios';
// import LoginScreen from './Login';
// import HomeScreen from '../main_tabs/HomeScreen';

/*=====  Preloading images to prevent flicker when loading ======*/
import { Asset } from 'expo-asset';
// import { AppLoading } from 'expo';
// expo install expo-asset

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class GoogleSignIn extends Component {
  constructor() {
    super()
    this.state = {
      isReady: false,
      isAuthenticated: false,
      userData: null
    }
  }

  static navigationOptions = {
    header: null
  }
  async componentDidMount() {
    try {
      let result = await AsyncStorage.getItem("userData")
      let data = JSON.parse(result)
      console.log('LOCAL STORAGE DATA: ', data)
      if (result) {
        this.setState({ isReady: true, isAuthenticated: true, userData: data })
      } else {
        this.setState({ isReady: true, isAuthenticated: false })
      }
      // console.log(data)
    } catch (error) {
      console.log("something went wrong... ", error)
    }

  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('../../assets/images/login_campfire.jpg'),
    ]);

    await Promise.all([...imageAssets]);
  }

  goToLoginScreen = () => {
    console.log('Rendering home')
    this.props.navigation.navigate('Login')
  }

  goToHomeScreen = () => {
    console.log('STATE: ', this.state.userData)
    this.props.navigation.navigate('Home', { userData: this.state.userData })
  }

  render() {
    const { isAuthenticated, isReady } = this.state;
    return (
      <View>
        {!isReady && !isAuthenticated ?
          <ActivityIndicator size="large" color="#0000ff" />
          : isAuthenticated && isReady ? this.goToHomeScreen() : this.goToLoginScreen()}
      </View>
    )
  }
}
