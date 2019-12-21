import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    // Button,
    AsyncStorage,
    Image,
    StyleSheet,
    MaskedViewIOS,
    ImageBackground,
} from 'react-native';
import CuisinePicker from '../../components/FoodSelection';
import SortBy from '../../components/FilterSelection'
import 'react-navigation';
import { Container, Content, Body, Button } from 'native-base';
const axios = require('axios')

export default class FoodSelection extends Component {

    state = {
        cuisine: '',
        sortby: '',
    }


    static navigationOptions = {
        headerStyle: {
            // backgroundColor: 'rgba(128,128,128, 0.2)',
            // headerTintColor: 'white'
        },
        title: 'Select some food options!',
        headerTransparent: true,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        
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
            // console.log('RESPONSE: ', response)
            this.props.navigation.navigate('Movie')
            this._storeData(response)
        })
        //TODO: Offset API call by 5 for each progressive api call
    }

    handleInput = (value, name) => {
        // console.log('VALUE:', value)
        this.setState({
            [name]: value
        }, () => this._storeFoodCuisine(this.state.cuisine))
    }

    render() {
        return (
            <Container>
                <ImageBackground
                    style={{ width: '100%', height: '100%' }}
                    source={require('../../assets/images/eatppl.jpg')}
                >
                    <Body style={styles.dateSel}>
                        <Content style={{
                            // height: 5, paddingBottom: 5,

                        }}>
                            <CuisinePicker
                                cuisine={this.state.cuisine}
                                handleInput={this.handleInput}
                            />
                            <SortBy
                                sortby={this.state.sortby}
                                handleInput={this.handleInput} />
                        </Content>
                    </Body>
                    <Body style={{ height: '3%' }}>
                        {/* <Text></Text> */}
                    </Body>
                    <View style={styles.button}>
                        <Button
                            transparent
                            light
                            onPress={this.SearchFoods}
                        >
                            <Text style={styles.buttonTxt}>Next</Text>
                        </Button>
                    </View>
                </ImageBackground>
            </Container >
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'grey',
        height: 70,
        marginHorizontal: 20,
        // marginTop: '30%',
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 5,
        opacity: 0.8
        // fontFamily: 'IndieFlower-Regular',
    },
    dateSel: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '45%',
        backgroundColor: 'white',
        paddingBottom: 1,
        height: 10,
        opacity: 0.8,
        borderRadius: 40
    },
    buttonTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
})