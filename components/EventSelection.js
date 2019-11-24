import React, { Component } from "react";
import { Container, Header, Content, Picker, Form } from "native-base";
import sportsIDs from '../backend/data/sportsIDs.json';
import musicGenreIDs from '../backend/data/musicGenreIDs.json';
import artsAndTheaterIDs from '../backend/data/artsAndTheaterIDs.json';


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
            {sportsIDs.map(e=>{
                console.log('data!!!', e)
                console.log("more data!!", e.name)

                return <Picker.Item label={e.name} value={e.id} />
                })}

            {musicGenreIDs.map(e=>{
                console.log('data!!!', e)
                console.log("more data!!", e.name)

                return <Picker.Item label={e.name} value={e.id} />
                })}

            {artsAndTheaterIDs.map(e=>{
                console.log('data!!!', e)
                console.log("more data!!", e.name)

                return <Picker.Item label={e.name} value={e.id} />
                })}
            </Picker>
          </Form>
        </Content>
      </Container>
    );
  }
}