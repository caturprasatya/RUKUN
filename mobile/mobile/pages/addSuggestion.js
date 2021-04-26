import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, Pressable } from 'react-native';
import { TextInput, Menu, Button, Provider, Modal, Portal, IconButton, Surface, Chip, FAB  } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from 'react-native-paper';
import {useFonts,Poppins_700Bold,Poppins_600SemiBold,Poppins_500Medium} from '@expo-google-fonts/poppins';
import background from '../assets/background.png';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddSuggestion = ({route,navigation}) =>{
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
                
                <View style={styles.content}>
                    <Text style={styles.judul}>Add Suggestion</Text>
                    <TextInput
                        label="Notes"
                        mode = "outlined"
                        value={notes}
                        onChangeText={setNotes}
                        style={{backgroundColor:"white"}}
                        left={<TextInput.Icon name="format-title"/>}
                    />
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
            <Button mode="contained" onPress={()=>{}} style={{borderRadius:0, paddingVertical:6}}>Submit</Button>
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
        paddingBottom:10,
        paddingHorizontal: 10,
    },
    card:{
        marginTop: 10,
        elevation:9,
        borderRadius: 20,
        padding: 10
    },
    judul:{
        fontFamily:'Poppins_700Bold',
        fontSize: 30,
        color: "#867FEE",
        textAlign: "center"
    }


    
});

export default AddSuggestion