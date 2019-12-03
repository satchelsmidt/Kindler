import React, { Component } from 'react';
import { Image, Button, AsyncStorage, ScrollView, Linking } from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
let foodStockImage = require('../../assets/images/foods.jpg')
let movieStockImage = require("../../assets/images/popin'corn.jpg")

export default class DeckSwiperExample extends Component {

  state = {
    dateData: '',
    restaurantData: '',
    movieData: '',
    eventData: ''
  }

  _retrieveData = async (keys) => {
    try {
      const value = await AsyncStorage.multiGet(keys);
      console.log('value: ', value)
      const dateData = value[0]
      const restaurantData = (JSON.parse(value[1][1]).data)
      const movieData = (JSON.parse(value[2][1]).data)
      const eventData = (JSON.parse(value[3][1]).data)

      console.log('result for event Data: ', eventData)

      this.setState({ dateData: dateData })
      this.setState({ restaurantData: restaurantData })
      this.setState({ movieData: movieData })
      this.setState({ eventData: eventData })

      console.log('this is EVNT STATE: ', this.state.eventData)

    } catch (error) {
      console.log(error)
    }
  }

  // TODO: Actually send the data here to the server
  finalizeDate = () => {
    this.setState({ dateData: '' })
    this.setState({ restaurantData: '' })
    this.setState({ movieData: '' })
    this.setState({ eventData: '' })
    console.log('data sent to server')
  }

  saveCard = (data) => {
    this.setState(
      { selected}
    )
  }

  componentWillMount() {
    this._retrieveData(['dateData', 'restaurantData', 'movieData', 'eventData'])
  }

  render() {

    if (this.state.restaurantData.length === 0) {
      return false
    } else if (this.state.movieData.length === 0) {
      return false
    } else if (this.state.eventData.length === 0) {
      return false
    }
    return (

      <Container>
        <ScrollView>

          <Container>
            <View>
              <DeckSwiper
                dataSource={this.state.restaurantData}
                onSwipeRight={this.saveCard}
                renderItem={item =>
                  <Card>
                    <CardItem>
                      <Left>
                        <Thumbnail source={foodStockImage} />
                        <Body>
                          <Text>{item.name}</Text>
                          <Text note style={{paddingBottom: 20}}>Phone: {item.phone}</Text>
                          <Text>Location: {item.location}</Text>
                          <Text style={{paddingBottom: 20}}>Rating: {item.rating}</Text>
                          <Text style={{ color: 'blue' }} onPress={() => Linking.openURL(item.menu_link)}>Menu</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem cardBody>
                      {/* <Image style={{ height: 300, flex: 1 }} source={{ uri: item.thumbnail }} /> */}
                      <Image style={{height: 200, flex: 1}}source={{ uri: item.thumbnail }} />
                    </CardItem>
                  </Card>
                }
              />
            </View>
          </Container>

          <Container>
            <View>
              <DeckSwiper
                dataSource={this.state.eventData}
                onSwipeRight={this.saveCard}
                renderItem={({item}) =>
                  <Card>
                    <CardItem>
                      <Left>
                        {/* <Thumbnail source={foodStockImage} /> */}
                        <Body>
                          <Text>{item.name}</Text>
                          <Text note style={{paddingBottom: 20}}>Venue: {item.venue}</Text>
                          <Text>Date: {item.date}</Text>
                          {/* <Text style={{paddingBottom: 20}}>Rating: {item.rating}</Text> */}
                          <Text style={{ color: 'blue' }} onPress={() => Linking.openURL(item.link)}>Menu</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem cardBody>
                      {/* <Image style={{ height: 300, flex: 1 }} source={{ uri: item.thumbnail }} /> */}
                      <Image style={{height: 200, flex: 1}}source={{ uri: item.image }} />
                    </CardItem>
                  </Card>
                }
              />
            </View>
          </Container>

          <Container>
            <View>
              <DeckSwiper
                dataSource={this.state.movieData}
                renderItem={item =>
                  <Card>
                    <CardItem>
                      <Left>
                        <Thumbnail source={movieStockImage} />
                        <Body>
                          <Text>{item.name}</Text>
                          <Text note style={{paddingBottom: 20}}>Rating: {item.rating}</Text>
                          <Text style={{paddingBottom: 20}}>Summary: {item.overview}</Text>
                          <Text> Genres: {item.genres}</Text>
                          <Text> Showtimes: {item.times}</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem cardBody>
                      <Image style={{height: 200, flex: 1}}source={{ uri: item.poster }} />
                    </CardItem>
                  </Card>
                }
              />
            </View>
          </Container>

          {/* <Container>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
              <DeckSwiper
                dataSource={this.state.restaurantData}
                renderItem={item =>
                  <Card style={{ elevation: 3 }}>
                    <CardItem style={{ height: 200 }, { width: 200 }}>
                      <Left>
                        <Thumbnail source={foodStockImage} />
                        <Body>
                          <Text>{item.name}</Text>
                          <Text note>Phone: {item.phone}</Text>
                          <Text>Location: {item.location}</Text>
                          <Text style={{paddingBottom: 20}}>Rating: {item.rating}</Text>
                          <Text style={{ color: 'blue' }} onPress={() => Linking.openURL(item.menu_link)}>Menu</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem cardBody>
                      <Image style={{ height: 300, flex: 1 }} source={{ uri: item.thumbnail }} />
                    </CardItem>
                  </Card>
                }
              />
            </View>
          </Container> */}

        </ScrollView>
        <Button title="Submit Date" onPress={() => this.finalizeDate}></Button>
      </Container>
    );
  }
}