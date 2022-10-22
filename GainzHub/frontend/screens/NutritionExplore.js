import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Button, FlatList, SafeAreaView} from 'react-native'
//import Slider from '@react-native-community/slider';
import {Colors} from '../components/colors'
import axios from 'axios';
import Toast from 'react-native-root-toast';
import { loginUser } from '../requests/userRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import NutritionNav from '../components/NutritionNav';
import { ScrollView } from 'react-native-gesture-handler';
import MealPlanItem from '../components/MealPlanItem';

const {maroon, black} = Colors;

const NutritionExplore = ({navigation}) => {
    console.log("Er")
    return(
        <View style={[styles.root, {paddingLeft: 20}, {flex:1}]}>
            <View style={{flexDirection:'row', justifyContent:'left', paddingBottom: 5}}>
                <View style = {{paddingRight: 50}}>
                    <TouchableOpacity onPress={()=> navigation.pop()}>
                        <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                            Back
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 30, fontWeight:"800",color:maroon, textAlign:'center', marginBottom:10}}>
                    Test
                </Text>
            </View>
            <NutritionNav navigation={navigation}/>
        </View>
    )
}
const styles = StyleSheet.create({
    root:{
        padding: 30,
    },
   
});

export default NutritionExplore;