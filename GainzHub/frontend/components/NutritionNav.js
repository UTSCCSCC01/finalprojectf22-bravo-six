import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Button} from 'react-native'
import {Colors} from '../components/colors'
import { useRoute, useIsFocused } from '@react-navigation/native';

const {maroon, black} = Colors;

const NutritionNav = ({navigation}) =>{
    const route = useRoute();
    const [btnColors, setBtnColors] = useState({daily: maroon, plans: black, explore: black});
    const isFocused = useIsFocused();

    useEffect(()=>{
        let newColors = {daily: black, plans: black, explore: black};
        const currentRouteName = route.name;
        switch(currentRouteName){
            case "Daily":
                newColors.daily=maroon;
                break;
            case "Plan":
                newColors.plans = maroon;
                break;
            case "Explore":
                newColors.explore = maroon;
                break;
            default:
                break;
        }
        setBtnColors(newColors);
    }, []);

    const handleDailyClick = () =>{
        navigation.navigate('Daily');
    }

    const handlePlanClick = () =>{

        navigation.navigate('Plan');
    }

    const handleExploreClick = () =>{
        navigation.navigate('Explore');
    }

    return (
    <View style={{flexDirection: 'row', marginBottom:20, textAlign:'center'}}>
        <TouchableOpacity onPress={()=> handleDailyClick()} style={{paddingLeft: 40}} >
            <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16, color:btnColors.daily}}>
                Daily
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> handlePlanClick()} style={{paddingLeft: 70}} >
            <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16, color:btnColors.plans}}>
                Plans
            </Text>
        </TouchableOpacity> 
        <TouchableOpacity onPress={()=> handleExploreClick()} style={{paddingLeft: 60}} >
            <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16, color:btnColors.explore}}>
                Explore
            </Text>
        </TouchableOpacity> 
    </View>
    );
}

export default NutritionNav;