import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  Button
} from 'react-native';
import 'react-navigation';
import axios from 'axios';
import EventCategorySelection from '../../components/EventCategorySelection';
import SportsSelection from '../../components/SportsSelection';
import MusicSelection from '../../components/MusicSelection';
import ArtsAndTheaterSelection from '../../components/Arts&TheaterSelection';

// should this be a functional component or a class component? 
export default class EventSelection extends React.Component {
  state = {
    date: '',
    classification: '',
    genre: '',
  }

SearchEvents = () => {
  
  axios({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    },
    url: 'https://obscure-springs-29928.herokuapp.com/events/find_events',
    data: {
      date: "2019-12-14",
      classification: "music",
      genre: "Rock"
    }
  })
}
  
  handleInput = (value, name) => {
      console.log("value:", value)
      this.setState({
        [name]: value
      }, console.log("name: ", name))
      
      // console.log to make sure it works!
      // console.log('here is the selection: ', this.state.sportselection)
      console.log('here is the classification: ', this.state.classification)
      console.log('here is the music selection: ', this.state.musicselection)
      // console.log('here is the selection: ', this.state.artselection)
    }
    

render() {
    return(
        <View>

  <ScrollView>

    <View>
      <Text>THIS IS THE EVENT SELECTION SCREEN</Text>
      {/* the following is coming from the respectiv files in the components folder */}

      <EventCategorySelection classification={this.state.classification} handleInput={this.handleInput} />

          <SportsSelection sportselection={this.state.sportselection} handleInput={this.handleInput} />

          <MusicSelection musicselection={this.state.musicselection} handleInput={this.handleInput} />

          <ArtsAndTheaterSelection artselection={this.state.artselection} handleInput={this.handleInput} />
      
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

