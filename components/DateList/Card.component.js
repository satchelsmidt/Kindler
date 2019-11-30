import React, { Component } from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Left, Body } from 'native-base';
import ImageCarousel from '../DateList/Carousel.component';

//used to display the cumulative information for each activity 
export default class Cards extends Component {

    //generate a carousel component for the restaurant pictures 
    generateCarousel(props) {
        //if sent an array of images, generate the carousel 
        if (props.entries !== undefined) {
            return <ImageCarousel entries={props.entries} />
        }
        //if not, the item is either a movie or event, so just generate one image 
        else {
            return <Image source={props.pic} style={{ height: 200, width: 200, flex: 1 }} />
        }
    }

    render() {
        return (
            <Card style={{ flex: 0 }}>
                <CardItem>
                    <Left>
                        <Thumbnail source={this.props.stock} />
                        <Body>
                            <Text>{this.props.title}</Text>
                            <Text note>{this.props.date}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Body>
                        {this.generateCarousel(this.props)}
                        <Text>
                            {this.props.info}
                        </Text>
                    </Body>
                </CardItem>
            </Card>
        );
    }
}