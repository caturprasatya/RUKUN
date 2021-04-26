import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { WebView } from 'react-native-webview';

const Midtrans = ({route}) =>{
    const { amount, category, notes} = route.params;
    return(
        <WebView style={{marginTop:30}}
            onNavigationStateChange={(e)=>{console.log(e)}}
            source={{ 
                uri: 'http://192.168.100.104:3000/midtrans',
                method: "POST",
                body: `amount=${amount}&category=${category}&notes=${notes}&username=fadhoo`
            }
        } />
    )
}

export default Midtrans