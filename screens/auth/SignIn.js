import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Alert, Image, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as Google from 'expo-google-app-auth'
import Constants from 'expo-constants'
import { Container, Header } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import axios from 'axios';
import LoginScreen from './signin_screen';
/*=====  Preloading images to prevent flicker when loading ======*/
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
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
      isReady: false
    }
  }

  static navigationOptions = {
    header: null
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('../../assets/images/login_campfire.jpg'),
    ]);


    await Promise.all([...imageAssets]);
  }

  _clearData = async (data) => {
    try {
      await AsyncStorage.multiRemove(data)
      alert('removed that shit')
      console.log('this is the data we apparently removed: ', data)
    } catch (error) {
      console.log(error)
    }
  }

  // _storeData = async (data) =>{
  //   try{
  //     await AsyncStorage.setItem(data)
  //   }catch(error){
  //     console.log("you tried to save this data, but you have failed")
  //   }
  // }

  // _getData = async (data)=>{
  //   try{
  //     let result = await AsyncStorage.getItem("result")
  //     let data = JSON.stringify(result)
  //     console.log(data)
  //   } catch (error) {
  //     console.log("something went wrong... ",  error)
  //   }
  // }

  _handleGoogleLogin = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: '220715676294-6sqt060756ji445a4ru0q10gkteamqbv.apps.googleusercontent.com',
        iosClientId: '220715676294-o3v7hl5mj6l0rd4ubjvbfia9h02jb6hb.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
      // console.log('This is the result returned from google when logging in:', result)
      if (result.type === 'success') {
        // console.log(result.user.id)
        Alert.alert(
          'Logged in!',
          `Hi ${result.user.name}!`,
        );
        // this._storeData('result', JSON.stringify(result))
        const user_auth = result.user.id
        const user_name = result.user.name

        // console.log(user_auth)

        // TODO: Store the googleId in localstorage using AsyncStorage
        // TODO: Make an API call that creates this user if they have not been created already

        /*=============================================
        =    User signup/login into mongodb          =
        =============================================*/
        // using the returned authID, check if the user exsists within the mongoDB
        axios.get(`https://obscure-springs-29928.herokuapp.com/date/find_user/${user_auth}`)
          .then(results => {
            // console.log(results.data)
            //if the user exsists, the result will contain all of the users date data
            //send over the userID to the date create section so we can store user dates
            if (results.data.length === 1) {
              //pass the data to the navigation (HomeScreen) 
              //nav to App?
              //all screens should be able to access the data throught 'props.navigation.(getParams?)'
              //results.data[0].dates
              this.props.navigation.navigate({
                routeName: 'App',
                action: NavigationActions.navigate({
                  routeName: 'Main',
                  action: NavigationActions.navigate({
                    routeName: 'Home',
                    params: { userData: results.data }
                  })
                })
              })
            }
            else {
              //create new user, pass in auth providied by google 
              axios({
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Cache-Control': 'no-cache'
                },
                url: 'https://obscure-springs-29928.herokuapp.com/date/create_user',
                data: {
                  name: user_name,
                  auth: user_auth
                }
              })
                .then(result => {
                  // console.log(result.data)
                  //nav to App?
                  //results.data[0].dates
                  this.props.navigation.navigate({
                    routeName: 'App',
                    action: NavigationActions.navigate({
                      routeName: 'Main',
                      action: NavigationActions.navigate({
                        routeName: 'Home',
                        params: { userData: results.data }
                      })
                    })
                  })
                })
                .catch(err => console.error(err))
            }
          })
          .catch(err => console.error(err))


        /*=====  End of User signup/login into mongodb  ======*/


        // console.log('This is the same thing (google result) but JSON stringified: ', JSON.stringify(result.user))
        // this.props.navigation.navigate('App')
        return result.accessToken;
      } else {
        Alert.alert(
          'Cancelled!',
          'Login was cancelled!',
        );
        return { cancelled: true };
      }
    } catch (e) {
      console.log("ERROR: ", e)
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
      return { error: true };
    }
  }

  render() {

    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (<LoginScreen loginHandler={this._handleGoogleLogin} />)


    // return (

    //   <Container>
    //     <Header>
    //       <Text style={styles.headerText}>Welcome to Kindler</Text>
    //     </Header>
    //     <Col style={{ backgroundColor: '#635DB7', height: 300 }}>
    //       <View>
    //         <Image
    //           style={styles.container, { width: 250, height: 250 }}
    //           source={require('../../assets/images/fire.jpg')}
    //         />
    //       </View>
    //     </Col>
    //     <View style={styles.container}>
    //       <Button
    //         title="Login with Google"
    //         onPress={this._handleGoogleLogin}
    //       />
    //     </View>
    //   </Container>
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  headerText: {
    fontSize: 40
  }

});

