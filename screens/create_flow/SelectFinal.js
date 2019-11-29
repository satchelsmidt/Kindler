import React, { Component } from 'react';
import { Image, Button, AsyncStorage, ScrollView } from 'react-native';
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

  state = {
    dateData: '',
    restaurantData: '',
    movieData: ''
  }

  _retrieveData = async (keys) => {
    try {
      const value = await AsyncStorage.multiGet(keys);
      console.log('value: ', value)
      const dateData = value[0]
      const restaurantData = (JSON.parse(value[1][1]).data)
      const movieData = (JSON.parse(value[2][1]).data)

      console.log('date Data: ', dateData)
      console.log('RESTAURANTS Data: ', restaurantData)
      console.log('movie Data: ', movieData)

      this.setState({ dateData: dateData })
      this.setState({ restaurantData: restaurantData })
      this.setState({ movieData: movieData })

      console.log('this is DATE STATE: ', this.state.dateData)
      console.log('this is RESTAURANT STATE: ', this.state.restaurantData)
      console.log('this is MOVIE STATE: ', this.state.movieData)

      console.log('bIG TEST SITUATION:', this.state.restaurantData[0].name)

    } catch (error) {
      console.log(error)
    }
  }

  // updateCards =()=>{
  //   this.state.restaurantData.map(e =>{
  //     text: this.state.restaurantData.name,
  //     name: this.state.restaurantData.name,
  //     image:'../../assets/images/robot-dev.png'
  //   })
  // }
// TODO: Actually send the data here to the server
  finalizeDate=()=>{
    this.setState({ dateData: '' })
      this.setState({ restaurantData: '' })
      this.setState({ movieData: '' })
      console.log('data sent to server')
  }

  componentWillMount() {
    this._retrieveData(['dateData', 'restaurantData', 'movieData'])
  }

  render() {

    if (this.state.restaurantData.length === 0) {
      return false //return false or a <Loader/> when you don't have anything in your message[]
    } else if (this.state.movieData.length === 0) {
      return false
    }
    return (

      <Container>

        <ScrollView>

          <Container>
            {/* <Header /> */}

            {/* <ScrollView> */}
            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>

              <DeckSwiper
                dataSource={this.state.restaurantData}
                // dataSource={cards}
                renderItem={item =>
                  <Card style={{ elevation: 3 }}>
                    <CardItem>
                      <Left>
                        <Thumbnail source={{uri:item.thumbnail}}/>
                        <Body>
                          <Text>{item.name}</Text>
                          <Text note>NativeBase</Text>
                          <Text>Location: {item.location}</Text>
                          <Text>Rating: {item.rating}</Text>
                          <Text>Menu: {item.menu_link}</Text>

                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem cardBody>
                    <Image style={{ height: 30, width: 30, flex: 1 }} source={{uri:item.thumbnail}} />
                    </CardItem>
                    <CardItem>
                      <Icon name="heart" style={{ color: '#ED4A6A' }} />
                      <Text>Phone: {item.phone}</Text>
                    </CardItem>
                  </Card>
                }
              />
            </View>

            {/* </ScrollView> */}
          </Container>

          <Container>
            <View>
              <DeckSwiper
                dataSource={this.state.movieData}
                // dataSource={cards}
                renderItem={item =>
                  <Card style={{ elevation: 3 }}>
                    <CardItem>
                      <Left>
                        {/* <Thumbnail source={item.poster} /> */}
                        <Body>
                          <Text>{item.name}</Text>
                          <Text note>NativeBase</Text>
                          <Text>Location: {item.rating}</Text>
                          <Text>Rating: {item.times}</Text>
                          <Text>Menu: {item.overview}</Text>

                        </Body>
                      </Left>
                    </CardItem>
                    {/* <CardItem cardBody> */}
                    {/* <Image style={{ height: 300, flex: 1 }} source={item.thumbnail} /> */}
                    {/* </CardItem> */}
                    <CardItem>
                      <Icon name="heart" style={{ color: '#ED4A6A' }} />
                      <Text>Genres: {item.genres}</Text>
                    </CardItem>
                  </Card>
                }
              />
            </View>
          </Container>

          <Button title="Submit Date" onPress={()=>this.finalizeDate}></Button>

        </ScrollView>

      </Container>
    );
  }
}