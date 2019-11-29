import React, { Component } from "react";
import { Container, Header, Content, Picker, Form } from "native-base";
import artsAndTheaterIDs from '../backend/data/artsAndTheaterIDs.json';


export default class ArtsAndTheaterSelection extends Component {
  
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
              placeholder="Select an Artistic or Theatrical Event!"
              selectedValue={this.props.artselection}
              onValueChange={(value) => this.props.handleInput(value, 'artselection')}
            >
            {artsAndTheaterIDs.map(e=>{
                console.log(' art data!!!', e)
                console.log("more art data!!", e.name)

                return <Picker.Item label={e.name} value={e.id} />
                })}
            </Picker>
          </Form>
        </Content>
      </Container>
    );
  }
}