import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import {useFonts,Poppins_700Bold,Poppins_600SemiBold,Poppins_500Medium} from '@expo-google-fonts/poppins';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux'

const ListItemMyTransaction = (props)=>{
    return (
        <View style={styles.list}>
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", padding:5, width:"100%"}}>
                <View style={{flexDirection:"row", alignItems:"center", padding:5}}>
                    <Icon name="tag" style={{fontSize:40, paddingLeft:5, paddingRight: 14, color:"grey"}}></Icon>
                    <View>
                        <Text style={{fontFamily:"Poppins_600SemiBold", fontSize: 20}}>Iuran Sampah</Text>
                        <Text style={{fontFamily:"Poppins_500Medium", marginTop:-5}}>By Fadho</Text>
                    </View>
                </View>
                <Text style={{fontFamily:"Poppins_500Medium"}}>Rp 200.000</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    list : {
        flexDirection: "row",
        backgroundColor: "white",
        padding: 10,
        marginTop:10,
        borderRadius: 10,
        alignItems:"center"
    }
})
export default ListItemMyTransaction