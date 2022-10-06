//This page is temporary until we decide on what page the user will be redirected to after login
import React, {useEffect, useState} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Button} from 'react-native'
import {Colors} from '../components/colors'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getUser = async() =>{
    const value = await AsyncStorage.getItem('userData');
    return value;
}

const TempLanding = ({navigation}) =>{
    const [userData, setUserData] = useState("No user data");
    const [loggedIn, setLoggedIn] = useState(true);
    useEffect(() =>{
        const getStoredUser = async() =>{
            const userDataStored = await AsyncStorage.getItem('userData');
            if(!userDataStored || userDataStored.length == 0){
                setLoggedIn(false);
            }
            setUserData(userDataStored);
        }
        getStoredUser();
    }, [])

    
    useEffect(()=>{
        const handleLogout = async() =>{
            await AsyncStorage.removeItem('userData');
            navigation.navigate("Login");
        }

        if(!loggedIn){
            handleLogout();
        }
    }, [loggedIn]);
    
    return(
        <View>
            <Text>
                {userData}
            </Text>
            <Button title='logout' onPress={() => setLoggedIn(false)}/>
        </View>
    );
}

export default TempLanding;