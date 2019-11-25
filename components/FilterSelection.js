import React, { Component } from "react";
import { Container, Header, Content, Picker, Form } from "native-base";

export default class SortBy extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         selected: "key1"
    //     };
    // }
    // onValueChange(value: string) {
    //     this.setState({
    //         selected: value
    //     });
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
                            placeholder="Sort by..."
                            selectedValue={this.props.sortby}
                            onValueChange={(value)=> this.props.handleInput(value, 'sortby')}
                        >
                            <Picker.Item label='Location' value='Location' />
                            <Picker.Item label='Price' value='Price' />
                            <Picker.Item label='Rating' value='Rating' />
                        </Picker>
                    </Form>
                </Content>
            </Container>
        );
    }
}