import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, TouchableWithoutFeedback, StatusBar} from 'react-native'
import {Colors} from '../components/colors'
import axios from 'axios';
import Toast from 'react-native-root-toast';
import { loginUser } from '../requests/userRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import { TextInput , Button} from "react-native-paper";
import { registerPost } from '../requests/SocialRequest';

import ErrorMSG from '../components/ErrorMsg';

const {maroon, black} = Colors;
const Tab = createBottomTabNavigator();

const getUser = async() =>{
    const value = await AsyncStorage.getItem('userData');
    return value;
}

const SocialCreate = ({navigation}) =>{
    const [PostMessage, setPost] = useState("");
    const [userId, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(true);

    const [formErrors, setFormErrors] = useState({"PostMessage": ""})

    
    const CheckName = async() => {
        const jwtToken = await AsyncStorage.getItem("userData");
        const currentUser = await axios.get("http://localhost:5001/user/getUserSecure", {
            headers: {
                'x-auth-token': jwtToken,
            }
        })
        setUser(currentUser.data.username.toString());
    }

    const addPost = async() => {
        let currFormErrors = {"PostMessage": ""};
        if(PostMessage.length == 0){
            currFormErrors['PostMessage'] = 'Nothing Yet ?';
        }
        setFormErrors(currFormErrors);
        const checkAllEmpty = Object.entries(currFormErrors).reduce((a,b) => a[1].length > b[1].length ? a : b)[1];
        if(checkAllEmpty.length != 0){
            let allErrorMessages = Object.entries(currFormErrors).map(x => x[1]).join("\n");
            allErrorMessages = allErrorMessages.trim();
            Toast.show(allErrorMessages, {
                duration: Toast.durations.SHORT,
            });
            return;
        }
        await CheckName();
        
        console.log(PostMessage);
        const userData = {
            userId,
            PostMessage
        }
        console.log(PostMessage);
        try{
            const data = await registerPost(userData);
            console.log(data);
            if(data && data.status != 200){
                Toast.show(data.data.errors, {
                    duration: Toast.durations.SHORT,
                });
            }
            else{
                Toast.show("Posted!", {
                    duration: Toast.durations.SHORT,
                });
                //navigation.navigate("Login");
            }
        } catch(e){
            console.log(e);
        }
    }
    useEffect(()=>{
        const handleLogout = async() =>{
            await AsyncStorage.removeItem('userData');
            navigation.navigate("Login");
        }

        if(!loggedIn){
            handleLogout();
        }
    }, [loggedIn]);

    return (
        <View style={[styles.root, {paddingLeft: 20}, {flex:1}]}>
            <View style={{flexDirection:'row', justifyContent:'left', paddingBottom: 5}}>
                <View style = {{paddingRight: 50}}>
                    <TouchableOpacity onPress={()=> setLoggedIn(false)}>
                        <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 30, fontWeight:"800",color:maroon, textAlign:'center', marginBottom:10}}>
                    Social
                </Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom:20, textAlign:'center', paddingHorizontal:30, justifyContent:'space-between'}}>
                <TouchableOpacity onPress={()=> navigation.navigate('SocialHome')}>
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                       Home
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('SocialExplore')}>
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                       Explore
                    </Text>
                </TouchableOpacity> 
                <TouchableOpacity onPress={()=> navigation.navigate('SocialCreate')}>
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16, color:maroon}}>
                        Create
                    </Text>
                </TouchableOpacity> 
            </View>
            <View>
                <TextInput
                    maxLength={150}
                    multiline
                    editable
                    numberOfLines={4}
                    label="Say your mind,"
                    onChangeText={(val) => setPost(val)}
                    activeUnderlineColor="red"
                />
                <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:10, color:maroon,  textAlign:'right', padding:8}}>
                    Characters Left:{PostMessage.length}/150
                </Text>
            </View>
            <View>
                <Button
                    style={styles.centerButton}
                    mode="outlined"
                    onPress={addPost}>
                    Post
                </Button>
            </View>
    </View>
    );
}

const styles = StyleSheet.create({
    root:{
        padding: 30
    },
    input:{
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 10,
        width:200,

    },
    inputView:{
        height: 45,
        backgroundColor: "#FFFFFF",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        alignContent: 'center'
    },
    centerButton:{
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    inputText:{
        height: 30,
        flex: 1,
        marginRight: 30,
        padding: 10,
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        fontSize: 14,
        alignContent: 'center',
        textAlign: 'left',
        borderRadius: 8,
        width: '100%'

    },
    inputViewRow:{
        height: 45,
        backgroundColor: "#FFFFFF",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        alignContent: 'center'
    },
    ButtonSection: {
        maxWidth: '100px', maxHeight: '100px',fontFamily: "Inter-Medium", marginCenter: "auto" 
     },
    inputTextRow:{
        height: 30,
        flex: 1,
        marginRight: 30,
        padding: 10,
        fontFamily: "Inter-Medium",
        fontWeight: "900",
        fontSize: 14,
        alignContent: 'center',
        textAlign: 'left',
        borderRadius: 8,
        width: '100%'

    },
    TouchableOpacity:{
        height:25,
        width:'100%',
        borderRadius: 30,
        marginTop: 20,
        backgroundColor: '#8D0A0A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width:'70%',
        marginBottom: 20,
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        fontSize: 16,
        backgroundColor: "#F6F6F6",
        borderColor: "#e8e8e8"

    }
});

export default SocialCreate;