import React, { Component } from 'react';
import { Image, AsyncStorage, ActivityIndicator, View } from 'react-native';

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
      // console.log('LOCAL STORAGE DATA: ', data)
      if (result) {
        this.setState({ isReady: true, isAuthenticated: true, userData: data })
      } else {
        this.setState({ isReady: true, isAuthenticated: false })
      }
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
    this.props.navigation.navigate('Login')
  }

  goToHomeScreen = () => {
    this.props.navigation.navigate('Home', { userData: this.state.userData })
  }

  render() {
    const { isAuthenticated, isReady } = this.state;
    return (
      <View>
        {!isReady && !isAuthenticated ?
          <ActivityIndicator size="large" color="#0000ff" style={{ justifyContent: 'center', alignItems: 'center' }} />
          : isAuthenticated && isReady ? this.goToHomeScreen() : this.goToLoginScreen()}
      </View>
    )
  }
}
