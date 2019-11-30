import React, { Component } from "react";
import { Container, Content } from 'native-base';
import Card from "../../components/DateList/Card.component";

export default class DateItemDetailsScreen extends Component {
    static navigationOptions = {
        title: 'Activity Details',
        headerStyle: {
            backgroundColor: '#d56e0a',
        }
    };

    //function to determine how to format the card details based on which type of activity was clicked
    generateItemDetails(data) {
        //if the acivity is a restaurant, it should have a '.food_photos' property 
        if (data.food_photos !== undefined) {

            let thumbnail = { uri: data.thumbnail }
            let foodStockImage = require('../../assets/images/foods.jpg')

            return <Card
                stock={foodStockImage}
                title={data.name}
                pic={thumbnail}
                entries={data.food_photos}
            />
        }
        //if the activity is a movie, it should have a '.poster' property
        else if (data.poster !== undefined) {

            let poster = { uri: data.poster }
            let stockMovieImage = require("../../assets/images/popin'corn.jpg")

            return <Card
                stock={stockMovieImage}
                title={data.name}
                pic={poster}
                date={data.date}
                info={data.overview}
            />
        }
        //otherwise the activity is an event 
        else {

            let image = { uri: data.image }
            let eventStock = { uri: 'https://cdn5.vectorstock.com/i/1000x1000/14/79/silhouette-of-seattle-skyline-vector-16381479.jpg' }

            return <Card
                stock={eventStock}
                title={data.name}
                pic={image}
                date={data.date}
            />
        }
    }


    render() {

        //grab the data passed in from the previous screen
        let data = this.props.navigation.getParam('details', 'default value')

        return (
            <Container>
                <Content>
                    {this.generateItemDetails(data)}
                </Content>
            </Container>
        )
    }
}
