import React from 'react';
import {
    ScrollView,
    View,    
    Text,
    Button
} from 'react-native';
import GenrePicker from '../../components/GenreSelection';
import 'react-navigation';
// import { Button } from 'native-base';


export default function FoodSelection(props){
    return (
        <View>
          
          <ScrollView>
    
          <View>
          <Text>THIS IS THE MOVIE SELECTION SCREEN</Text>
            {/* <CuisinePicker /> */}
            <GenrePicker />
            <Button
                title="Next"
                onPress={()=>props.navigation.navigate('Event')}
            />
          </View>
    
          </ScrollView>
        </View>
      );
}