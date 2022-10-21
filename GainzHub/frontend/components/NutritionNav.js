import React from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Button} from 'react-native'
import {Colors} from '../components/colors'
import { useRoute } from '@react-navigation/native';

const {maroon, black} = Colors;

const NutritionNav = ({navigation}) =>{
    const route = useRoute();
    const handleDailyClick = () =>{
        navigation.navigate('Daily');
    }

    const handlePlanClick = () =>{
        navigation.navigate('Plan');
    }

    return (
    <View style={{flexDirection: 'row', marginBottom:20, textAlign:'center'}}>
        <TouchableOpacity onPress={()=> handleDailyClick()} style={{paddingLeft: 40}} >
            <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                Daily
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> { handlePlanClick()}} style={{paddingLeft: 70}} >
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
    );
}

export default NutritionNav;