import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar, Button } from 'react-native-paper';
import {useFonts,Poppins_700Bold,Poppins_600SemiBold,Poppins_500Medium} from '@expo-google-fonts/poppins';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListItemTransaction from '../components/listItemTransaction';
import { setTransactionsAsync } from '../store/actions/transactions'
import AsyncStorage from '@react-native-async-storage/async-storage';



const Home = ({route,navigation}) =>{
    const dispatch = useDispatch()
    const { transactions } = useSelector(state => state.transactionsReducer)
    const { desa } = useSelector(state => state.desaReducer)

    const clearAsyncStorage = async() => {
        await AsyncStorage.clear();
    }
    
    useEffect (()  => {
        dispatch(setTransactionsAsync())
        console.log(transactions, "<<<<transactions")
    }, [])

    let [fontsLoaded] = useFonts({Poppins_700Bold,Poppins_600SemiBold,Poppins_500Medium})
    if (!fontsLoaded) {
        return <Text>loading</Text>;
    }
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/logoBlue.png')} style={styles.logo}></Image>
                <Avatar.Text  size={37} label="NA" />
            </View>
            <LinearGradient colors={['#e0c3fc', '#8ec5fc']} style={styles.card}>
                <Image source={require('../assets/test.png')} style={styles.ilustrasi}></Image>
                <View style={{flexDirection:"column",justifyContent:"space-between", height: "100%"}}>
                    <Text style={styles.desaName}>{desa.name}</Text>
                    <View>
                        <Text style={styles.judulSaldo}>Saldo</Text>
                        <Text style={styles.saldo}> Rp {desa.balance?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>

                    </View>
                </View>
            </LinearGradient>
            <View style={styles.buttonContainer}>
                <Button onPress={()=>{navigation.navigate("Pay")}} mode="contained" style={{flexGrow: 1, marginRight: 10}}>Pay</Button>
                <Button onPress={()=>{clearAsyncStorage()}} mode="contained" style={{paddingTop:0}}>
                    <Icon name="commenting-o" style={{fontSize:20}}></Icon>
                </Button>
            </View>
            <View style={{marginTop:15, height:400}}>
                <Text style={{...styles.desaName, color:"#665EDC"}}>Transaction</Text>
                <ScrollView>
                    {console.log(transactions,"wakwaw")}
                    {transactions?.map(transaction => 
                        <ListItemTransaction transaction={transaction} key={transaction.id}/>
                    )}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
      paddingHorizontal: 10,
      backgroundColor: '#ecf0f1',
    },
    logo:{
        width: 120,
        height: 50
    },
    header:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    card:{
        marginTop: 10,
        backgroundColor: "red",
        width : "100%",
        height : 200,
        borderRadius: 20,
        padding: 10
    },
    desaName:{
        fontFamily:'Poppins_700Bold',
        fontSize: 25,
        color: "white",
    },
    judulSaldo:{
        fontFamily:'Poppins_600SemiBold',
        fontSize: 20,
        color: "white",
        paddingLeft: 6,
        marginBottom: -8,
    },
    saldo:{
        fontFamily:'Poppins_600SemiBold',
        fontSize: 30,
        color: "white",
    },
    ilustrasi :{
        position: "absolute",
        bottom: 25,
        right :20,
        width: 120,
        height: 100,
        opacity: 0.5
    },
    buttonContainer : {
        flexDirection: "row",
        marginTop: 10
    }
    
});

export default Home