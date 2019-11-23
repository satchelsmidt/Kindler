import React, { Component } from "react";
import { Container, Header, Content, Picker, Form } from "native-base";
import cuisines from '../backend/data/cuisines.json'

export default class PickerExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "key1"
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Picker
              note
              mode="dropdown"
              style={{ width: 120 }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
            {cuisines.map(e=>{
                console.log('data!!!', e)
                console.log("more data!!", e.cuisine)
                console.log("EVEN more data!!", e.cuisine.cuisine_name)

                return <Picker.Item label={e.cuisine.cuisine_name} value={e.cuisine.cuisine_id} />
                })}
            </Picker>
          </Form>
        </Content>
      </Container>
    );
  }
}