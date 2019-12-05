import React from "react";
import { List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, Card, CardItem } from 'native-base';
import { StyleSheet, View } from 'react-native';

//used for the date/activity viewing scheme 
let ListOfItems = props => {
    return (

        <List>
            <Card style={{...styles.card, backgroundColor: props.colorChange2}}>
                <ListItem thumbnail>
                    <Left>
                        <Thumbnail circle
                            source={props.pic}
                            style={styles.img}
                        />
                    </Left>
                    <Body>
                        <Text numberOfLines={1} style={{ fontWeight: 'bold' }}>{props.title}</Text>
                        <Text note numberOfLines={2} style={{ color: 'white' }}>{props.description} </Text>
                    </Body>
                    <Right>
                        <View style={{ ...styles.mainIcon, backgroundColor: props.colorChange }}>
                            <Button onPress={props.nav} transparent>
                                {/* <Text>View</Text> */}
                                <Icon type={props.type} name={props.icon} style={{ ...styles.subIcon, fontSize: props.iconSize }} />
                                {/* <Icon ios='arrow-right-circle' android="rightcircleo" style={{ fontSize: 35 }} /> */}
                            </Button>
                        </View>
                    </Right>
                </ListItem>
            </Card>
        </List >

    )
}

export default ListOfItems

const styles = StyleSheet.create({
    mainIcon: {
        // backgroundColor: '#13ff8a',
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 5
        // zIndex: -1,
    },
    subIcon: {
        // fontSize: 16,
        color: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'white',
        shadowOpacity: 0.1,
        elevation: 5,
        marginLeft: '1%',
        marginRight: '1%'
    },
    card: {
        marginHorizontal: 20,
        borderRadius: 35,
        // backgroundColor: 
    },
    img: {
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        // elevation: 5
    }
})