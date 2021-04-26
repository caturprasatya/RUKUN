import React, { useEffect, useState } from 'react';
import { Provider } from "react-redux";
import Home from './pages/home'
import Login from './pages/login'
import Notif from './pages/notif'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import {firebaseConfig} from './config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from 'firebase'
import Dashboard from './pages/dashboard';
import Chat from './pages/chat';
import Pay from './pages/pay';
import Midtrans from './pages/midtrans';

// firebase.initializeApp(firebaseConfig)

import store from './store'
import AddSuggestion from './pages/addSuggestion';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
const Stack = createStackNavigator();


export default function App() {
  const [isLogin, setIsLogin] = useState(null)
  async function getToken() {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      setIsLogin(true)
    }else{
      setIsLogin(false)
    }
  }
  
  useEffect(()=>{
    console.log("dari app");

    getToken()
    
  },[isLogin])

  if (isLogin === null) {
    return <Text>loading ...</Text>
  }

  return (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLogin ? "Dashboard":"Login"} screenOptions={{headerShown: false}} >
        
        {/* <Stack.Screen name="Notif" component={Notif} /> */}

        <Stack.Screen name="Login"  component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Chat"  component={Chat} options={{ headerShown: true }} />
        <Stack.Screen name="Pay" component={Pay} />
        <Stack.Screen name="Midtrans" component={Midtrans} />
        <Stack.Screen name="AddSuggestion" component={AddSuggestion} />
        
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
