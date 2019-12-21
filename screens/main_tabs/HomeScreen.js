import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
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

  //function to store user data (Mongo)
  async setToken(user) {
    try {
      await AsyncStorage.setItem("userDataMongo", user)
      // console.log("storage success")
    } catch (error) {
      // console.log("something went wrong: ", error)
    }
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

    //route to grab all date information a user has 
    const userData = this.props.navigation.getParam('userData', 'nothing')
    // console.log('USER DATA: ', userData)

    let otherUserData = await AsyncStorage.getItem("userData");
    // console.log('OTHER USER DATA: ', otherUserData)

    //assuming the data from the login screen wont get passed a 2nd time if we refresh this section 
    if (this.state.userID === '') {
      //persistent user 
      if (userData[0] === undefined) {
        //do the axios call 
        axios.get(`https://obscure-springs-29928.herokuapp.com/date/find_user/${otherUserData}`)
          .then(dbUser => {
            //axios get all user date information 


            this.setToken(dbUser.data[0]._id)

            //   async setToken(user) {
            //     try {
            //         await AsyncStorage.setItem("userData", user)
            //         console.log("storage success")
            //     } catch (error) {
            //         console.log("something went wrong: ", error)
            //     }
            // }

            axios.get(`https://obscure-springs-29928.herokuapp.com/date/all_dates/${dbUser.data[0]._id}`)
              .then(dbAllDates => {
                //then set the state of the data to the return
                this.setState({ data: dbAllDates.data[0].dates })
              })
              .catch(err => console.error(err))

            this.setState({ isReady: true });


          })
          .catch(err => console.error(err))
      }

      //fresh login 
      else {
        this.setState({ userID: userData[0]._id })

        axios.get(`https://obscure-springs-29928.herokuapp.com/date/all_dates/${this.state.userID}`)

          .then(result => {

            this.setState({ data: result.data[0].dates })
            // console.log(result)
          }
          )
          .catch(err => console.error(err))

        this.setState({ isReady: true });
      }
    }

  }
  // console.log('GOOGLE ID: ', this.props.navigation.state.params.userData.user.id)

  //for refreshing
  refreshUserData = async () => {

    let otherUserData = await AsyncStorage.getItem("userData");
    console.log(otherUserData)

    axios.get(`https://obscure-springs-29928.herokuapp.com/date/find_user/${otherUserData}`)
      .then(dbUser => {

        // console.log(dbUser.data)
        axios.get(`https://obscure-springs-29928.herokuapp.com/date/all_dates/${dbUser.data[0]._id}`)
          .then(dbAllDates => {
            //then set the state of the data to the return
            this.setState({ data: dbAllDates.data[0].dates })
          })
          .catch(err => console.error(err))

      })
      .catch(err => console.error(err))
    // console.log('Hello')
  }
  render() {

    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      //passing user data containing all date information into the navigation schema for the date/activites screens
      //this.state.data
      <AppContainer screenProps={{ data: this.state.data, refresh: this.refreshUserData }} />
    )
  }
}

