import React, { Component } from "react";
import { Container, Header, Content, Picker, Form, Item } from "native-base";
import sportsIDs from '../backend/data/sportsIDs.json';


export default class SportsSelection extends Component {
  
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
              placeholder="Select a Sport Event!"
              selectedValue={this.props.sportselection}
              onValueChange={(value) => this.props.handleInput(value, 'genre')}
            >
            {sportsIDs.map((e, k) => {
                // console.log(' sports data!!!', e)
                // console.log("more sports data!!", e.name)

                return <Picker.Item 
                label={e.name} 
                value={e.name} 
                key={k}/>
                })}
            </Picker>
            </Item>
          </Form>
         // </Content>
    );
  }
}