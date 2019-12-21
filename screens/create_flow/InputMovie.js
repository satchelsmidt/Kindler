import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  // Button,
  AsyncStorage,
  Image,
  StyleSheet,
  ImageBackground
} from 'react-native';
import { Container, Content, Button, Body } from 'native-base';
import GenrePicker from '../../components/GenreSelection';
import 'react-navigation';
const axios = require('axios')

export default class FoodSelection extends Component {

  state = {
    genre: ''
  }
  static navigationOptions = {
    headerStyle: {
      // backgroundColor: 'rgba(128,128,128, 0.2)',
      // headerTintColor: 'white'
    },
    title: 'Select a movie option!',
    headerTransparent: true,
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },

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
    }, 
    // () => 
    // console.log('genre after set: ', this.state.genre)
    )
  }

  render() {
    return (
      <Container>
        <ImageBackground
          style={{ width: '100%', height: '100%' }}
          source={require('../../assets/images/theater.jpg')}
        >
          <Body style={styles.dateSel}>
            <Content>
              <GenrePicker genre=
                {this.state.genre} handleInput=
                {this.handleInput} />
            </Content>
          </Body>
          <Body style={{ height: '3%' }}>
            {/* <Text></Text> */}
          </Body>
          <View style={styles.button}>
            <Button
              transparent
              light
              onPress={this.SearchMovies}
            >
              <Text style={styles.buttonTxt}>Next</Text>
            </Button>
          </View>
        </ImageBackground>
      </Container >
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
  },
  button: {
    backgroundColor: '#FD6051',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 5,
    opacity: 0.8
    // fontFamily: 'IndieFlower-Regular',
  },
  dateSel: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '45%',
    backgroundColor: 'white',
    paddingBottom: 1,
    height: 10,
    opacity: 0.8,
    borderRadius: 40
  },
  buttonTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  }
})