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

    // let currentComponent = this

    // _clearData = async(data)=>{
    //     try{
    //         await AsyncStorage.multiRemove(data)
    //         alert('removed that shit')
    //         console.log('this is the data we apparently removed: ', data)
    //     }catch(error){
    //         console.log(error)
    //     }
    // }

    _storeData = async (data) => {
        try {
            await AsyncStorage.setItem('restaurantData', JSON.stringify(data))
            console.log("THE DATA WE SAVED: ", JSON.stringify(data))
            alert("saved")
        } catch (error) {
            console.log(error)
        }
    }


    SearchFoods = () => {


        axios.get('https://obscure-springs-29928.herokuapp.com/resturants/get_resturants', {
            parameters: {
                "cuisine": this.state.cuisine,
                "sortBy": this.state.sortby,
                "location": "47.652071, -122.413393",
                "offset": 0
            }
        }).then(response => {
            console.log("STATE OF CUISINE (apparently): ", this.state.cuisine)
            console.log('RESPONSE: ', response)
            this.props.navigation.navigate('Movie')
            this._storeData(response)
        })

        // console.log("response: ", response)
        // this.setState("response" = response)
        //TODO: Store response in state, offset API call by 5 for each progressive api call
        // })
    }

    handleInput = (value, name) => {
        this.clearInitial()

        console.log('VALUE:', value)
        this.setState({
            [name]: value
            
        },
        ()=>console.log('cuisine after set:', this.state.cuisine))
        // console.log('cuisine after set:', this.state.cuisine)
    }

    clearInitial = () => {
        this.setState({
            cuisine: '',
            sortby: ''
        })
    }

    render() {

        //         if(this.state.cuisine.length !==0){
        //             this.clearInitial()
        // return false
        //         }


        // if (this.state.cuisine.length !== 0) {
        //     this._clearData(['dateData', 'restaurantData', 'movieData']) //return false or a <Loader/> when you don't have anything in your message[]
        //   }
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