import React from "react";
import { List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, Card, CardItem } from 'native-base';
import { StyleSheet, View } from 'react-native';

//used for the date/activity viewing scheme 
let ListOfItems = props => {
    return (

        <List>
            <Card style={{ ...styles.card, backgroundColor: props.colorChange2 }}>
                <ListItem thumbnail containerStyle={{ borderBottomColor: 'transparent', borderBottomWidth: 0 }} style={{ borderBottomWidth: 0, borderBottomColor: 'transparent' }}>
                    <Left style={{ borderBottomWidth: 0, borderBottomColor: 'transparent' }}>
                        <Thumbnail circle
                            source={props.pic}
                            style={styles.img}
                        />
                    </Left>
                    <Body style={{ borderBottomWidth: 0, borderBottomColor: 'transparent' }}>
                        <Text numberOfLines={1} style={{ fontWeight: 'bold' }}>{props.title}</Text>
                        <Text note numberOfLines={2} style={{ color: 'white' }}>{props.description} </Text>
                    </Body>
                    <Right style={{ borderBottomWidth: 0, borderBottomColor: 'transparent' }}>
                        <View style={{ ...styles.mainIcon, backgroundColor: props.colorChange }}>
                            <Button onPress={props.nav} transparent>
                                <Icon type={props.type} name={props.icon} style={{ ...styles.subIcon, fontSize: props.iconSize }} />
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
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 5,
        opacity: 0.9,
        borderTopRightRadius: 70,
        borderBottomLeftRadius: 70
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
        opacity: 0.8,
        borderTopRightRadius: 70,
        borderBottomLeftRadius: 70
        // backgroundColor: 
    },
    img: {
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        // elevation: 5
    }
})