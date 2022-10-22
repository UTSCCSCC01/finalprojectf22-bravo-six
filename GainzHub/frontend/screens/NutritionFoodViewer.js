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

const NutritionFoodViewer = ({route, navigation: { goBack }}) => {
    const food = route.params.item;
    //console.log(mealPlan);
    return(
        <View style={[styles.root, {paddingLeft: 20}]}>
            <View style={{flexDirection:'row', justifyContent:'left', paddingBottom: 10}}>
                <View style = {{paddingRight: 50}}>
                    <TouchableOpacity onPress={()=> goBack()}>
                        <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                            Back
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 36, fontWeight:"800",color:black, textAlign:'center', marginBottom:30}}>
                    {food.foodName ? food.foodName : '[No Name Given]'}
                </Text>
            </View>

            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 24, fontWeight:"800",color:black, textAlign: 'center', marginBottom:10}}>
                    Calories: {food.foodCalories ? food.foodCalories : '[No Calories Given]'}
                </Text>
            </View>

            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 24, fontWeight:"800",color:black, textAlign: 'center', marginBottom:10}}>
                    Protein: {food.foodProtein ? food.foodProtein + ' g' : '[No Protein Given]'}
                </Text>
            </View>  

            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 24, fontWeight:"800",color:black, textAlign: 'center', marginBottom:10}}>
                    Fat: {food.foodFat ? food.foodFat + ' g' : '[No Fat Given]'}
                </Text>
            </View>

            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 24, fontWeight:"800",color:black, textAlign: 'center', marginBottom:10}}>
                    Carbohydrates: {food.foodCarbs ? food.foodCarbs + ' g' : '[No Carbs Given]'}
                </Text>
            </View>

            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 24, fontWeight:"800",color:black, textAlign: 'center', marginBottom:10}}>
                    Sugar: {food.foodSugar ? food.foodSugar + ' g' : '[No Sugar Given]'}
                </Text>
            </View>

            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 24, fontWeight:"800",color:black, textAlign: 'center', marginBottom:10}}>
                    Sodium: {food.foodSodium ? food.foodSodium + ' g' : '[No Sodium Given]'}
                </Text>
            </View>

        </View>
    );

}

const styles = StyleSheet.create({
    root:{
        padding: 30
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
    inputTextRow:{
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

export default NutritionFoodViewer;