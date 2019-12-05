import React, { Component } from 'react';
import { Container, Header, Content, DatePicker, Text } from 'native-base';

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
      <Container>
        <Header />
        <Content>
          <DatePicker
            defaultDate={new Date()}
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
          />
          <Text>
            Date: {this.state.chosenDate.toString().substr(4, 12)}
          </Text>
        </Content>
      </Container>
    );
  }
}