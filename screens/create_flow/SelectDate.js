import React from 'react';
import {
    ScrollView,
    View,    
    Text,
    Button
} from 'react-native';
import DatePickerExample from '../../components/DateSelection';
import 'react-navigation';
// import { Button } from 'native-base';

export default function DateSelection(props){
    return (
        <View>
          
          <ScrollView>
    
          <View>
              <Text>THIS IS THE DATE SELECTION SCREEN</Text>
            <DatePickerExample />
            <Button
                title="Next"
                onPress={()=>props.navigation.navigate('Food')}
            />
          </View>
    
          </ScrollView>
        </View>
      );
}