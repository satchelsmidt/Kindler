import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  Button,
  AsyncStorage
} from 'react-native';
import GenrePicker from '../../components/GenreSelection';
import 'react-navigation';
const axios = require('axios')

export default class FoodSelection extends Component {

  state = {
    genre: ''
  }

  _storeData = async (data) => {
    try {
      await AsyncStorage.setItem('movieData', JSON.stringify(data))
      alert("saved")
    } catch (error) {
      console.log(error)
    }
  }

  SearchMovies = () => {

    axios.get('https://obscure-springs-29928.herokuapp.com/movies/get_movies/' + this.state.genre)
      .then(response => {
        this.props.navigation.navigate('Event')
        this._storeData(response)
      })
  }

  handleInput = (value, name) => {
    this.setState({
      [name]: value
    }, () => console.log('genre after set: ', this.state.genre))
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