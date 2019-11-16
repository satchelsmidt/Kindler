import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Google from 'expo-google-app-auth';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Has technology gone too far?</Text>
      <Text>Deron is Dum</Text>

    </View>
  );
}

async function signInWithGoogleAsync(){
  try{
    const result = await Google.logInAsync({
      androidClientId: '220715676294-6sqt060756ji445a4ru0q10gkteamqbv.apps.googleusercontent.com',
      iosClientId: '220715676294-o3v7hl5mj6l0rd4ubjvbfia9h02jb6hb.apps.googleusercontent.com',
      scopes: ['profile', 'email']
    });

    if(result.type === 'success'){
      return result.accessToken;
    }else{
      return {cancelled: true};
    }
  } catch(e){
    return {error: true};
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
