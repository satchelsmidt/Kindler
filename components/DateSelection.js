import React, { Component } from 'react';
import { Container, Header, Content, DatePicker, Text, Form, Item } from 'native-base';
import { View, StyleSheet } from 'react-native';

export default class DatePickerComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { chosenDate: new Date() };
    this.setDate = this.setDate.bind(this);
  }


  setDate(newDate) {
    let dateString = newDate.toString().substr(4, 12)

    this.setState({ chosenDate: dateString });
    console.log(this.state.chosenDate)
    this.props.handleInput(dateString, 'date')
  }

  render() {
    return (
      <Form >
        <View style={styles.picker}>
          <DatePicker
            defaultDate={new Date()}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select date"
            textStyle={{ color: "white" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={this.setDate}
            disabled={false}
          />
        </View>
        <Text style={{ fontSize: 24, color: 'white' }}>
          Selected Date: {this.state.chosenDate.toString().substr(3, 13)}
        </Text>

      </Form>
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    alignItems: 'center'
  }
})