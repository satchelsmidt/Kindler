import React, { Component } from "react";
import { Container, Header, Content, Picker, Form } from "native-base";

export default class EventCategorySelection extends Component {

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
                            placeholder="Choose What You Want Do!"
                            selectedValue={this.props.classification}
                            onValueChange={(value)=> this.props.handleInput(value, 'classification')}
                        >
                            <Picker.Item label='Sports' value='sports' />
                            <Picker.Item label='Music' value='music' />
                            <Picker.Item label='Arts and Theater' value='arts&amp;theater' />
                        </Picker>
                    </Form>
                </Content>
            </Container>
        );
    }
}