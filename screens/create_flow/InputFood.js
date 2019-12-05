import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    Button,
    AsyncStorage,
    Image,
    StyleSheet,
    MaskedViewIOS,
    ImageBackground
} from 'react-native';
import CuisinePicker from '../../components/FoodSelection';
import SortBy from '../../components/FilterSelection'
import 'react-navigation';
import { Container, Content } from 'native-base';
const axios = require('axios')

export default class FoodSelection extends Component {

    state = {
        cuisine: '',
        sortby: '',
    }

    _storeData = async (data) => {
        try {
            await AsyncStorage.setItem('restaurantData', JSON.stringify(data))
            // console.log("SAVED RESTAURANT DATA: ", JSON.stringify(data))
            // alert("saved")
        } catch (error) {
            console.log(error)
        }
    }

    _storeFoodCuisine = async (data) => {
        try {
            await AsyncStorage.setItem('selectedCuisine', JSON.stringify(data))
            // console.log("SAVED CUISINE DATA: ", JSON.stringify(data))
            // alert("saved")
        } catch (error) {
            console.log(error)
        }
    }

    SearchFoods = () => {

        axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            url: 'https://obscure-springs-29928.herokuapp.com/resturants/get_resturants',
            data: {
                cuisine: this.state.cuisine,
                sortBy: this.state.sortby,
                location: "47.6062,122.3321",
                offset: 0
            }
        }).then(response => {
            console.log('RESPONSE: ', response)
            this.props.navigation.navigate('Movie')
            this._storeData(response)
        })
        //TODO: Offset API call by 5 for each progressive api call
    }

    handleInput = (value, name) => {
        console.log('VALUE:', value)
        this.setState({
            [name]: value
        }, () => this._storeFoodCuisine(this.state.cuisine))
    }

    render() {
        return (
            <Container>
                <ImageBackground
                    style={{ width: '100%', height: '100%' }}
                    source={require('../../assets/images/restuarant_2.jpg')}
                >

                    <Text>THIS IS THE FOOD SELECTION SCREEN</Text>
                    <Content>
                        <CuisinePicker cuisine={this.state.cuisine} handleInput={this.handleInput} />
                        <SortBy sortby={this.state.sortby} handleInput={this.handleInput} />
                    </Content>
                    <Button
                        title="Next"
                        onPress={this.SearchFoods}
                        color="#666"
                    />

                </ImageBackground>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    navBar: {
        height: 110,
        backgroundColor: '#f4871e',
        elevation: 3,
        flexDirection: 'row',
    },
    leftNav: {
        flexDirection: 'row',
        paddingBottom: 20
    },
    navTitle: {
        marginLeft: 25,
        fontSize: 30,
        alignContent: 'center',
        color: 'white'
    },
    body: {
        flex: 1,
        backgroundColor: 'red'
    }
})