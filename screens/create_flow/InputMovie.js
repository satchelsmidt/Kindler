import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  Button,
  AsyncStorage,
  Image,
  StyleSheet
} from 'react-native';
import { Container, Content } from 'native-base';
import GenrePicker from '../../components/GenreSelection';
import 'react-navigation';
const axios = require('axios')

export default class FoodSelection extends Component {

  state = {
    genre: ''
  }

  _storeData = async(data)=>{
    try{
        await AsyncStorage.setItem('movieData', JSON.stringify(data))
        alert("saved")
    } catch (error) {
        console.log(error)
    }
}

  SearchMovies = () => {

    // console.log("LOG SOMETHING FOR GODS SAKE: ", this.props.navigation)
    // this.props.navigation.navigate('Event')


    axios.get('https://obscure-springs-29928.herokuapp.com/movies/get_movies/' + this.state.genre)
      .then(response => {
        this.props.navigation.navigate('Event')
        console.log('response: ', response)
        this._storeData(response)
      })
  }

  handleInput = (value, name) => {
    // console.log('value:', value)
    this.setState({
      // [name]: value.slice(1, -1)
      [name]: value
    })
    console.log('genre after set: ', this.state.genre)
  }


  render() {
    return (
      <Container>
      {/* <View>
        <ScrollView>

          <View style={styles.container}>
          <View style={styles.navBar}>
            <View style={styles.leftNav}>
            <Image source={require('../../assets/images/campfire.jpg')} style={{width:98, height:76}} />
          </View>
          </View> */}

            {/* <Text>THIS IS THE MOVIE SELECTION SCREEN</Text> */}

            <Content>
            <GenrePicker genre=
            {this.state.genre} handleInput=
            {this.handleInput} />
            </Content>
            
            <Button
              title="Next"
              onPress={this.SearchMovies}
            />
          {/* </View>
        </ScrollView>
      </View> */}
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