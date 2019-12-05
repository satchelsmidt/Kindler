import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  Button,
  AsyncStorage,
  Image,
  StyleSheet,
  ImageBackground
} from 'react-native';
import { Container, Content } from 'native-base';
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
      // alert("saved")
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
      <Container>
        <ImageBackground
          style={{ width: '100%', height: '100%' }}
          source={require('../../assets/images/theater_1.jpg')}
        >
          <Text>THIS IS THE MOVIE SELECTION SCREEN</Text>

          <Content>
            <GenrePicker genre=
              {this.state.genre} handleInput=
              {this.handleInput} />
          </Content>

          <Button
            title="Next"
            onPress={this.SearchMovies}
          />

        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navBar: {
    height: 55,
    backgroundColor: 'red',
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  leftNav: {
    flexDirection: 'row',
    padding: 20
  }
})