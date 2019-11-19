// import React, {Component} from 'react';
// import{
//     AsyncStorage,
//     Button,
//     View
// } from 'react-native';

// class SignInScreen extends Component{
//     static navigationOptions ={
//         title: 'Please Sign In'
//     };
//     render(){
//         return(
//             <View>
//                 <Button title="Sign in!" onPress={this._signInAsync} />
//             </View>
//         );
//     }

//     _signInAsync = async()=>{
//         await AsyncStorage.setItem('userToken', 'abc');
//         console.log("this:")
//             console.log(this)
//             console.log("this.props:")
//             console.log(this.props)
//         this.props.navigation.navigate('App');
//     };
// }

// export default SignInScreen


import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import * as Google from 'expo-google-app-auth'
import Constants from 'expo-constants'

export default class GoogleSignIn extends Component {
  _handleGoogleLogin = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: '220715676294-6sqt060756ji445a4ru0q10gkteamqbv.apps.googleusercontent.com',
        iosClientId: '220715676294-o3v7hl5mj6l0rd4ubjvbfia9h02jb6hb.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
      console.log(result)
      if (result.type === 'success') {
        Alert.alert(
          'Logged in!',
          `Hi ${result.user.name}!`,
        );
        console.log(JSON.stringify(result.user))
        this.props.navigation.navigate('App')
        return result.accessToken;
        } else {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          return { cancelled: true };
        }
      } catch (e) {
        console.log("REESULT IF FAIL: ", result)
          console.log("ERROR: ", e)
        Alert.alert(
          'Oops!',
          'Login failed!',
        );
        return { error: true };
      }
    }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Login with Google"
          onPress={this._handleGoogleLogin}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  }
});

