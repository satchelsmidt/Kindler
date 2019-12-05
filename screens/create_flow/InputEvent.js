import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  Button,
  AsyncStorage
} from 'react-native';
import moment from 'moment';
import 'react-navigation';
import axios from 'axios';
import EventCategorySelection from '../../components/EventCategorySelection';
import SportsSelection from '../../components/SportsSelection';
import MusicSelection from '../../components/MusicSelection';
import ArtsAndTheaterSelection from '../../components/Arts&TheaterSelection';

export default class EventSelection extends React.Component {
  state = {
    date: '',
    classification: '',
    genre: ''
  }

  getDate = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      console.log('Date we are retrieving:', value)

      const dateData = moment(value).format('YYYY-MM-DD')
      console.log("this is DATE DATA: ", dateData)
      this.setState({date: dateData})

      console.log("State of Date:", this.state.date)
    } catch (error) {
      console.log(error)
    }
  }

  _storeData = async (data) => {
    try {
      await AsyncStorage.setItem('eventData', JSON.stringify(data))
      console.log("the event data we saved", JSON.stringify(data))
      alert("saved")
    } catch (error) {
      console.log(error)
    }
  }

  _storeEventClassification = async (data) => {
    try {
      await AsyncStorage.setItem('selectedEventType', JSON.stringify(data))
      console.log("THE DATA WE SAVED: ", JSON.stringify(data))
      alert("saved")
    } catch (error) {
      console.log(error)
    }
  }

  SearchEvents = () => {

    axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      url: 'https://obscure-springs-29928.herokuapp.com/events/find_events',
      data: {
        date: this.state.date,
        classification: this.state.classification,
        genre: this.state.genre
      }
    })
      .then(response => {
        console.log(this.state.classification)
        console.log(response)
        this.setState({date: ''})
        this.props.navigation.navigate('Final')
        this._storeData(response)
      })
  }

  // componentWillMount() {
  //   this.setState({
  //     date: moment(this.getDate('dateData')).format('YYYY-MM-DD')
  //   }, ()=>console.log("DATE AFTER BEING 'SET': ", this.state.date))
  // }

  componentWillMount() {
      this.getDate('dateData')
  }

  handleInput = (value, name) => {
    console.log("value:", value)
    this.setState({
      [name]: value
    }, () => this._storeEventClassification(this.state.classification))
  }

  renderOne = () => {
    if (this.state.classification === "music") {
      return <MusicSelection musicselection={this.state.musicselection} handleInput={this.handleInput} />
    } else if (this.state.classification === "sports") {
      return <SportsSelection sportselection={this.state.sportselection} handleInput={this.handleInput} />
    } else if (this.state.classification === "arts&theater") {
      return <ArtsAndTheaterSelection artselection={this.state.artselection} handleInput={this.handleInput} />
    }
    else { return }
  }

  render() {
    if (this.state.date === 'null') {
      return false
    }
    return (
      <View>

        <ScrollView>
          <View>
            <Text>THIS IS THE EVENT SELECTION SCREEN</Text>
            <EventCategorySelection classification={this.state.classification} handleInput={this.handleInput} />
            <View>{this.renderOne()}</View>

            <Button
              title="Next"
              onPress={this.SearchEvents}
            />
          </View>
        </ScrollView>
      </View >
    );
  }
}