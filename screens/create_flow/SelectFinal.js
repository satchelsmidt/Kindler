import React, { Component } from 'react';
import { Image, Button, AsyncStorage, ScrollView, Linking } from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
let foodStockImage = require('../../assets/images/foods.jpg')
let movieStockImage = require("../../assets/images/popin'corn.jpg")
import axios from 'axios';

export default class DeckSwiperExample extends Component {

  state = {
    dateData: '',
    restaurantData: '',
    movieData: '',
    eventData: '',
    selectedRestaurant: '',
    selectedRestaurantID: '',
    selectedMovie: '',
    selectedMovieID: '',
    selectedEvent: '',
    selectedEventID: ''
  }

  _retrieveData = async (keys) => {
    try {
      const value = await AsyncStorage.multiGet(keys);
      console.log('value: ', value)
      const dateData = value[0]
      const restaurantData = (JSON.parse(value[1][1]).data)
      const movieData = (JSON.parse(value[2][1]).data)
      const eventData = (JSON.parse(value[3][1]).data)

      console.log('date Data: ', dateData)
      console.log('RESTAURANTS Data: ', restaurantData)
      console.log('movie Data: ', movieData)
      console.log('EVENT Data: ', eventData)


      this.setState({ dateData: dateData })
      this.setState({ restaurantData: restaurantData })
      this.setState({ movieData: movieData })
      this.setState({ eventData: eventData })


      console.log('this is DATE STATE: ', this.state.dateData)
      console.log('this is RESTAURANT STATE: ', this.state.restaurantData)
      console.log('this is MOVIE STATE: ', this.state.movieData)
      console.log('this is EVENT STATE: ', this.state.eventData)


      console.log('bIG TEST SITUATION:', this.state.restaurantData[0].name)

    } catch (error) {
      console.log(error)
    }
  }

  // TODO: Actually send the data here to the server
  finalizeDate = () => {

    console.log('BUTTON WORKS')

    axios({
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json',
      //   'Cache-Control': 'no-cache'
      // },
      url: 'https://obscure-springs-29928.herokuapp.com/date/add_date',
      data: {
        "resturantID": this.state.selectedRestaurantID,
        // movieID: this.state.movieDataID,
        // eventID: this.state.eventDataID,
        "userID": '5dd625cd294dd35110a02b74'
      }
    })

      .then(response => {
        console.log('RESPONSE: ', response.data)
      })

    this.setState({ dateData: '' })
    this.setState({ restaurantData: '' })
    this.setState({ movieData: '' })
    this.setState({ eventData: '' })
    console.log('data sent to server')
  }

  storeRestaurantData = () => {

    console.log("Selected Name:", this.state.selectedRestaurant.name)

    axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      url: 'https://obscure-springs-29928.herokuapp.com/resturants/store_resturant',
      data: {
        "name": this.state.selectedRestaurant.name,
        "location": this.state.selectedRestaurant.location,
        "times": this.state.selectedRestaurant.times,
        "thumbnail": this.state.selectedRestaurant.thumbnail,
        "rating": this.state.selectedRestaurant.rating,
        "food_photos": this.state.selectedRestaurant.food_photos,
        "phone": this.state.selectedRestaurant.phone,
        "menu_link": this.state.selectedRestaurant.menu_link
      }
    }).then(response => {
      console.log('AXIOS CALL COMPLETED')
      console.log('RESPONSE: ', response)
      this.setState({ selectedRestaurantID: response.data._id }, () => console.log("ID THAT WE ARE STORING: ", this.state.selectedRestaurantID))
    })
  }

  storeMovieData = () => {

    console.log("Selected Name:", this.state.selectedRestaurant.name)

    axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      url: 'https://obscure-springs-29928.herokuapp.com/resturants/store_resturant',
      data: {
        "name": this.state.selectedRestaurant.name,
        "location": this.state.selectedRestaurant.location,
        "times": this.state.selectedRestaurant.times,
        "thumbnail": this.state.selectedRestaurant.thumbnail,
        "rating": this.state.selectedRestaurant.rating,
        "food_photos": this.state.selectedRestaurant.food_photos,
        "phone": this.state.selectedRestaurant.phone,
        "menu_link": this.state.selectedRestaurant.menu_link
      }
    }).then(response => {
      console.log('AXIOS CALL COMPLETED')
      console.log('RESPONSE: ', response)
      this.setState({ selectedRestaurantID: response.data._id }, () => console.log("ID THAT WE ARE STORING: ", this.state.selectedRestaurantID))
    })
  }

  storeEventData = () => {

    console.log("Selected Name:", this.state.selectedEvent.name)

    axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      url: 'https://obscure-springs-29928.herokuapp.com/events/store_event',
      data: {
        "name": this.state.selected.name,
        "link": this.state.selected.link,
        "time": this.state.selected.time,
        "price": this.state.selected.price,
        "venue": this.state.selected.venue,
        "image": this.state.selected.image,
        "address": this.state.selected.address,
        "date": this.state.selected.date
            // "type":
                  // TODO: Add cuisine selected for 'type' 
      }
    }).then(response => {
      console.log('AXIOS CALL COMPLETED')
      console.log('RESPONSE: ', response)
      this.setState({ selectedEventID: response.data._id }, () => console.log("ID THAT WE ARE STORING: ", this.state.selectedEventID))
    })
  }

  // TODO: storing restaurant data works as intended, now need to 
  //0. save current user id on login WITHIN asyncstorage
  //1. retrive restaurant id that was stored
  //2. pass restaurant id to axios call in the 'create date' route
  //3. repeat for movies, events 

  saveRestaurantCard = (data) => {
    this.setState(
      { selectedRestaurant: data },
      () => this.storeRestaurantData()
    )
  }

  saveMovieCard = (data) => {
    this.setState(
      { selectedMovie: data },
      () => this.storeMovieData()
    )
  }

  saveEventCard = (data) => {
    this.setState(
      { selectedEvent: data },
      () => this.storeEventData()
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
    } else if (this.state.eventData.length === 0){
      return false 
    }
    return (

      <Container>
        <ScrollView>

          <Container>
            <View>
              <DeckSwiper
                dataSource={this.state.restaurantData}
                // onSwipeRight={()=> this.saveRestaurantCard(item.name)}
                onSwipeRight={item => console.log(item.name)}
                onSwipeRight={item => this.saveRestaurantCard({
                  "name": item.name,
                  "location": item.location,
                  "times": item.times,
                  "thumbnail": item.thumbnail,
                  "rating": item.rating,
                  "food_photos": item.food_photos,
                  "phone": item.phone,
                  "menu_link": item.menu_link,
                })}
                renderItem={item =>

                  <Card>
                    <CardItem>
                      <Left>
                        <Thumbnail source={foodStockImage} />
                        <Body>
                          <Text>{item.name}</Text>
                          <Text note style={{ paddingBottom: 20 }}>Phone: {item.phone}</Text>
                          <Text>Location: {item.location}</Text>
                          <Text style={{ paddingBottom: 20 }}>Rating: {item.rating}</Text>
                          <Text style={{ color: 'blue' }} onPress={() => Linking.openURL(item.menu_link)}>Menu</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem cardBody>
                      {/* <Image style={{ height: 300, flex: 1 }} source={{ uri: item.thumbnail }} /> */}
                      <Image style={{ height: 200, flex: 1 }} source={{ uri: item.thumbnail }} />
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
                renderItem={item =>
                  <Card>
                    <CardItem>
                      <Left>
                        <Thumbnail source={{ uri: 'https://cdn5.vectorstock.com/i/1000x1000/14/79/silhouette-of-seattle-skyline-vector-16381479.jpg' }} />
                        <Body>
                          <Text>{item.name}</Text>
                          <Text note style={{ paddingBottom: 20 }}>Venue: {item.venue}</Text>
                          <Text style={{ paddingBottom: 20 }}>Address: {item.address}</Text>
                          <Text> Date: {item.date}</Text>
                          <Text> Time: {item.time}</Text>
                          <Text style={{ color: 'blue' }} onPress={() => Linking.openURL(item.link)}>Purchase Tickets!</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem cardBody>
                      <Image style={{ height: 200, flex: 1 }} source={{ uri: item.image }} />
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
                          <Text note style={{ paddingBottom: 20 }}>Rating: {item.rating}</Text>
                          <Text style={{ paddingBottom: 20 }}>Summary: {item.overview}</Text>
                          <Text> Genres: {item.genres}</Text>
                          <Text> Showtimes: {item.times}</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem cardBody>
                      <Image style={{ height: 200, flex: 1 }} source={{ uri: item.poster }} />
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
        <Button title="Submit Date" onPress={() => this.finalizeDate()}></Button>
      </Container>
    );
  }
}