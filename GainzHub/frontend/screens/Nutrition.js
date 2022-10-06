import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Button} from 'react-native'
//import Slider from '@react-native-community/slider';
import {Colors} from '../components/colors'
import axios from 'axios';
import Toast from 'react-native-root-toast';
import { loginUser } from '../requests/userRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
//import CircularProgress from 'react-native-circular-progress-indicator';
//import "./reanimated2/js-reanimated/global";
// import CircularProgress from 'react-native-circular-progress-indicator';
//import * as Progress from 'react-native-progress'

const {maroon, black} = Colors;

const getUser = async() =>{
    const value = await AsyncStorage.getItem('userData');
    return value;
}

const Nutrition = ({navigation}) =>{
    const [userData, setUserData] = useState("No user data");
    const [loggedIn, setLoggedIn] = useState(true);
    const [caloriesAte, setCaloriesAte] = useState(0);
    const [calorieGoal, setCalorieGoal] = useState(2000);
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

    const getStoredGoal = () => {
        setCalorieGoal(AsyncStorage.getItem('calorieGoal'));
        setCaloriesAte(AsyncStorage.getItem('caloriesAte'));
    }

    return(
        <View style={[styles.root, {paddingLeft: 20}]}>
            <View style={{flexDirection:'row', justifyContent:'left', paddingBottom: 5}}>
                <View style = {{paddingRight: 50}}>
                    <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                        <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                            Back
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 30, fontWeight:"800",color:maroon, textAlign:'center', marginBottom:10}}>
                    Nutrition
                </Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom:20, textAlign:'center'}}>
                <TouchableOpacity onPress={()=> navigation.navigate('Nutriton')} style={{paddingLeft: 40}} >
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                       Daily
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('Nutriton_Plans')} style={{paddingLeft: 70}} >
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                       Plans
                    </Text>
                </TouchableOpacity> 
                <TouchableOpacity onPress={()=> navigation.navigate('Nutriton_Explore')} style={{paddingLeft: 60}} >
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                        Explore
                    </Text>
                </TouchableOpacity> 
            </View>

            <View style={[{marginBottom:20}, {textAlign: 'center'}, {alignItems: 'center'}]}>
                <Text style={{fontFamily: 'Inter-Medium', fontWeight: '600', fontSize: 20}}> Calorie Goal: {calorieGoal}</Text>
                <Progress.Bar progress={caloriesAte/calorieGoal} width={300} height={10}/>
                <Text style={{paddingLeft: -30}}> Progress {caloriesAte} / {calorieGoal} </Text>
            </View>

            <View>
                <TouchableOpacity onPress={()=> navigation.navigate('CalorieCalculator')} style={{textAlign:'center', marginBottom: 20}} >
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                        Calculate Your Calories Here!
                    </Text>
                </TouchableOpacity> 
            </View>

            <View style={{paddingLeft: 5}}>
                <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:25, color:black, marginBottom:20}}>
                        Food Log
                </Text>
            </View>

            <View>
            <Button
                onPress={() => navigation.navigate('Nutrition_AddFood')}
                style={{textAlign:'center'}}
                title="Add Food"
                color = 'maroon'
            />
            </View>
            

        </View>
    );
}

const styles = StyleSheet.create({
    root:{
        padding: 30,
    },
    inputView:{
        height: 45,
        backgroundColor: "#F6F6F6",
        borderColor: "#e8e8e8",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
    },
    inputText:{
        height: 50,
        flex: 1,
        marginLeft: 10,
        padding: 10,
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        fontSize: 16,
    },
    TouchableOpacity:{
        height:51,
        width:343,
        borderRadius: 30,
        backgroundColor: '#8D0A0A',
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default Nutrition;