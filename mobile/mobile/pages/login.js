import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import logo from '../assets/logins.png';
import logoRukun from '../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/actions/user'


const Login = ({route, navigation}) =>{
    const dispatch = useDispatch()
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = ()=>{
        dispatch(login(navigation,username,password))
        // navigation.navigate("Dashboard");
    }

    return(
        <View style={styles.container}>
            <ImageBackground source={logo} style={styles.image}>
                <Image source={logoRukun} style={{height:150, width: 150, marginTop: 100}}></Image>
                <View style={{width: "100%", paddingHorizontal: 30}}>
                    <TextInput
                        label="Email"
                        mode = "outlined"
                        value={username}
                        onChangeText={username => setUsername(username)}
                        style={{backgroundColor:"white"}}
                        left={
                            <TextInput.Icon
                            name="account" // where <Icon /> is any component from vector-icons or anything else
                            onPress={() => {}}
                            />
                        }
                    />
                </View>
                <View style={{width: "100%", paddingHorizontal: 30, marginTop: 10}}>
                    <TextInput
                        label="Password"
                        mode = "outlined"
                        value={password}
                        onChangeText={password => setPassword(password)}
                        style={{backgroundColor:"white"}}
                        secureTextEntry={true}
                        left={
                            <TextInput.Icon
                            name="lock-outline" 
                            onPress={() => {}}
                            />
                        }
                    />
                </View>
                <View style={{width: "100%", paddingHorizontal: 30, marginTop: 10}}>
                    <Button mode="contained" style={{height:50, justifyContent: 'center'}} onPress={()=>{handleSubmit()}}>Login</Button>
                </View>
                <View style={{width: "100%", paddingHorizontal: 30, marginTop: 10, alignItems: "center"}}>
                    <Text>Dont have an account ? create</Text>
                </View>
            </ImageBackground>
            

            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'blue',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: "100%",
        resizeMode: "cover",
        alignItems: 'center'
      },
});

export default Login