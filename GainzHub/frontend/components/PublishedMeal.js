import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Button} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

const PublishedMeal = ({mealPlanId, navigation}) => {
    const [obj, setObj] = useState({planName: "", published: false});
    const [user, setUser] = useState({username: ""})
    const isFocused = useIsFocused();
    //console.log(mealPlanId);
    
    useEffect(()=>{
        async function getMealFromDb(){
            console.log(mealPlanId);
            //console.log("help");
            const mealPlanObj = await axios.get("http://localhost:5001/nutrition/getMealPlan", {params:{mealPlanId: mealPlanId}});
            setObj(mealPlanObj.data);
        }

        getMealFromDb();
    }, [isFocused])
    
    useEffect(()=>{
        async function getUser(){
            const token = await AsyncStorage.getItem("userData");
            console.log(token);
            const userInfo = await axios.get("http://localhost:5001/user/getUser", {
                headers: {
                    'x-auth-token': token,
                }
            })
            console.log(userInfo);
            setUser(userInfo.data);
        }
        getUser();
    }, [])

    return (
        <View style={[{flexDirection: 'row'}, {display: 'flex'}, {justifyContent: 'space-between'}, {paddingHorizontal: 5}]}>
            
            <TouchableOpacity onPress={()=> navigation.navigate('NutritionMealPlanInfo', {obj})} style={[styles.inputView, {width: '60%'}]}>
                <Text style={styles.inputText}>{obj.planName}</Text>
                <Text style={styles.inputText}>
                    Creator: {user.username}
                </Text>
                <Text style={styles.inputText}>
                    Review: {Number(obj.review).toFixed(2)}
                </Text>
            </TouchableOpacity>

            
            <TouchableOpacity onPress={()=> console.log("Pressed")} style={[styles.TouchableOpacityList, {flex:1}]} >
                <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:14, color: "white"}}>
                    Add to List
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> navigation.navigate('ReviewMealPlan', {obj})} style={[styles.TouchableOpacityList, {flex:1}]} >
                <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:14, color: "white"}}>
                    Review 
                </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    inputView:{
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20
    },    
    inputText:{
        height: 30,
        flex: 1,
        marginRight: 30,
        padding: 4,
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        fontSize: 18,
        alignContent: 'center',
        textAlign: 'left',
        borderRadius: 8,
        width: '100%'
    },  
    TouchableOpacityList:{
        height:35,
        width:'23%',
        borderRadius: 30,
        marginTop: 8,
        backgroundColor: '#8D0A0A',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
export default PublishedMeal;