import React, { Component } from 'react';
import { Image, Button, AsyncStorage } from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';

const cards = [
  {
    text: 'Card One',
    name: 'One',
    image: require('../../assets/images/robot-dev.png'),
  },
  {
    text: 'Card OTEO',
    name: 'TWO',
    image: require('../../assets/images/robot-prod.png'),
  },
  {
    text: 'Card THE',
    name: 'TRREE',
    image: require('../../assets/images/splash.png')
  }
];
export default class DeckSwiperExample extends Component {

  _retrieveData = async(key)=>{
    try{
      console.log('hey you got to the first step')
      const value = await AsyncStorage.getItem(key);
      console.log(value)
      // if(value !== null){
      //   console.log("IT WORKED: ", value)
      // }
    } catch (error){
      console.log(error)
    }
  }

  render() {
    return (
      <Container>
        <Header />
        <View>

          <Button
            title="Press Me to get data"
            onPress={()=>this._retrieveData('restaurantData')}
          />

          <DeckSwiper
            dataSource={cards}
            renderItem={item =>
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  <Left>
                    <Thumbnail source={item.image} />
                    <Body>
                      <Text>{item.text}</Text>
                      <Text note>NativeBase</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image style={{ height: 300, flex: 1 }} source={item.image} />
                </CardItem>
                <CardItem>
                  <Icon name="heart" style={{ color: '#ED4A6A' }} />
                  <Text>{item.name}</Text>
                </CardItem>
              </Card>
            }
          />
        </View>
      </Container>
    );
  }
}