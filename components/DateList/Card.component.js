import React, { Component } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Content, Container, Header, Segment, Right, Tabs, Tab } from 'native-base';
import ImageCarousel from '../DateList/Carousel.component';
import axios from 'axios'

//used to display the cumulative information for each activity 
export default class Cards extends Component {
    state = {
        isGreeting: false,
        theaterName: '',
    }

    //generate a carousel component for the restaurant pictures 
    renderCarousel(props) {
        //if sent an array of images, generate the carousel 
        if (props.entries !== undefined) {
            return <ImageCarousel entries={props.entries} />
        }
        //if not, the item is either a movie or event, so just generate one image 
        else {
            return (<Content >
                <Image
                    source={this.props.pic}
                    style={{
                        height: this.props.imgHeight,
                        width: this.props.imgWidth,
                        flex: 1
                    }} />
            </Content>)
        }
    }

    renderInfoDetails() {
        //if rendering a movie item 
        if (this.props.links) {
            return <Text>{this.props.info}</Text>
        }
        else {
            return <CardItem header style={styles.card2}>
                <Body>
                    {/* <Text>{this.props.title}</Text> */}
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>{this.props.info}</Text>
                    <Text note style={{ color: 'white' }}>T: {this.props.time}</Text>
                    <Text note style={{ color: 'white' }}>P: {this.props.phone}</Text>
                    <Right>
                        <View style={styles.mainIcon}>
                            <Button onPress={() => this._handlePress(this.props.menu)} transparent>
                                {/* <Text>View Menu</Text> */}
                                <Icon type='Entypo' name='open-book' style={{
                                    fontSize: 35,
                                    marginLeft: '1%',
                                    marginRight: '1%',
                                    color: 'black',
                                }} />
                            </Button>
                        </View>
                    </Right>
                </Body>
            </CardItem>
        }
    }

    _handlePress = (href) => {
        WebBrowser.openBrowserAsync(href);
    };


    renderTicketInfo() {
        //if the item is an event 
        if (this.props.time) {
            return
        }
        //if the item is a movie 
        else if (this.props.times) {
            return this.props.times.map((item, index) => <Button
                rounded
                warning
                key={index}
                style={{
                    alignSelf: null,
                    justifyContent: 'center'
                }}
                onPress={() => this._handlePress(this.props.links[index])}
            ><Text >{item}</Text></Button>)
        }
    }

    renderTicketSalesHeader() {
        //render the information for an event 
        if (this.props.venue) {
            return <CardItem style={styles.card2}>
                <Left>
                    <Text style={{ fontWeight: 'bold' }}>{this.props.venue}</Text>
                    {/* <Text note>{this.props.address}</Text> */}
                    {/* <Text note>{this.props.time}</Text> */}
                </Left>
                <Body>
                    <View style={styles.mainIcon}>
                        <Button onPress={() => this._handlePress(this.props.menu)} transparent style={{ justifyContent: 'center', alignItems: 'center' }}>
                            {/* <Text>View Menu</Text> */}
                            <Icon type='FontAwesome5' name='ticket-alt' style={{
                                fontSize: 20,
                                // marginLeft: '10%',
                                // // marginRight: '1%',
                                color: 'black',
                            }} />
                        </Button>
                    </View>
                </Body>
                <Right>
                    <Text>Price Range: ${this.props.price}</Text>
                    {/* <Text note>{this.props.currency}</Text> */}
                    {/* <Text note> </Text> */}
                </Right>

            </CardItem>
        }
        //render the information for a movie 
        else {
            return <CardItem header>
                <Body>
                    <Text>{this.state.theaterName}</Text>
                    <Text note>{this.state.theaterAddress}</Text>
                </Body>
            </CardItem>
        }
    }

    renderInfoTab() {
        if (this.props.info) {
            return <Tab
                heading="Info"
                tabStyle={{ backgroundColor: '#c4a494' }}
                activeTabStyle={{ backgroundColor: '#c4a494' }}
            // tabBarUnderlineStyle={{ borderRadius: 50, width: '20%' }}
            >
                <Card transparent>
                    {this.renderInfoDetails()}
                </Card>
            </Tab>
        }
    }

    renderTicketTab() {
        if (this.props.currency || this.props.times) {
            return <Tab heading="Tickets" style={{}}
                tabStyle={{ backgroundColor: '#c4a494' }}
                activeTabStyle={{ backgroundColor: '#c4a494' }}>
                <Card transparent>
                    {this.renderTicketSalesHeader()}
                    <View style={{
                        flexDirection: 'row',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        {this.renderTicketInfo()}
                    </View>
                </Card>
            </Tab>
        }
    }

    getTheater() {
        axios.get(`https://obscure-springs-29928.herokuapp.com/movies/get_theater/${this.props.movieID}`)
            .then(result => {
                this.setState({ theaterName: result.data[0].name, theaterAddress: result.data[0].address })
            })
            .catch(err => console.error(err))
    }

    componentDidMount() {
        if (this.props.movieID) {
            this.getTheater()
        }
    }

    render() {

        return (
            <Container>
                <Content>
                    <Content style={{ backgroundColor: '#a9adb7' }}>
                        <Card transparent style={{ backgroundColor: '#a9adb7' }}>
                            <CardItem style={{ ...styles.card, backgroundColor: '#a9adb7' }}>
                                <Left>
                                    <Thumbnail source={this.props.stock} />
                                    <Body>
                                        <Text style={{ fontWeight: 'bold' }}>{this.props.title}</Text>
                                        <Text note style={{ color: 'white' }}>{this.props.date}</Text>
                                    </Body>
                                    {
                                        this.props.rating ? <Text style={styles.header}> Rating: {this.props.rating} </Text> : <Text></Text>
                                    }
                                    <Thumbnail
                                        circle
                                        small
                                        source={require('../../assets/images/star.jpg')}
                                        style={styles.rating} />
                                </Left>
                            </CardItem>
                            <CardItem style={{ backgroundColor: '#a9adb7' }}>
                                <Body style={{ alignItems: 'center' , backgroundColor: '#a9adb7'}}>
                                    {this.renderCarousel(this.props)}
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>
                    <Content>
                        <Header hasTabs style={styles.tabNav} />
                        <Tabs >
                            {this.renderInfoTab()}

                            {this.renderTicketTab()}
                        </Tabs>
                    </Content>
                </Content>
            </Container>

        );
    }
}

const styles = StyleSheet.create({
    header: {
        fontWeight: 'bold',
        color: 'white',
    },
    headerBox: {
        borderBottomColor: 'rgba(232, 232, 232, 1)',
        borderBottomWidth: 0.8,
    },
    rating: {
        width: 20, height: 20, marginLeft: '1%'
    },
    tabNav: {
        height: 0
    },
    card: {
        backgroundColor: '#a9adb7',
        marginHorizontal: 20,
        borderRadius: 35,
    },
    card2: {
        backgroundColor: '#c4a494',
        marginHorizontal: 20,
        borderRadius: 35,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 3,
    },
    mainIcon: {
        backgroundColor: '#13ff8a',
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 5,
        marginTop: '1%'
        // zIndex: -1,
    }
})