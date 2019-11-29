import React, { Component } from "react";
import { View, Text, Image } from 'react-native';
// import { Image } from 'native-base';
import Carousel from 'react-native-snap-carousel';

export default class ImageCarousel extends Component {

    _renderItem({ item, index }) {
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
                ref={(c) => { this._carousel = c; }}
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