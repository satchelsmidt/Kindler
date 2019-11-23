import React from 'react';
import {
    ScrollView,
    View,    
    Text,
    Button
} from 'react-native';
// import CuisinePicker from '../../components/FoodSelection';
import 'react-navigation';
// import { Button } from 'native-base';


export default function FoodSelection(props){
    return (
        <View>
          
          <ScrollView>
    
          <View>
          <Text>THIS IS THE EVENT SELECTION SCREEN</Text>
            {/* <CuisinePicker /> */}
            <Button
                title="Next"
                onPress={()=>props.navigation.navigate('Final')}
            />
          </View>
    
          </ScrollView>
        </View>
      );
}