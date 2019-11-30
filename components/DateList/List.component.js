import React from "react";
import { List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';

//used for the date/activity viewing scheme 
let ListOfItems = props => {
    return (
        <List>
            <ListItem thumbnail>
                <Left>
                    <Thumbnail square
                        source={props.pic}
                        style={{ width: 75, height: 75 }}
                    />
                </Left>
                <Body>
                    <Text numberOfLines={1}>{props.title}</Text>
                    <Text note numberOfLines={2}>{props.description}</Text>
                </Body>
                <Right>
                    <Button onPress={props.nav} transparent>
                        <Text>View</Text>
                    </Button>
                </Right>
            </ListItem>
        </List >
    )
}

export default ListOfItems