import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  // Button,
  AsyncStorage,
  Image,
  StyleSheet,
  MaskedViewIOS,
  ImageBackground
} from 'react-native';
import { Container, Content, Button, Body } from 'native-base';
import moment from 'moment';
import 'react-navigation';
// import MaskedViewIOS from '@react-native-community/masked-view';
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

  static navigationOptions = {
    headerStyle: {
      // backgroundColor: 'rgba(128,128,128, 0.2)',
      // headerTintColor: 'white'
    },
    title: 'Select some event options!',
    headerTransparent: true,
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },

  }

  getDate = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      console.log('Date we are retrieving:', value)

      const dateData = moment(value).format('YYYY-MM-DD')
      console.log("this is DATE DATA: ", dateData)
      this.setState({ date: dateData })

      console.log("State of Date:", this.state.date)
    } catch (error) {
      console.log(error)
    }
  }

  _storeData = async (data) => {
    try {
      await AsyncStorage.setItem('eventData', JSON.stringify(data))
      // console.log("the event data we saved", JSON.stringify(data))
      // alert("saved")
    } catch (error) {
      console.log(error)
    }
  }

  _storeEventClassification = async (data) => {
    try {
      await AsyncStorage.setItem('selectedEventType', JSON.stringify(data))
      console.log("THE DATA WE SAVED: ", JSON.stringify(data))
      // alert("saved")
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
        date: moment(this.state.date).format('YYYY-MM-DD'),
        classification: this.state.classification,
        genre: this.state.genre
      }
    })
      .then(response => {
        console.log(this.state.classification)
        console.log(response)
        this.setState({ date: '' })
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
      <Container>
        <ImageBackground
          style={{ width: '100%', height: '100%' }}
          source={require('../../assets/images/event.jpg')}
        >
          <Body style={styles.dateSel}>
            <Content>
              <EventCategorySelection classification=
                {this.state.classification} handleInput=
                {this.handleInput} />

              <View>{this.renderOne()}</View>
            </Content>
          </Body>
          <Body style={{ height: '3%' }}>
            {/* <Text></Text> */}
          </Body>
          <View style={styles.button}>
            <Button
              transparent
              light
              onPress={this.SearchEvents}
            >
              <Text style={styles.buttonTxt}>Next</Text>
            </Button>
          </View>
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
    opacity: 0.65
    // fontFamily: 'IndieFlower-Regular',
  },
  dateSel: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '35%',
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

