import React from 'react';
import {
    AsyncStorage,
    Button,
    View
} from 'react-native';

function SignOutButton(props){
    // static navigationOptions ={
    //     title: 'Please Sign OUTT'
    // };
    console.log('SIGN OUT PROPS: ', props)
        return(
            <View>
                <Button title="Sign out!" onPress= {props.navigation}/>
            </View>
        )

    // _signOutAsync = async()=>{
    //     try {
    //         console.log("reached this stage")
    //         await AsyncStorage.clear();
    //         console.log("this:")
    //         console.log(this)
    //         console.log("this.props:")
    //         console.log(this.props)
    //         this.props.navigation.navigate('Auth')
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
}

export default SignOutButton;