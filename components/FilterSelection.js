import React, { Component } from "react";
import { Container, Header, Content, Picker, Form, Item } from "native-base";

export default class SortBy extends Component {
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
                            textStyle={{ color: "white" }}
                            placeHolderTextStyle={{ color: "white" }}
                            placeholder="Sort by..."
                            selectedValue={this.props.sortby}
                            onValueChange={(value) => this.props.handleInput(value, 'sortby')}
                        >
                            <Picker.Item label='Location' value='Location' />
                            <Picker.Item label='Price' value='Price' />
                            <Picker.Item label='Rating' value='Rating' />
                        </Picker>
                    </Item>
                </Form>
            // </Content>

        );
    }
}