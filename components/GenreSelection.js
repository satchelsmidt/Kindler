import React, { Component } from "react";
import { Container, Header, Content, Picker, Form } from "native-base";
import genres from '../backend/data/genres.json'

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
            {genres.map(e=>{
                console.log('data!!!', e)

                return <Picker.Item label={e.name} value={e.id} />
                })}
            </Picker>
          </Form>
        </Content>
      </Container>
    );
  }
}