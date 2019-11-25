import React, { Component } from "react";
import { Container, Header, Content, Picker, Form } from "native-base";
import genres from '../backend/data/genres.json'

export default class PickerExample extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     selected: "key1"
  //   };
  // }
  // onValueChange(value: string) {
  //   this.setState({
  //     selected: value
  //   });
  // }
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
              placeholder="Select a Genre!"
              selectedValue={this.props.genre}
              onValueChange={(value)=>this.props.handleInput(value, 'genre')}
            >
            {genres.map(e=>{
                return <Picker.Item label={e.name} value={e.name} />
                })}
            </Picker>
          </Form>
        </Content>
      </Container>
    );
  }
}