import React, { Component } from "react";
import { Container, Header, Content, Picker, Form } from "native-base";
import musicGenreIDs from '../backend/data/musicGenreIDs.json';


export default class MusicSelection extends Component {
  
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
              placeholder="Select a Musical Event!"
              selectedValue={this.props.musicselection}
              onValueChange={(value) => this.props.handleInput(value, 'musicselection')}
            >

            {musicGenreIDs.map(e=>{
                // console.log(' music data!!!', e)
                // console.log("more music data!!", e.name)

                return <Picker.Item label={e.name} value={e.id} />
                })}

            </Picker>
          </Form>
        </Content>
      </Container>
    );
  }
}