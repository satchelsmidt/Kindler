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
      data: [],
      userID: ''
    }
  }
  static navigationOptions = {
    header: null
  }

  //load default fonts for native base
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('../../node_modules/native-base/Fonts/Roboto.ttf'),
      Flower: require('../../assets/fonts/IndieFlower-Regular.ttf'),
      Roboto_medium: require('../../node_modules/native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
      // 'KaushanScript-Regular': require('../../assets/fonts/KaushanScript-Regular.otf'),
    });

    //route to grab userID from login page
    const userData = this.props.navigation.getParam('userData', 'nothing')
    //assuming the data from the login screen wont get passed a 2nd time if we refresh this section 
    if (this.state.userID === '') {
      // console.log(userData)
      this.setState({ userID: userData[0]._id })
    }


    axios.get(`https://obscure-springs-29928.herokuapp.com/date/all_dates/${this.state.userID}`)
      .then(result => {

        this.setState({ data: result.data[0].dates })
      }
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
      //this.state.data
      <AppContainer screenProps={{ data: this.state.data }} />
    )
  }
}

