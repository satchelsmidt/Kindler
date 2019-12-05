import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, KeyboardAvoidingView, Alert, AsyncStorage } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import Svg, { Image, Circle, ClipPath } from 'react-native-svg';
import * as Font from 'expo-font';
import { AppLoading } from 'expo'
import * as Google from 'expo-google-app-auth'
import { NavigationActions } from 'react-navigation';
import axios from 'axios'

const { width, height } = Dimensions.get('window')
const { Value, event, block, cond, eq, set, Clock, startClock, stopClock, debug, timing, clockRunning, interpolate, Extrapolate, concat } = Animated


//animation handler
function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0)
    };

    const config = {
        duration: 1000,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease)
    };

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock)
        ]),
        timing(clock, state, config),
        cond(state.finished, debug('stop clock', stopClock(clock))),
        state.position
    ]);
}

class LoginScreen extends Component {
    constructor() {
        super()
        this.state = {
            fontLoaded: false,
            isReady: false,
        };

        this.buttonOpacity = new Value(1)

        this.onStateChange = event([
            {
                nativeEvent: ({ state }) =>
                    block([
                        cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(), 1, 0)))
                    ])
            }
        ])

        this.onCloseState = event([
            {
                nativeEvent: ({ state }) =>
                    block([
                        cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(), 0, 1)))
                    ])
            }
        ])

        this.buttonY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [100, 0],
            extrapolate: Extrapolate.CLAMP
        })

        this.bgY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [-height / 3 - 50, 0],
            extrapolate: Extrapolate.CLAMP
        })

        this.textInputZindex = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, -1],
            extrapolate: Extrapolate.CLAMP
        })

        this.textInputY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [0, 100],
            extrapolate: Extrapolate.CLAMP
        })

        this.textInputOpacity = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, 0],
            extrapolate: Extrapolate.CLAMP
        })

        this.rotateCross = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [180, 360],
            extrapolate: Extrapolate.CLAMP
        })

    }

    /*=====  End of This portion handles the screen animations  ======*/

    //attempting to load custom fonts (currently not working)
    async componentDidMount() {
        await Font.loadAsync({
            'IndieFlower-Regular': require('../../assets/fonts/IndieFlower-Regular.ttf'),
        });
        this.setState({ fontLoaded: true, isReady: true });
        // this.setState({});
    }

    async setToken(user) {
        try {
            await AsyncStorage.setItem("userData", user)
            console.log("storage success")
        } catch (error) {
            console.log("something went wrong: ", error)
        }
    }

    _handleGoogleLogin = async () => {

        try {

            const result = await Google.logInAsync({
                androidClientId: '220715676294-6sqt060756ji445a4ru0q10gkteamqbv.apps.googleusercontent.com',
                iosClientId: '220715676294-o3v7hl5mj6l0rd4ubjvbfia9h02jb6hb.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            }).then(result => {

                if (result.type === 'success') {
                    Alert.alert(
                        'Logged in!',
                        `Hi ${result.user.name}!`,
                    );
                    const user_auth = result.user.id
                    const user_name = result.user.name

                    this.setToken((user_auth))
                    console.log('Google Result:', result)

                    /*=============================================
                    =    User signup/login into mongodb          =
                    =============================================*/
                    // using the returned authID, check if the user exsists within the mongoDB
                    axios.get(`https://obscure-springs-29928.herokuapp.com/date/find_user/${user_auth}`)
                        .then(results => {
                            // console.log(results.data)
                            //if the user exsists, the result will contain all of the users date data
                            //send over the userID to the date create section so we can store user dates
                            if (results.data.length === 1) {
                                //pass the data to the navigation (HomeScreen) 
                                //nav to App?
                                //all screens should be able to access the data throught 'props.navigation.(getParams?)'
                                //results.data[0].dates
                                this.props.navigation.navigate({
                                    routeName: 'App',
                                    action: NavigationActions.navigate({
                                        routeName: 'Main',
                                        action: NavigationActions.navigate({
                                            routeName: 'Home',
                                            params: { userData: results.data }
                                        })
                                    })
                                })
                            }
                            else {
                                //create new user, pass in auth providied by google 
                                axios({
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Cache-Control': 'no-cache'
                                    },
                                    url: 'https://obscure-springs-29928.herokuapp.com/date/create_user',
                                    data: {
                                        name: user_name,
                                        auth: user_auth
                                    }
                                })
                                    .then(result => {
                                        // console.log(result.data)
                                        //nav to App?
                                        //results.data[0].dates
                                        this.props.navigation.navigate({
                                            routeName: 'App',
                                            action: NavigationActions.navigate({
                                                routeName: 'Main',
                                                action: NavigationActions.navigate({
                                                    routeName: 'Home',
                                                    params: { userData: results.data }
                                                })
                                            })
                                        })
                                    })
                                    .catch(err => console.error(err))
                            }
                        })
                        .catch(err => console.error(err))

                    /*=====  End of User signup/login into mongodb  ======*/

                    return result.accessToken;
                } else {
                    Alert.alert(
                        'Cancelled!',
                        'Login was cancelled!',
                    );
                    return { cancelled: true };
                }
            })
        } catch (e) {
            console.log("ERROR: ", e)
            Alert.alert(
                'Oops!',
                'Login failed!',
            );
            return { error: true };
        }
    }

    render() {
        if (!this.state.isReady) {
            return <AppLoading />;
        } else {

            return (
                <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'black', color: 'white', justifyContent: 'flex-end' }} behavior="padding" enabled>
                    <View style={{
                        flex: 1,
                        backgroundColor: 'black',
                        justifyContent: 'flex-end'
                    }}>
                        <View style={{ alignItems: 'center', paddingBottom: '75%' }}><Text style={styles.title}>Kindler</Text></View>
                        <Animated.View style={{ ...StyleSheet.absoluteFill, transform: [{ translateY: this.bgY }] }}>
                            <Svg height={height + 50} width={width}>
                                <ClipPath id='clip'>
                                    <Circle r={height + 50} cx={width / 2} />
                                </ClipPath>
                                <Image
                                    href={require('../../assets/images/login_campfire.jpg')}
                                    width={width}
                                    height={height + 50}
                                    preserveAspectRatio='xMidYMid slice'
                                    clipPath='url(#clip)'
                                />
                            </Svg>
                        </Animated.View>
                        <View style={{ height: height / 3, justifyContent: 'center' }}>
                            <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                                <Animated.View
                                    style={{ ...styles.button, opacity: this.buttonOpacity, transform: [{ translateY: this.buttonY }] }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN IN</Text>
                                </Animated.View>
                            </TapGestureHandler>
                            <Animated.View style={{ ...styles.button, backgroundColor: 'rgba(222, 82, 70, 0.75)', opacity: this.buttonOpacity, transform: [{ translateY: this.buttonY }] }}>
                                <Text
                                    style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}
                                    onPress={() => this._handleGoogleLogin()}
                                >SIGN IN WITH GOOGLE</Text>
                            </Animated.View>
                        </View>
                        <Animated.View style={{
                            zIndex: this.textInputZindex,
                            opacity: this.textInputOpacity,
                            transform: [{ translateY: this.textInputY }],
                            height: height / 3,
                            ...StyleSheet.absoluteFill,
                            top: null,
                            justifyContent: 'center'
                        }}>

                            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                                <Animated.View style={styles.closeButton}>
                                    <Animated.Text style={{
                                        fontSize: 15,
                                        transform: [{
                                            rotate: concat(this.rotateCross, 'deg')
                                        }]
                                    }}>X</Animated.Text>
                                </Animated.View>
                            </TapGestureHandler>

                            <TextInput
                                placeholder="EMAIL"
                                style={styles.textInput}
                                placeholderTextColor='white'
                            />
                            <TextInput
                                placeholder="PASSWORD"
                                style={styles.textInput}
                                placeholderTextColor='white'
                            />
                            <Animated.View style={styles.button}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN IN</Text>
                            </Animated.View>
                        </Animated.View>
                    </View >
                </KeyboardAvoidingView>

            )
        }
    }
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 5,
        // fontFamily: 'IndieFlower-Regular',
    },
    closeButton: {
        height: 40,
        width: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -20,
        left: width / 2 - 20,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 5
    },
    textInput: {
        height: 50,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: 'rgba(0,0,0,0.2)'
    },
    title: {
        fontFamily: 'IndieFlower-Regular',
        color: 'white',
        fontSize: 80,
        zIndex: 2,
    }
})