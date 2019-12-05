import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    Button,
    AsyncStorage
} from 'react-native';
import CuisinePicker from '../../components/FoodSelection';
import SortBy from '../../components/FilterSelection'
import 'react-navigation';
const axios = require('axios')

export default class FoodSelection extends Component {

    state = {
        cuisine: '',
        sortby: '',
    }

    _storeData = async (data) => {
        try {
            await AsyncStorage.setItem('restaurantData', JSON.stringify(data))
            console.log("SAVED RESTAURANT DATA: ", JSON.stringify(data))
            alert("saved")
        } catch (error) {
            console.log(error)
        }
    }

    _storeFoodCuisine = async (data) => {
        try {
            await AsyncStorage.setItem('selectedCuisine', JSON.stringify(data))
            console.log("SAVED CUISINE DATA: ", JSON.stringify(data))
            alert("saved")
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
            <View>
                <ScrollView>
                    <View>
                        <Text>THIS IS THE FOOD SELECTION SCREEN</Text>
                        <CuisinePicker cuisine={this.state.cuisine} handleInput={this.handleInput} />
                        <SortBy sortby={this.state.sortby} handleInput={this.handleInput} />
                        <Button
                            title="Next"
                            onPress={this.SearchFoods}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}