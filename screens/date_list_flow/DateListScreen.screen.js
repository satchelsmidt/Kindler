import React, { Component } from "react";
import { Container, Content } from 'native-base';
import { View, Text, RefreshControl, SafeAreaView, Image } from 'react-native';
import ListOfItems from "../../components/DateList/List.component";
import Constants from 'expo-constants';

export default class DatesScreen extends Component {
    static navigationOptions = {
        title: 'Saved Juicy Dates',
        headerStyle: {
            backgroundColor: '#c4a494',
        }
    };

    state = {
        refreshing: false,
        setRefreshing: false
    }

    wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    generateListLabels(keys, item) {
        let names = []

        for (let i = 0; i < keys.length; i++) {
            names.push(item[keys[i]].name)
        }
        return names.join(', ')
    }

    noDates() {

        let test = { uri: 'https://media.giphy.com/media/Mp0BJWd9nC5Y4/source.gif' }
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={test}
                        style={{ width: 250, height: 300, justifyContent: 'center', alignItems: 'center', marginTop: '40%' }}
                    />
                </View>
            </View>
        )
    }

    onRefresh = async () => {
        // setRefreshing(true);
        this.setState({ refreshing: true })
        this.props.screenProps.refresh()

        // wait(2000).then(() => this.setState({ refreshing: false }));

        return new Promise((resolve) =>
            setTimeout(
                () => { resolve(this.setState({ refreshing: false })) },
                2000
            )
        );
    };

    render() {
        //stock campfire image for each date
        let stockImage = require('../../assets/images/campfire.jpg')
        let data = this.props.screenProps.data
        // let refreshUser = this.props.screenProps.refresh

        // const [refreshing, setRefreshing] = React.useState(false);



        return (
            <Container style={{backgroundColor: 'black'}}>
                <Content
                    // contentContainerStyle={styles.scrollView}
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                    }>
                    {/* Using data passed from the HomeScreen, generate each list item (the date) */}
                    {
                        data.length === 0 ? this.noDates() : data.map((item, index) => <ListOfItems
                            title={`Ignited on ${item.date_created}`}
                            key={index}
                            //this will display what kind of items (movie, restaurant, event) the date contains
                            description={`Includes: ${this.generateListLabels(Object.keys(item).slice(1, -2), item)}`}
                            //pass data containing information about each date activity to the next screen 
                            nav={() => { this.props.navigation.navigate('DateDetails', { activities: item }) }}
                            pic={stockImage}
                            icon={'right'}
                            type={'AntDesign'}
                            iconSize={25}
                            colorChange={'#13ff8a'}
                            colorChange2={'#a9adb7'}
                        />)
                    }
                </Content>
            </Container>
        )
    }
}

