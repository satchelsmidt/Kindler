import React, { Component } from "react";
import { Container, Header, Content, Picker, Form } from "native-base";
import cuisines from '../backend/data/cuisines.json'

export default class PickerExample extends Component {

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Picker
              note
              mode="dropdown"
              style={{ width: 300 }}
              placeholder="Select a Cuisine!"
              selectedValue={this.props.cuisine}
              onValueChange={(value) => this.props.handleInput(value, 'cuisine')}
            >
            {cuisines.map(e =>{
                // console.log("data: ", e.cuisine.cuisine_name)
                return <Picker.Item label={e.cuisine.cuisine_name} value={e.cuisine.cuisine_name} />
                })}
            </Picker>
          </Form>
        </Content>
      </Container>
    );
  }
}