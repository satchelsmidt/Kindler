import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
  Text,
  View,
  AsyncStorage
} from 'react-native';
import 'react-navigation';
import SignOutButton from '../../navigation/SignOut';
import { ScrollView } from 'react-native-gesture-handler';

export default function SettingsScreen(props) {

  _signOutAsync = async () => {
    try {
      const asyncStorageKeys = await AsyncStorage.getAllKeys();
      if (asyncStorageKeys.length > 0) {
        AsyncStorage.clear();
      }
      console.log("reached this stage")
      // await AsyncStorage.clear();
      props.navigation.navigate('Auth')
    } catch (err) {
      console.log(err)
    }
  }
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */

  return (
    <View>
      <ScrollView>
        <View>
          <SignOutButton navigation={this._signOutAsync} />
        </View>
      </ScrollView>

    </View>

    // <ExpoConfigView />;
  )
}

SettingsScreen.navigationOptions = {
  title: 'app.json',
};
