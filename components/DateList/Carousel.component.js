import React, { Component } from "react";
import { View, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

//used for displaying the restaurant images 
export default class ImageCarousel extends Component {

    //render images to the carousel 
    _renderItem({ item, index }) {
        //have to set the uri and image link equal to a variable in order for the image to show up 
        let image = { uri: `${item}` }
        return (
            < View >
                <Image
                    source={image}
                    style={{ height: 200, width: 200, flex: 1 }} />
            </View >
        );
    }

    render() {
        return (
            <Carousel
                ref={(c) => { this._carousel = c }}
                data={this.props.entries}
                renderItem={this._renderItem}
                layout={'stack'}
                layoutCardOffset={10}
                sliderWidth={300}
                itemWidth={200}
                itemHeight={200}
            />
        );
    }
}