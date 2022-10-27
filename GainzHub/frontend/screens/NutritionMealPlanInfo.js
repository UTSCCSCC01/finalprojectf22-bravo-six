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

const NutritionMealPlanInfo = ({route, navigation}) => {
    const [mealPlan, setMealPlan] = useState({});
    //const mealPlan = route.params.obj;
    //console.log(mealPlan);

    useEffect(() =>{
        setMealPlan(route.params.obj);
    });
    console.log(mealPlan)
    return(
        <View style={[styles.root, {paddingLeft: 20}]}>
            <View style={{flexDirection:'row', textAlign:'left', paddingBottom: 10}}>
                <View>
                    <TouchableOpacity onPress={()=> navigation.pop()}>
                        <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                            Back
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 36, fontWeight:"800",color:maroon, textAlign:'center', marginBottom:10}}>
                    Meal Plan: {mealPlan.planName}
                </Text>
            </View>

            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 24, fontWeight:"800",color:black, textAlign: 'center', marginBottom:10}}>
                    Total Calories: {mealPlan.breakfastCalories + mealPlan.lunchCalories + mealPlan.dinnerCalories + mealPlan.snackCalories}
                </Text>
            </View>

            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 24, fontWeight:"800",color:black, textAlign: 'center', marginBottom:10}}>
                    Total Protein: {mealPlan.breakfastProtein + mealPlan.lunchProtein + mealPlan.dinnerProtein + mealPlan.snackProtein} g
                </Text>
            </View>  

            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 20, fontWeight:"800",color:black, textAlign: 'left', marginBottom:10}}>
                    Breakfast
                </Text>
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign: 'left', marginBottom:10, paddingLeft: 20}}>
                    Meal: {mealPlan.breakfastMeal ? mealPlan.breakfastMeal : 'No food included'}
                </Text>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign: 'left', marginBottom:10, paddingLeft: 20}}>
                    Ingredients: {mealPlan.breakfastIngredients ? mealPlan.breakfastIngredients : 'No ingredients included'}
                </Text>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign: 'left', marginBottom:10, paddingLeft: 20}}>
                    Calories: {mealPlan.breakfastCalories ? mealPlan.breakfastCalories : 'No calories included'}
                </Text>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign: 'left', marginBottom:10, paddingLeft: 20}}>
                    Protein: {mealPlan.breakfastProtein ? mealPlan.breakfastProtein + ' g' : 'No protein included'}
                </Text>
            </View>

            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 20, fontWeight:"800",color:black, textAlign: 'left', marginBottom:10}}>
                    Lunch
                </Text>
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign: 'left', marginBottom:10, paddingLeft: 20}}>
                    Meal: {mealPlan.lunchMeal ? mealPlan.lunchMeal : 'No food included'}
                </Text>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign: 'left', marginBottom:10, paddingLeft: 20}}>
                    Ingredients: {mealPlan.lunchIngredients ? mealPlan.lunchIngredients : 'No ingredients included'}
                </Text>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign: 'left', marginBottom:10, paddingLeft: 20}}>
                    Calories: {mealPlan.lunchCalories ? mealPlan.lunchCalories : 'No calories included'}
                </Text>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign: 'left', marginBottom:10, paddingLeft: 20}}>
                    Protein: {mealPlan.lunchProtein ? mealPlan.lunchProtein + ' g' : 'No protein included'}
                </Text>
            </View>

            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 20, fontWeight:"800",color:black, textAlign: 'left', marginBottom:10}}>
                    Dinner
                </Text>
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign: 'left', marginBottom:10, paddingLeft: 20}}>
                    Meal: {mealPlan.dinnerMeal ? mealPlan.dinnerMeal : 'No food included'}
                </Text>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign: 'left', marginBottom:10, paddingLeft: 20}}>
                    Ingredients: {mealPlan.dinnerIngredients ? mealPlan.dinnerIngredients : 'No ingredients included'}
                </Text>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign: 'left', marginBottom:10, paddingLeft: 20}}>
                    Calories: {mealPlan.dinnerCalories ? mealPlan.dinnerCalories : 'No calories included'}
                </Text>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign: 'left', marginBottom:10, paddingLeft: 20}}>
                    Protein: {mealPlan.dinnerProtein ? mealPlan.dinnerProtein + ' g' : 'No protein included'}
                </Text>
            </View>

            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 20, fontWeight:"800",color:black, textAlign: 'left', marginBottom:10}}>
                    Snacks
                </Text>
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign: 'left', marginBottom:10, paddingLeft: 20}}>
                    Meal: {mealPlan.snacks ? mealPlan.snacks : 'No snacks included'}
                </Text>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign: 'left', marginBottom:10, paddingLeft: 20}}>
                    Calories: {mealPlan.snackCalories ? mealPlan.snackCalories : 'No calories included'}
                </Text>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign: 'left', marginBottom:10, paddingLeft: 20}}>
                    Protein: {mealPlan.snackProtein ? mealPlan.snackProtein + ' g' : 'No protein included'}
                </Text>
            </View>      
            <View style = {{flex:1}}>
                <TouchableOpacity onPress={()=> navigation.navigate("NutritionMealPlanEditor", {...route.params})} style={[styles.TouchableOpacity, {width: '100%'}]}>
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:20, color: 'white'}}>
                        Manage
                    </Text>
                </TouchableOpacity>
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
        height:40,
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

export default NutritionMealPlanInfo;