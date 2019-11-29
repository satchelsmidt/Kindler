import React, { Component } from 'react';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import axios from 'axios';
import AppContainer from "../../components/DateList/DateListItems.component";
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
    //5ddf4aa57d19091bf42f5fce => empty user  
    //5dd625cd294dd35110a02b74 => user with dates
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

