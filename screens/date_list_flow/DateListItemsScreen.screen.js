import React, { Component } from "react";
import { Container, Content } from 'native-base';
import ListOfItems from "../../components/DateList/List.component";

export default class DateListItemsScreen extends Component {
    static navigationOptions = {
        title: 'Date Activites',
        headerStyle: {
            backgroundColor: '#13ff8a',
        }
    };

    render() {
        //grab the data from the previous screen 
        let data = this.props.navigation.getParam('activities', 'default value')
        //grab each key from the object
        //using the keys iterate through the object containing a movie, event, and/or restaurant
        let dataReferences = Object.keys(data)
        //get rid of the id and _v that are returned with each mongodb document 
        dataReferences = dataReferences.slice(1, Object.keys(dataReferences).length - 1)
        return (
            <Container>
                <Content>
                    {
                        dataReferences.map((e, i) => {
                            switch (e) {
                                case 'resturants':
                                    let thumbnail = { uri: data.resturants.thumbnail }
                                    return <ListOfItems
                                        key={i}
                                        title={data.resturants.name}
                                        pic={thumbnail}
                                        description={data.resturants.type}
                                        nav={() => { this.props.navigation.navigate('DateItem', { details: data.resturants }) }}
                                        icon={'food-fork-drink'}
                                        type={'MaterialCommunityIcons'}
                                        iconSize={30}
                                        colorChange2={'#c4a494'}
                                        colorChange={'#a9adb7'}
                                    />
                                case 'movies':
                                    let poster = { uri: data.movies.poster }
                                    return <ListOfItems
                                        key={i}
                                        title={data.movies.name}
                                        pic={poster}
                                        description={data.movies.genres.join(', ')}
                                        nav={() => { this.props.navigation.navigate('DateItem', { details: data.movies }) }}
                                        icon={'ticket'}
                                        type={'FontAwesome'}
                                        iconSize={30}
                                        colorChange2={'#c4a494'}
                                        colorChange={'#a9adb7'}
                                    />
                                case 'events':
                                    let image = { uri: data.events.image }
                                    return <ListOfItems
                                        key={i}
                                        title={data.events.name}
                                        description={data.events.type}
                                        pic={image}
                                        nav={() => { this.props.navigation.navigate('DateItem', { details: data.events }) }}
                                        icon={'event-seat'}
                                        type={'MaterialIcons'}
                                        iconSize={30}
                                        colorChange2={'#c4a494'}
                                        colorChange={'#a9adb7'}
                                    />
                                default:
                                    return
                            }
                        })
                    }
                </Content>
            </Container>
        )
    }
}
