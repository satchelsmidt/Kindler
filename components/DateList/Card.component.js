import React, { Component } from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import ImageCarousel from '../DateList/Carousel.component';

export default class CardShowcaseExample extends Component {

    generateCarousel(props) {
        if (props.entries !== undefined) {
            return <ImageCarousel entries={props.entries} />
        }
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
                        {/* <Image source={this.props.pic} style={{ height: 200, width: 200, flex: 1 }} /> */}
                        {/* <ImageCarousel entries={this.props.entries} /> */}
                        {this.generateCarousel(this.props)}
                        <Text>
                            {this.props.info}
                        </Text>
                    </Body>
                </CardItem>
                {/* <CardItem>
                <Left>
                    <Button transparent textStyle={{ color: '#87838B' }}>
                        <Icon name="logo-github" />
                        <Text>1,926 stars</Text>
                    </Button>
                </Left>
            </CardItem> */}
            </Card>
        );
    }
}