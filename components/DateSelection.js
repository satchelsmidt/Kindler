import React, { Component } from 'react';
import { Container, Header, Content, DatePicker, Text, Form, Item } from 'native-base';

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
    //TODO: why is this returning error 'undefined is not an object'
    // console.log(dateString)
    this.props.handleInput(dateString, 'date')
  }
  render() {
    return (
      // <Container style={{width:100}, {height:200}}>
      // <Container style={{flex:1}}>
     
        // <Header />
        
        <Form>
          <DatePicker
            defaultDate={new Date()}
            // minimumDate={new Date(2018, 1, 1)}
            // maximumDate={new Date(2018, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select date"
            textStyle={{ color: "blue" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={this.setDate}
            disabled={false}
          // date={this.state.chosenDate.toString().substr(4, 12)}
          // handleInput={(date) => this.props.handleInput(date, 'date')}
          />
          <Text>
            Date: {this.state.chosenDate.toString().substr(4, 12)}
          </Text>
        
      </Form>
    );
  }
}