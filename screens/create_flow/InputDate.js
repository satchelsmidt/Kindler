import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  Button,
  AsyncStorage,
  StyleSheet,
  ImageBackground
} from 'react-native';
import DatePicker from '../../components/DateSelection';
import 'react-navigation';
import { Container, Content, Header, Body, Title } from 'native-base';

export default class DateSelection extends Component {

  state = {
    date: ''
  }

  _storeData = async (data) => {
    try {
      await AsyncStorage.setItem("dateData", data)
      // console.log('saving: ', data)
      // alert("saved")
    } catch (error) {
      console.log(error)
    }
  }

  submitDate = () => {
    this.props.navigation.navigate('Food')
    this._storeData(this.state.date)
  }

  handleInput = (value, name) => {
    console.log('VALUE:', value)
    this.setState({
      [name]: value
    }, () => console.log('date:', this.state.date))
  }

  render() {
    return (

      <Container>
        <ImageBackground
          style={{ width: '100%', height: '100%' }}
          source={require('../../assets/images/stars_1.jpg')}
        ><Text>Please Select a Date</Text>
          <Content>
            <DatePicker handleInput={this.handleInput} />
          </Content>
          <Button
            title="Next"
            onPress={this.submitDate}
          />
        </ImageBackground>
      </Container>
    );
  }
}

