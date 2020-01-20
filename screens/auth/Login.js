import React, { Component } from 'react';
// 'KeyboardAvoidingView' - a component to solve the common problem of views that need to move out of the way of the virtual keyboard. It can automatically adjust either its height, position, or bottom padding based on the position of the keyboard.
import { View, Text, StyleSheet, Dimensions, TextInput, KeyboardAvoidingView, Alert, AsyncStorage } from 'react-native';
// 'Easing' module is used by Animated.timing() to convey physically believable motion in animations.
// 'Animated' focuses on declarative relationships between inputs and outputs, with configurable transforms in between, and start/stop methods to control time-based animation execution.
import Animated, { Easing } from 'react-native-reanimated';
// 'TapGestureHandler' - Tap gestures detect one or more fingers touching the screen briefly. The fingers involved in these gestures must not move significantly from the initial touch points, and you can configure the number of times the fingers must touch the screen and allowable distance.
// 'State' - Each handler instance at any given time has an assigned state that can change when new touch events arrive or can be forced by the touch system to change its state in certain circumstances.
import { TapGestureHandler, State } from 'react-native-gesture-handler';

// 'Svg' - primary component wrapper
import Svg, {
    // Allows a raster image to be included in an Svg componenet.
    Image,
    Circle,
    // Allows us to "clip" elements into custom non-rectangular shapes
    ClipPath
    // package and module for creating svg shapes/objects
} from 'react-native-svg';
import * as Font from 'expo-font';
// 'AppLoading' - Useful tool to let you download and cache fonts, logos, icon images and other assets that you want to be sure the user has on their device for an optimal experience before rendering and they start using the app (so a loading screen)
import { AppLoading } from 'expo'
import * as Google from 'expo-google-app-auth'
//screen navigation handler 
import { NavigationActions } from 'react-navigation';
import axios from 'axios'
const { width, height } = Dimensions.get('window')
const {
    // a container for storing values
    Value,
    // takes an array of mappings and extracts values from each arg accordingly, then calls setValue on the mapped outputs
    event,
    // arrays of nodes that are being evaluated in a particular order and return the value of the last node
    block,
    cond,
    // Returns 1 if the value of both nodes are equal. Otherwise returns 0.
    eq,
    // performs an assignment operation from the sourceNode to valueToBeUpdated value node and also returns a node that represents this value
    set,
    // a special type of Animated.Value that can be updated in each frame to the timestamp of the current frame
    Clock,
    // will make Clock node passed as an argument start updating its value each frame. Then returns 0
    startClock,
    // will make Clock node passed as an argument stop updating its value (if it has been doing that). Then returns 0.
    stopClock,
    // logs the value of a node 
    debug,
    // Updates the given node by running timing based animation from a given position to a destination determined by toValue
    timing,
    // For a given Clock node, it returns 1 if the clock has been started (if it's updating each frame) or returns 0 otherwise
    clockRunning,
    // Maps an input value within a range to an output value within a range
    interpolate,
    Extrapolate,
    // Returns concatanation of given nodes (number or string) as string
    concat
} = Animated


//animation handler - this logic handles the incrementation/timing of the desired property from 0 to 1 or 1 to 0 (in this case the opactity)
function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0)
    };

    const config = {
        //animation will last 1 second 
        duration: 1000,
        toValue: new Value(0),
        //.inOut makes any easing function symmetrical
        //.ease provides a basic inertial animation
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

        //This function reacts to tap events on the sign-in button and fades the button away 
        this.onStateChange = event([
            {
                nativeEvent: ({ state }) =>
                    block([
                        cond(eq(state, State.END),
                            set(this.buttonOpacity, runTiming(new Clock(), 1, 0)))
                    ])
            }
        ])

        //This function reacts to tap events on the 'X' button and fades everything back in 
        this.onCloseState = event([
            {
                nativeEvent: ({ state }) =>
                    block([
                        cond(eq(state, State.END),
                            set(this.buttonOpacity, runTiming(new Clock(), 0, 1)))
                    ])
            }
        ])

        //animates the button to move in the Y direction 
        this.buttonY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [100, 0],
            extrapolate: Extrapolate.CLAMP
        })

        //animates the background to move in the Y direction 
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

        //rotation animation of the 'X' for the close button 
        this.rotateCross = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [180, 360],
            extrapolate: Extrapolate.CLAMP
        })

    }
    /*=====  End of portion that handles the screen animations  ======*/

    async componentDidMount() {
        await Font.loadAsync({
            'IndieFlower-Regular': require('../../assets/fonts/IndieFlower-Regular.ttf'),
        });
        this.setState({
            fontLoaded: true,
            isReady: true
        });
    }

    async setToken(user) {
        try {
            await AsyncStorage.setItem("userData", user)
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

                    /*=============================================
                    =    User signup/login into mongodb          =
                    =============================================*/
                    // using the returned authID, check if the user exsists within the mongoDB
                    axios.get(`https://obscure-springs-29928.herokuapp.com/date/find_user/${user_auth}`)
                        .then(results => {
                            //if the user exsists, the result will contain all of the users date data
                            if (results.data.length === 1) {
                                //pass the user data to the HomeScreen by going through each route until the destination route has been hit
                                this.props.navigation.navigate({
                                    //navigate to the 'App' router
                                    routeName: 'App',
                                    //The sub-action to run in the child router
                                    action: NavigationActions.navigate({
                                        routeName: 'Main',
                                        action: NavigationActions.navigate({
                                            routeName: 'Home',
                                            // Params to merge into the destination route
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
                                        //pass the user data to the HomeScreen by going through each route until the destination route has been hit
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
            //simple loading animation provided by expo 
            //disappears after compountDidMount() has been called 
            return <AppLoading />;
        } else {

            return (
                <KeyboardAvoidingView
                    style={{
                        flex: 1,
                        backgroundColor: 'black',
                        color: 'white',
                        justifyContent: 'flex-end'
                    }}
                    behavior="padding"
                    enabled
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'black',
                            justifyContent: 'flex-end'
                        }}>
                        <View
                            style={{
                                alignItems: 'center',
                                paddingBottom: '75%'
                            }}>
                            <Text style={styles.title}>Kindler</Text>
                        </View>
                        {/* "Animated.View" - Only animatable components can be animated (limited to 6). These unique components do the magic of binding the animated values to the properties, and do targeted native updates to avoid the cost of the react render and reconciliation process on every frame.  */}
                        <Animated.View
                            style={{
                                ...StyleSheet.absoluteFill,
                                transform: [{ translateY: this.bgY }]
                            }}>
                            <Svg
                                height={height + 50}
                                width={width}>
                                <ClipPath id='clip'>
                                    <Circle
                                        r={height + 50}
                                        cx={width / 2} />
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
                        <View
                            style={{
                                height: height / 3,
                                justifyContent: 'center'
                            }}>
                            <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                                <Animated.View
                                    style={{
                                        ...styles.button, opacity: this.buttonOpacity,
                                        transform: [{ translateY: this.buttonY }]
                                    }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN IN</Text>
                                </Animated.View>
                            </TapGestureHandler>
                            <Animated.View
                                style={{
                                    ...styles.button, backgroundColor: 'rgba(222, 82, 70, 0.75)',
                                    opacity: this.buttonOpacity,
                                    transform: [{ translateY: this.buttonY }]
                                }}>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        color: 'white'
                                    }}
                                    onPress={() => this._handleGoogleLogin()}
                                >SIGN IN WITH GOOGLE</Text>
                            </Animated.View>
                        </View>
                        <Animated.View
                            style={{
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
                                    <Animated.Text
                                        style={{
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
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 'bold'
                                    }}>SIGN IN</Text>
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