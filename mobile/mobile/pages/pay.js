import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, Pressable } from 'react-native';
import { TextInput, Menu, Button, Provider, Modal, Portal, IconButton  } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from 'react-native-paper';
import {useFonts,Poppins_700Bold,Poppins_600SemiBold,Poppins_500Medium} from '@expo-google-fonts/poppins';
import background from '../assets/background.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListItemTransaction from '../components/listItemTransaction';
import CurrencyInput from 'react-native-currency-input';
import DropDown from 'react-native-paper-dropdown';

const Pay = ({route,navigation}) =>{
    //state data
    const [amount, setAmount] = useState('0')
    const [category, setCategory] = useState()
    const [notes, setNotes] = useState('')
    
    //dropdown Setting
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    //End dropdown Setting



    let [fontsLoaded] = useFonts({Poppins_700Bold,Poppins_600SemiBold,Poppins_500Medium})
    if (!fontsLoaded) {
        return <Text>loading</Text>;
    }
    return(
        <>
        <View style={styles.container}>
            <Provider>
            <ImageBackground source={background} style={styles.background}>
                <View style={styles.header}>
                    <IconButton onPress={()=>{navigation.goBack()}} icon="chevron-left" color="white" size={40} style={{position:"absolute", left:0, top:26}}></IconButton>
                    <Image source={require('../assets/logoWhite.png')} style={styles.logo}></Image>
                </View>
                <View style={styles.amount}>
                    <Text style={{fontFamily:"Poppins_600SemiBold", fontSize:35, color:"white"}}>Rp </Text>
                    <CurrencyInput
                        value={amount}
                        autoFocus
                        selectionColor="white"
                        onChangeValue={setAmount}
                        delimiter="."
                        separator=","
                        precision={0}
                        style={{fontSize:38, color:"white", fontWeight:"bold",marginTop: -8}}
                        onChangeText={(formattedValue) => {
                            console.log(amount); // $2,310.46
                        }}
                        />
                </View>
                <View style={styles.content}>
                    <KeyboardAvoidingView behavior={"position"}>
                    <Text style={styles.judul}>Payment</Text>
                    <TextInput
                        label="Notes"
                        mode = "outlined"
                        value={notes}
                        onChangeText={setNotes}
                        style={{backgroundColor:"white"}}
                        left={<TextInput.Icon name="format-title"/>}
                    />
                    <Pressable onPress={showModal} style={{marginTop:15}}>
                        <TextInput
                            label="Category"
                            mode = "outlined"
                            value={category}
                            editable={false}
                            onFocus={showModal}
                            style={{backgroundColor:"white", }}
                            left={<TextInput.Icon name="cash-register"/>}
                        />
                    </Pressable>
                    {/* <TextInput
                        label="Notes"
                        mode = "outlined"
                        value={notes}
                        onChangeText={setNotes}
                        style={{backgroundColor:"white", marginTop: 15}}
                        left={
                            <TextInput.Icon
                            name="format-title" // where <Icon /> is any component from vector-icons or anything else
                            
                            />
                        }
                    /> */}
                    
                </KeyboardAvoidingView>
                </View>
            </ImageBackground>
            
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{margin:60, backgroundColor:"white", justifyContent:"center", padding:10, borderRadius:10}}>
                    <Menu.Item icon="trash-can" onPress={() => {setCategory("Iuran Sampah"); hideModal()}} title="Iuran Sampah" />
                    <Menu.Item icon="security" onPress={() => {setCategory("Iuran Keamanan"); hideModal()}} title="Iuran Keamanan" />
                    <Menu.Item icon="cash" onPress={() => {{setCategory("Iuran Kas"); hideModal()}}} title="Iuran Kas" />
                    <Menu.Item icon="cash-register" onPress={() => {{setCategory("Lain-Lain"); hideModal()}}} title="Lain-Lain" />
                    <Menu.Item icon="close" onPress={() => {hideModal()}} title="close" />
                </Modal>
            </Portal>
            </Provider>
        </View>
        <View>
            <Button mode="contained" onPress={()=>{navigation.navigate("Midtrans",{amount, notes, category})}} style={{borderRadius:0, paddingVertical:6}}>Pay</Button>
        </View>
        
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
      backgroundColor: '#ecf0f1',
    },
    content:{
        position:"relative",
        padding: 20,
        backgroundColor:"white", 
        width: "100%", 
        height:600,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    background: {
        width: "100%",
        position:"absolute",
        resizeMode: "cover",
        alignItems: 'center'
    },
    logo:{
        width: 120,
        height: 50
    },
    header:{
        width:"100%",
        flexDirection: "row",
        paddingTop: 40,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    amount:{
        marginTop: 20,
        marginBottom:50,
        flexDirection:"row",
        
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
    judul:{
        fontFamily:'Poppins_700Bold',
        fontSize: 30,
        color: "#867FEE",
        textAlign: "center"
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

export default Pay