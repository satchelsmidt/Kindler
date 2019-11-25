import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  Button
} from 'react-native';
import GenrePicker from '../../components/GenreSelection';
import 'react-navigation';
const axios = require('axios')

export default class FoodSelection extends Component {

  state = {
    genre: ''
  }

  SearchMovies = () => {

    console.log("LOG SOMETHING FOR GODS SAKE: ", this.props.navigation)
    // this.props.navigation.navigate('Event')


    axios.get('https://obscure-springs-29928.herokuapp.com/movies/get_movies/' + this.state.genre)
      .then(response => {
        this.props.navigation.navigate('Event')
        console.log('response: ', response)
      })
  }

  handleInput = (value, name) => {
    console.log('value:', value)
    this.setState({
      // [name]: value.slice(1, -1)
      [name]: value
    })
    console.log('genre after set: ', this.state.genre)
  }


  render() {
    return (
      <View>

        <ScrollView>

          <View>
            <Text>THIS IS THE MOVIE SELECTION SCREEN</Text>
            <GenrePicker genre={this.state.genre} handleInput={this.handleInput} />
            <Button
              title="Next"
              onPress={this.SearchMovies}
            />
          </View>

        </ScrollView>
      </View>
    );
  }
}