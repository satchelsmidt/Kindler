import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  AsyncStorage,
  StyleSheet,
  ImageBackground
} from 'react-native';
import DatePicker from '../../components/DateSelection';
import 'react-navigation';
import { Container, Content, Header, Body, Title, Button } from 'native-base';

export default class DateSelection extends Component {

  state = {
    date: ''
  }

  static navigationOptions = {
    header: null
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
          source={require('../../assets/images/starryHand.jpg')}
        >
          <Body style={styles.dateSel}>
            <Text style={{ fontWeight: 'bold', fontSize: 34, color: 'white' }}>Please Select a Date</Text>
            <Content >
              <DatePicker handleInput={this.handleInput} />
            </Content>
          </Body>
          <View style={styles.button}>
            <Button
              transparent
              light
              onPress={this.submitDate}
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
    marginTop: '35%'
  },
  buttonTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  }
})