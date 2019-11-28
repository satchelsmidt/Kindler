import React, { Component } from "react";
import { Container, Content } from 'native-base';
import ListOfItems from "../../components/DateList/List.component";

export default class DatesScreen extends Component {
    static navigationOptions = {
        title: 'Saved Juicy Dates',
        headerStyle: {
            backgroundColor: '#f4871e',
        }
    };

    render() {

        let stockImage = require('../../assets/images/campfire.jpg')
        return (
            <Container>
                <Content>
                    {this.props.screenProps.data.map((item, index) => <ListOfItems
                        title={`Date Number ${index}`}
                        key={index}
                        description={`${Object.keys(item).slice(1, Object.keys(item).length - 1).join(', ')}`}
                        nav={() => { this.props.navigation.navigate('DateDetails', { activities: item }) }}
                        pic={stockImage}
                    />)}
                </Content>
            </Container>
        )
    }
}

