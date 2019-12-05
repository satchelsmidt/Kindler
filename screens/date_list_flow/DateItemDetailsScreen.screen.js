import React, { Component } from "react";
import { Container, Content } from 'native-base';
import Card from "../../components/DateList/Card.component";

export default class DateItemDetailsScreen extends Component {
    static navigationOptions = {
        title: 'Activity Details',
        headerStyle: {
            backgroundColor: '#c4a494',
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
                rating={data.rating}
                info={data.location}
                time={data.times}
                phone={data.phone}
                menu={data.menu_link}
            />
        }
        //if the activity is a movie, it should have a '.poster' property
        else if (data.poster !== undefined) {

            let poster = { uri: data.poster }
            let stockMovieImage = require("../../assets/images/popin'corn.jpg")
            console.log(data.rating)
            return <Card
                stock={stockMovieImage}
                title={data.name}
                pic={poster}
                date={data.date}
                info={data.overview}
                rating={data.rating}
                times={data.times}
                links={data.links}
                movieID={data._id}
                imgHeight={300}
                imgWidth={200}
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
                rating={data.rating}
                time={data.time}
                venue={data.venue}
                address={data.address}
                link={data.link}
                currency={data.price[0].currency}
                price={data.price[0].min + '-' + data.price[0].max}
                imgHeight={300}
                imgWidth={350}
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
