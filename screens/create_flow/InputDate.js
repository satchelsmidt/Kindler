import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  Button,
  AsyncStorage
} from 'react-native';
import DatePicker from '../../components/DateSelection';
import 'react-navigation';

export default class DateSelection extends Component {

  state = {
    date: ''
  }

  _storeData = async (data) => {
    try {
      await AsyncStorage.setItem("dateData", data)
      console.log('saving: ', data)
      alert("saved")
    } catch (error) {
      console.log(error)
    }
  }

  submitDate =()=>{
    this.props.navigation.navigate('Food')
    this._storeData(this.state.date)
  }

  handleInput = (value, name) => {
    console.log('VALUE:', value)
    this.setState({
        [name]: value
    })
    console.log('date:', this.state.date)
}

  render() {
    return (
      <View>

        <ScrollView>

          <View style={{flex:1}}>
            <Text>THIS IS THE DATE SELECTION SCREEN</Text>
            <DatePicker handleInput={this.handleInput}/>
            <Button
              title="Next"
              // onPress={() => this.props.navigation.navigate('Food')}
              onPress={this.submitDate}
            />
          </View>

        </ScrollView>
      </View>
    );
  }
}