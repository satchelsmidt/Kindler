import React, { Component } from "react";
import { Container, Header, Content, Picker, Form, Item } from "native-base";
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
      
        // <Header />
        // <Content>
          <Form>
            <Item picker>
            <Picker
              // note
              mode="dropdown"
              style={{ width: 300 }}
              placeholder="Select a Genre!"
              selectedValue={this.props.genre}
              onValueChange={(value)=>this.props.handleInput(value, 'genre')}
            >
            {genres.map((e, k) => {
                return <Picker.Item 
                label={e.name} 
                value={e.name} 
                key={k} />
                })}
            </Picker>
              </Item>
          </Form>
        // </Content>
      
    );
  }
}