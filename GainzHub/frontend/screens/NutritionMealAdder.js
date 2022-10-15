import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Button} from 'react-native'
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

const Tab = createBottomTabNavigator();

const getUser = async() =>{
    const value = await AsyncStorage.getItem('userData');
    return value;
}

const NutritionMealAdder = ({navigation: { goBack }}) => {
    const [planName, setPlanName] = useState("");
    const [breakfastMeal, setBreakfastMeal] = useState("");
    const [breakfastIngredients, setBreakfastIngredients] = useState("");
    const [breakfastCalories, setBreakfastCalories] = useState("");
    const [breakfastProtien, setBreakfastProtein] = useState("");
    const [lunchMeal, setLunchMeal] = useState("");
    const [lunchIngredients, setLunchIngredients] = useState("");
    const [lunchCalories, setLunchCalories] = useState("");
    const [lunchProtien, setLunchProtein] = useState("");
    const [dinnerMeal, setDinnerMeal] = useState("");
    const [dinnerIngredients, setDinnerIngredients] = useState("");
    const [dinnerCalories, setDinnerCalories] = useState("");
    const [dinnerProtien, setDinnerProtein] = useState("");
    const [snacks, setSnacks] = useState("");
    const [snackCalories, setSnackCalories] = useState("");
    const [snackProtien, setSnackProtein] = useState("");

    
    return(
        <View style={[styles.root, {paddingLeft: 20}]}>
            <View style={{flexDirection:'row', justifyContent:'left', paddingBottom: 5}}>
                <View style = {{paddingRight: 50}}>
                    <TouchableOpacity onPress={()=> goBack()}>
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
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 20, fontWeight:"800",color:black, textAlign: 'center', marginBottom:10}}>
                    Create Your Own Meal Plan!
                </Text>
            </View>
            <View style={[styles.inputView, {width: 350}]}>
                <TextInput
                style={[styles.inputText]}
                placeholder="Plan Name"
                placeholderTextColor="black"
                onChangeText={(planName) => setPlanName(planName)}
                />
            </View>

            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 16, fontWeight:"800",color:black, textAlign: 'left', marginBottom:10}}>
                    Breakfast
                </Text>
            </View>
            <View style={[styles.inputView, {width: 350}]}>
                <TextInput
                style={[styles.inputText]}
                placeholder="Meal Name"
                placeholderTextColor="black"
                onChangeText={(breakfastMeal) => setBreakfastMeal(breakfastMeal)}
                />
            </View>
            <View style={[styles.inputView, {width: 350}]}>
                <TextInput
                style={[styles.inputText]}
                placeholder="Ingredients (serving size)"
                placeholderTextColor="black"
                onChangeText={(breakfastIngredients) => setBreakfastIngredients(breakfastIngredients)}
                />
            </View>
            <View style={[{flexDirection:'row'}, {display: 'flex'}, {justifyContent: 'space-between'}, {paddingHorizontal: 30}]}>
                <View style={[styles.inputViewRow, {width: 100}]}>
                    <TextInput
                    style={[styles.inputTextRow]}
                    placeholder="Calories"
                    placeholderTextColor="black"
                    onChangeText={(breakfastCalories) => setBreakfastCalories(breakfastCalories)}
                    />
                </View>
                <View style={[styles.inputViewRow, {width: 100}]}>
                    <TextInput
                        style={[styles.inputTextRow]}
                        placeholder="Protein"
                        placeholderTextColor="black"
                        onChangeText={(breakfastProtein) => setBreakfastProtein(breakfastProtein)}
                    />
                </View>
            </View>

            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 16, fontWeight:"800",color:black, textAlign: 'left', marginBottom:10}}>
                    Lunch
                </Text>
            </View>
            <View style={[styles.inputView, {width: 350}]}>
                <TextInput
                style={[styles.inputText]}
                placeholder="Meal Name"
                placeholderTextColor="black"
                onChangeText={(lunchMeal) => setLunchMeal(lunchMeal)}
                />
            </View>
            <View style={[styles.inputView, {width: 350}]}>
                <TextInput
                style={[styles.inputText]}
                placeholder="Ingredients (serving size)"
                placeholderTextColor="black"
                onChangeText={(lunchIngredients) => setLunchIngredients(lunchIngredients)}
                />
            </View>
            <View style={[{flexDirection:'row'}, {display: 'flex'}, {justifyContent: 'space-between'}, {paddingHorizontal: 30}]}>
                <View style={[styles.inputViewRow, {width: 100}]}>
                    <TextInput
                    style={[styles.inputTextRow]}
                    placeholder="Calories"
                    placeholderTextColor="black"
                    onChangeText={(lunchCalories) => setLunchCalories(lunchCalories)}
                    />
                </View>
                <View style={[styles.inputViewRow, {width: 100}]}>
                    <TextInput
                        style={[styles.inputTextRow]}
                        placeholder="Protein"
                        placeholderTextColor="black"
                        onChangeText={(lunchProtien) => setLunchProtein(lunchProtien)}
                    />
                </View>
            </View>

            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 16, fontWeight:"800",color:black, textAlign: 'left', marginBottom:10}}>
                    Dinner
                </Text>
            </View>
            <View style={[styles.inputView, {width: 350}]}>
                <TextInput
                style={[styles.inputText]}
                placeholder="Meal Name"
                placeholderTextColor="black"
                onChangeText={(dinnerMeal) => setDinnerMeal(dinnerMeal)}
                />
            </View>
            <View style={[styles.inputView, {width: 350}]}>
                <TextInput
                style={[styles.inputText]}
                placeholder="Ingredients (serving size)"
                placeholderTextColor="black"
                onChangeText={(dinnerIngredients) => setDinnerIngredients(dinnerIngredients)}
                />
            </View>
            <View style={[{flexDirection:'row'}, {display: 'flex'}, {justifyContent: 'space-between'}, {paddingHorizontal: 30}]}>
                <View style={[styles.inputViewRow, {width: 100}]}>
                    <TextInput
                    style={[styles.inputTextRow]}
                    placeholder="Calories"
                    placeholderTextColor="black"
                    onChangeText={(dinnerCalories) => setDinnerCalories(dinnerCalories)}
                    />
                </View>
                <View style={[styles.inputViewRow, {width: 100}]}>
                    <TextInput
                        style={[styles.inputTextRow]}
                        placeholder="Protein"
                        placeholderTextColor="black"
                        onChangeText={(dinnerProtien) => setDinnerProtein(dinnerProtien)}
                    />
                </View>
            </View>
            
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 16, fontWeight:"800",color:black, textAlign: 'left', marginBottom:10}}>
                    Snacks
                </Text>
            </View>
            <View style={[styles.inputView, {width: 350}]}>
                <TextInput
                style={[styles.inputText]}
                placeholder="Snacks"
                placeholderTextColor="black"
                onChangeText={(dinnerMeal) => setDinnerMeal(dinnerMeal)}
                />
            </View>
            <View style={[{flexDirection:'row'}, {display: 'flex'}, {justifyContent: 'space-between'}, {paddingHorizontal: 30}]}>
                <View style={[styles.inputViewRow, {width: 100}]}>
                    <TextInput
                    style={[styles.inputTextRow]}
                    placeholder="Calories"
                    placeholderTextColor="black"
                    onChangeText={(snackCalories) => setSnackCalories(snackCalories)}
                    />
                </View>
                <View style={[styles.inputViewRow, {width: 100}]}>
                    <TextInput
                        style={[styles.inputTextRow]}
                        placeholder="Protein"
                        placeholderTextColor="black"
                        onChangeText={(snackProtien) => setSnackProtein(snackProtien)}
                    />
                </View>
            </View>

            <View>
                <TouchableOpacity style={[styles.TouchableOpacity]}>
                    <Text style={{fontFamily:"Inter-Medium", fontWeight:"500", fontSize: 16, color: "white"}}>
                        Save
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
        width: 350

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
        width: 100

    },
    TouchableOpacity:{
        height:25,
        width:343,
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

export default NutritionMealAdder;