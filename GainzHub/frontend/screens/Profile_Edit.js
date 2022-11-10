import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Button, FlatList, SafeAreaView} from 'react-native'
//import Slider from '@react-native-community/slider';
import {Colors} from '../components/colors'
import axios from 'axios';
import Toast from 'react-native-root-toast';
import { loginUser } from '../requests/userRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
//import CircularProgress from 'react-native-circular-progress-indicator';
//import "./reanimated2/js-reanimated/global";
// import CircularProgress from 'react-native-circular-progress-indicator';
//import * as Progress from 'react-native-progress'

const {maroon, black} = Colors;

const Profile_Edit = ({navigation}) =>{
    const [userData, setUserData] = useState("No user data");
    const [loggedIn, setLoggedIn] = useState(true);
    const [bio, setBio] = useState("");
    const isFocused = useIsFocused();

    return(
        <View style={[styles.root, {paddingLeft: 20}]}>
            <View style={{flexDirection:'row', textAlign:'center', paddingBottom: 10, flex:1}}>
                <View style = {{paddingRight:50}}>
                    <TouchableOpacity onPress={()=> navigation.pop()}>
                        <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                            Back
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 26, fontWeight:"800",color:maroon, textAlign: 'center', marginBottom:15}}>
                    Edit Your Profile
                </Text>
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

export default Profile_Edit;