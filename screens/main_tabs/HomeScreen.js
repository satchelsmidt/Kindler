import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import axios from 'axios';
import AppContainer from "../../components/DateList/DateListItems.component";
import { Platform, StyleSheet, Text } from 'react-native';
import 'react-navigation';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      data: []
    }
  }
  static navigationOptions = {
    header: null
  }

  //load default fonts for native base
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('../../node_modules/native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('../../node_modules/native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });

    //route to grab all date information a user has 
    //TODO: Needs be passed the user ID upon login 
    axios.get(`https://obscure-springs-29928.herokuapp.com/date/all_dates/5dd625cd294dd35110a02b74`)
      .then(result =>
        this.setState({ data: result.data[0].dates })
      )
      .catch(err => console.error(err))

    this.setState({ isReady: true });
  }

  render() {

    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      //passing user data containing all date information into the navigation schema for the date/activites screens
      <AppContainer screenProps={{ data: this.state.data }} />
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  // welcomeContainer: {
  //   alignItems: 'center',
  //   marginTop: 10,
  //   marginBottom: 20,
  // },
  // welcomeImage: {
  //   width: 100,
  //   height: 80,
  //   resizeMode: 'contain',
  //   marginTop: 3,
  //   marginLeft: -10,
  // },
  // getStartedContainer: {
  //   alignItems: 'center',
  //   marginHorizontal: 50,
  // },
  // homeScreenFilename: {
  //   marginVertical: 7,
  // },
  // codeHighlightText: {
  //   color: 'rgba(96,100,109, 0.8)',
  // },
  // codeHighlightContainer: {
  //   backgroundColor: 'rgba(0,0,0,0.05)',
  //   borderRadius: 3,
  //   paddingHorizontal: 4,
  // },
  // getStartedText: {
  //   fontSize: 17,
  //   color: 'rgba(96,100,109, 1)',
  //   lineHeight: 24,
  //   textAlign: 'center',
  // },
  // tabBarInfoContainer: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   ...Platform.select({
  //     ios: {
  //       shadowColor: 'black',
  //       shadowOffset: { width: 0, height: -3 },
  //       shadowOpacity: 0.1,
  //       shadowRadius: 3,
  //     },
  //     android: {
  //       elevation: 20,
  //     },
  //   }),
  //   alignItems: 'center',
  //   backgroundColor: '#fbfbfb',
  //   paddingVertical: 20,
  // },
  // tabBarInfoText: {
  //   fontSize: 17,
  //   color: 'rgba(96,100,109, 1)',
  //   textAlign: 'center',
  // },
  // navigationFilename: {
  //   marginTop: 5,
  // },
});
