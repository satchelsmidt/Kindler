import React, { Component } from "react";
import { Container, Content } from 'native-base';
import ListOfItems from "../../components/DateList/List.component";

export default class DateListItemsScreen extends Component {
    static navigationOptions = {
        title: 'Date Activites',
        headerStyle: {
            backgroundColor: '#ed7a0c',
        }
    };

    render() {

        //get rid of the id and _v thing 
        let data = this.props.navigation.getParam('activities', 'default value')
        let test = Object.keys(data)
        test = test.slice(1, Object.keys(test).length - 1)
        return (
            <Container>
                <Content>
                    {
                        test.map((e, i) => {
                            switch (e) {
                                case 'resturants':
                                    let thumbnail = {uri: data.resturants.thumbnail}
                                    return <ListOfItems
                                        key={i}
                                        title={data.resturants.name}
                                        pic={thumbnail}
                                        nav={() => { this.props.navigation.navigate('DateItem', { details: data.resturants }) }}
                                    />
                                case 'movies':
                                    let poster = {uri: data.movies.poster}
                                    return <ListOfItems
                                        key={i}
                                        title={data.movies.name}
                                        pic={poster}
                                        description={data.movies.overview}
                                        nav={() => { this.props.navigation.navigate('DateItem', { details: data.movies }) }}
                                    />
                                case 'events':
                                    let image = {uri:data.events.image}
                                    return <ListOfItems
                                        key={i}
                                        title={data.events.name}
                                        pic={image}
                                        nav={() => { this.props.navigation.navigate('DateItem', { details: data.events }) }}
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
