import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Alert, Image, AsyncStorage } from 'react-native';
import * as Google from 'expo-google-app-auth'
import Constants from 'expo-constants'
import { Container, Header } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class GoogleSignIn extends Component {
  static navigationOptions = {
    header: null
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
        Alert.alert(
          'Logged in!',
          `Hi ${result.user.name}!`,
        );
        // this._storeData('result', JSON.stringify(result))

        // TODO: Store the googleId in localstorage using AsyncStorage
        // TODO: Make an API call that creates this user if they have not been created already
        // console.log('This is the same thing (google result) but JSON stringified: ', JSON.stringify(result.user))
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

      <Container>
        <Header>
          <Text style={styles.headerText}>Welcome to Kindler</Text>
        </Header>

        {/* <Grid> */}
          <Col style={{ backgroundColor: '#635DB7', height: 300 }}>
            <View>
              <Image
                style={styles.container, { width: 250, height: 250 }}
                source={require('../../assets/images/fire.jpg')}
              />
            </View>
          </Col>
          {/* <Col style={{ backgroundColor: '#00CE9F', height: 200 }}></Col> */}
        {/* </Grid> */}

        <View style={styles.container}>
          <Button
            title="Login with Google"
            onPress={this._handleGoogleLogin}
          />
        </View>

      </Container>

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
  },
  headerText: {
    fontSize: 40
  }

});

