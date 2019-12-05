import React, { Component } from "react";
import { Container, Header, Content, Picker, Form, Item } from "native-base";
import musicGenreIDs from '../backend/data/musicGenreIDs.json';


export default class MusicSelection extends Component {
  
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
              placeholder="Select a Musical Event!"
              selectedValue={this.props.musicselection}
              onValueChange={(value) => this.props.handleInput(value, 'genre')}
            >

            {musicGenreIDs.map((e, k) => {
                // console.log(' music data!!!', e)
                // console.log("more music data!!", e.name)

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