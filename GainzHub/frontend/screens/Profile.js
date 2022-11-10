import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Button, SafeAreaView, FlatList, TouchableWithoutFeedback, StatusBar} from 'react-native'
//import Slider from '@react-native-community/slider';
import {Colors} from '../components/colors'
import axios from 'axios';
import Toast from 'react-native-root-toast';
import { loginUser } from '../requests/userRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import NutritionPlans from './NutritionPlans';
import NutritionNav from '../components/NutritionNav';
//import CircularProgress from 'react-native-circular-progress-indicator';
//import "./reanimated2/js-reanimated/global";
// import CircularProgress from 'react-native-circular-progress-indicator';
//import * as Progress from 'react-native-progress'

const {maroon, black} = Colors;

// Temporary image that we will change once we figure out aws
const IMAGE = "https://www.onlinearsenal.com/uploads/default/original/3X/7/7/7788236c1bed0a1e47eebe7aee96d0b0864ce385.jpeg";

const getUser = async() =>{
    const value = await AsyncStorage.getItem('userData');
    return value;
}

const Profile = ({navigation}) =>{
    const [userData, setUserData] = useState("No user data");
    const [loggedIn, setLoggedIn] = useState(true);
    const [bio, setBio] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const isFocused = useIsFocused();
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
    //console.log(userData);

    useEffect(() => {
        const getUserBio = async() =>{
            token = await AsyncStorage.getItem("userData");
    
            const response  = await axios.get('http://localhost:5001/user/getUserBio', {
                headers: {
                    'x-auth-token': token,
                }
            })
            setBio(response.data.bio);
        }
        getUserBio();
    }, [isFocused]);
    useEffect(() => {
        const getUserFirstName = async() =>{
            token = await AsyncStorage.getItem("userData");
    
            const response  = await axios.get('http://localhost:5001/user/getUserFirstName', {
                headers: {
                    'x-auth-token': token,
                }
            })
            setFirstName(response.data.firstName);
        }
        getUserFirstName();
    }, [isFocused]);
    useEffect(() => {
        const getUserLastName = async() =>{
            token = await AsyncStorage.getItem("userData");
    
            const response  = await axios.get('http://localhost:5001/user/getUserLastName', {
                headers: {
                    'x-auth-token': token,
                }
            })
            setLastName(response.data.lastName);
        }
        getUserLastName();
    }, [isFocused]);


    
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
                    Profile
                </Text>
            </View>
            <View style={{alignItems: 'center', paddingBottom: 10}}>
                <Image style={styles.image} source={{ uri: IMAGE }} />
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 24, fontWeight:"800",color:maroon, textAlign:'center', marginBottom:5}}>
                    FirstName LastName
                </Text>
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 20, fontWeight:"800",color:maroon, textAlign:'center', marginBottom:5}}>
                    Add A Bio!
                </Text>
            </View>
            <View style={{paddingBottom:15, alignItems:'center', paddingTop: 10}}>
                <TouchableOpacity onPress={()=> navigation.navigate('Profile_Edit')} style={[styles.TouchableOpacity]}>
                    <Text style={{fontFamily:"Inter-Medium", fontWeight:"500", fontSize: 16, color: "white"}}>
                        Edit Profile
                    </Text>
                </TouchableOpacity>
            </View>
         </View>
    );
}

const styles = StyleSheet.create({
    root:{
        padding: 30,
    },
    inputView:{
        height: 90,
        backgroundColor: "#F6F6F6",
        borderColor: "#e8e8e8",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10
    },
    inputText:{
        height: 30,
        marginRight: 30,
        padding: 10,
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        fontSize: 18,
        alignContent: 'center',
        textAlign: 'left',
        borderRadius: 8,
        width: 300
    },
    TouchableOpacity:{
        height:40,
        width:'50%',
        borderRadius: 15,
        backgroundColor: '#8D0A0A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 1000,
      },
});

export default Profile;