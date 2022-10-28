import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Button} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

const PublishedMeal = ({mealPlanId, navigation}) => {
    const [obj, setObj] = useState({planName: "", published: false});
    const [user, setUser] = useState({username: ""})
    const isFocused = useIsFocused();
    
    useEffect(()=>{
        async function getMealFromDb(){
            console.log(mealPlanId);
            const mealPlanObj = await axios.get("http://localhost:5001/nutrition/getMealPlan", {params:{mealPlanId: mealPlanId}});
            setObj(mealPlanObj.data);
            const token = mealPlanObj.data.userId;
            const userInfo = await axios.get("http://localhost:5001/user/getUser", {
                headers: {
                    'x-auth-token': token,
                }
            })
            setUser(userInfo.data);
        }

        getMealFromDb();
    }, [isFocused])

    return (
        <View style={[{flexDirection: 'row'}, {display: 'flex'}, {justifyContent: 'space-between'}, {paddingHorizontal: 5}]}>
            
            <TouchableOpacity onPress={()=> navigation.navigate('NutritionMealPlanInfo', {obj})} style={[styles.inputView, {width: '75%'}]}>
                <Text style={styles.inputText}>{obj.planName}</Text>
                <Text style={styles.inputText}>
                    Creator: {user.username}
                </Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={()=> console.log("Pressed")} style={[styles.TouchableOpacityList]} >
                <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:14, color: "white"}}>
                    Add to List
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
        padding: 10,
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