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

//const Tab = createBottomTabNavigator();

const getUser = async() =>{
    const value = await AsyncStorage.getItem('userData');
    return value;
}

const NutritionMealAdder = ({navigation: { goBack }}) => {
    const [planName, setPlanName] = useState("");
    const [breakfastMeal, setBreakfastMeal] = useState("");
    const [breakfastIngredients, setBreakfastIngredients] = useState("");
    const [breakfastCalories, setBreakfastCalories] = useState("");
    const [breakfastProtein, setBreakfastProtein] = useState("");
    const [lunchMeal, setLunchMeal] = useState("");
    const [lunchIngredients, setLunchIngredients] = useState("");
    const [lunchCalories, setLunchCalories] = useState("");
    const [lunchProtein, setLunchProtein] = useState("");
    const [dinnerMeal, setDinnerMeal] = useState("");
    const [dinnerIngredients, setDinnerIngredients] = useState("");
    const [dinnerCalories, setDinnerCalories] = useState("");
    const [dinnerProtein, setDinnerProtein] = useState("");
    const [snacks, setSnacks] = useState("");
    const [snackCalories, setSnackCalories] = useState("");
    const [snackProtein, setSnackProtein] = useState("");
    const [formErrors, setFormErrors] = useState({"planName": "",
        "breakfastMeal": "",
        "breakfastIngredients": "",
        "breakfastCalories": "",
        "breakfastProtein": "",
        "lunchMeal": "",
        "lunchIngredients": "",
        "lunchCalories": "",
        "lunchProtein": "",
        "dinnerMeal": "",
        "dinnerIngredients": "",
        "dinnerCalories": "",
        "dinnerProtein": "",
        "snacks": "",
        "snackCalories": "",
        "snackProtein": ""
    })

    const addMealPlan = async() => {
        //check that all fields have values
        let currFormErrors = {"planName": "",
            "breakfastMeal": "",
            "breakfastIngredients": "",
            "breakfastCalories": "",
            "breakfastProtein": "",
            "lunchMeal": "",
            "lunchIngredients": "",
            "lunchCalories": "",
            "lunchProtein": "",
            "dinnerMeal": "",
            "dinnerIngredients": "",
            "dinnerCalories": "",
            "dinnerProtein": "",
            "snacks": "",
            "snackCalories": "",
            "snackProtein": ""
        };

        if(planName.length == 0){
            currFormErrors['planName'] = 'Please enter a Name';
        }

        if(isNaN(breakfastCalories) || breakfastCalories <= 0){
            currFormErrors['breakfastCalories'] = 'Please enter a positive numerical value for your Breakfast Calories';
        }

        
        if(isNaN(breakfastProtein) || breakfastProtein <= 0){
            currFormErrors['breakfastProtein'] = 'Please enter a positive numerical value for your Breakfast Protein';
        }

        
        if(breakfastMeal.length == 0){
            currFormErrors['breakfastMeal'] = 'Please enter a Breakfast Meal';
        }

        if(breakfastCalories.length == 0){
            currFormErrors['breakfastCalories'] = 'Please enter Breakfast Calories';
        }

        if(breakfastProtein.length == 0){
            currFormErrors['breakfastProtein'] = 'Please enter Breakfast Protein';
        }

        
        if(isNaN(lunchCalories) || lunchCalories <= 0){
            currFormErrors['lunchCalories'] = 'Please enter a positive numerical value for your Lunch Calories';
        }

        
        if(isNaN(lunchProtein) || lunchProtein <= 0){
            currFormErrors['lunchProtein'] = 'Please enter a positive numerical value for your Lunch Protein';
        }

        if(lunchMeal.length == 0){
            currFormErrors['lunchMeal'] = 'Please enter a Lunch Meal';
        }

        if(lunchCalories.length == 0){
            currFormErrors['lunchCalories'] = 'Please enter Lunch Calories';
        }

        if(lunchProtein.length == 0){
            currFormErrors['lunchProtein'] = 'Please enter Lunch Protein';
        }

        
        if(isNaN(dinnerCalories) || dinnerCalories <= 0){
            currFormErrors['dinnerCalories'] = 'Please enter a positive numerical value for your Dinner Calories';
        }

        
        if(isNaN(dinnerProtein) || dinnerProtein <= 0){
            currFormErrors['dinnerProtein'] = 'Please enter a positive numerical value for your Dinner Protein';
        }

        if(dinnerMeal.length == 0){
            currFormErrors['dinnerMeal'] = 'Please enter a Dinner Meal';
        }

        if(dinnerCalories.length == 0){
            currFormErrors['dinnerCalories'] = 'Please enter Dinner Calories';
        }

        if(dinnerProtein.length == 0){
            currFormErrors['dinnerProtein'] = 'Please enter Dinner Protein';
        }

        
        if(isNaN(snackCalories) || snackCalories <= 0){
            currFormErrors['snackCalories'] = 'Please enter a positive numerical value for your Snacks Calories';
        }

        
        if(isNaN(snackProtein) || snackProtein <= 0){
            currFormErrors['snackProtein'] = 'Please enter a positive numerical value for your Snack Protein';
        }

        if(snacks.length == 0){
            currFormErrors['snacks'] = 'Please enter some snacks';
        }

        if(snackCalories.length == 0){
            currFormErrors['snackCalories'] = 'Please enter Snack Calories';
        }

        if(snackProtein.length == 0){
            currFormErrors['snackProtein'] = 'Please enter Snack Protein';
        }

        setFormErrors(currFormErrors);

        const checkAllEmpty = Object.entries(currFormErrors).reduce((a,b) => a[1].length > b[1].length ? a : b)[1];
        
        //Check if its empty (if not it means there are errors) 
        if(checkAllEmpty.length != 0){
            let allErrorMessages = Object.entries(currFormErrors).map(x => x[1]).join("\n");
            allErrorMessages = allErrorMessages.trim();
            Toast.show(allErrorMessages, {
                duration: Toast.durations.SHORT,
            });
            return;
        }

        // add calories to user.calorieGoal in the database
        const token = await AsyncStorage.getItem("userData");

        const response = await axios.post('http://localhost:5001/nutrition/addPersonalMealPlan',
                                        {newMealPlan:
                                        {
                                            planName: planName,
                                            breakfastMeal: breakfastMeal,
                                            breakfastIngredients: breakfastIngredients,
                                            breakfastCalories: breakfastCalories,
                                            breakfastProtein: breakfastProtein,
                                            lunchMeal: lunchMeal,
                                            lunchIngredients: lunchIngredients,
                                            lunchCalories: lunchCalories,
                                            lunchProtein: lunchProtein,
                                            dinnerMeal: dinnerMeal,
                                            dinnerIngredients: dinnerIngredients,
                                            dinnerCalories: dinnerCalories,
                                            dinnerProtein: dinnerProtein,
                                            snacks: snacks,
                                            snackCalories: snackCalories,
                                            snackProtein: snackProtein,
                                            review: 0,
                                            reviewNumber: 0
                                        }}, {
            headers:{
                "x-auth-token": token,
            }
        });

        if(response.status == 200){
            Toast.show("Success!", {
                duration: Toast.durations.SHORT,
            })
        }
        else{
            Toast.show("Could not add meal plan", {
                duration: Toast.durations.SHORT,
            })
        }
    };

    
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
            <View style={[styles.inputView, {width: '100%'}, formErrors['planName'].length == 0 ? {borderColor: "black"} : {borderColor: "red"}]}>
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
            <View style={[styles.inputView, {width: '100%'}, formErrors['breakfastMeal'].length == 0 ? {borderColor: "black"} : {borderColor: "red"}]}>
                <TextInput
                style={[styles.inputText]}
                placeholder="Meal Name"
                placeholderTextColor="black"
                onChangeText={(breakfastMeal) => setBreakfastMeal(breakfastMeal)}
                />
            </View>
            <View style={[styles.inputView, {width: '100%'}]}>
                <TextInput
                style={[styles.inputText]}
                placeholder="Ingredients (serving size) (Optional)"
                placeholderTextColor="black"
                onChangeText={(breakfastIngredients) => setBreakfastIngredients(breakfastIngredients)}
                />
            </View>
            <View style={[{flexDirection:'row'}, {display: 'flex'}, {justifyContent: 'space-between'}, {paddingHorizontal: 30}]}>
                <View style={[styles.inputViewRow, {width: '35%'}, formErrors['breakfastCalories'].length == 0 ? {borderColor: "black"} : {borderColor: "red"}]}>
                    <TextInput
                    style={[styles.inputTextRow]}
                    placeholder="Calories"
                    placeholderTextColor="black"
                    onChangeText={(breakfastCalories) => setBreakfastCalories(breakfastCalories)}
                    />
                </View>
                <View style={[styles.inputViewRow, {width: '35%'}, formErrors['breakfastProtein'].length == 0 ? {borderColor: "black"} : {borderColor: "red"}]}>
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
            <View style={[styles.inputView, {width: '100%'}, formErrors['lunchMeal'].length == 0 ? {borderColor: "black"} : {borderColor: "red"}]}>
                <TextInput
                style={[styles.inputText]}
                placeholder="Meal Name"
                placeholderTextColor="black"
                onChangeText={(lunchMeal) => setLunchMeal(lunchMeal)}
                />
            </View>
            <View style={[styles.inputView, {width: '100%'}]}>
                <TextInput
                style={[styles.inputText]}
                placeholder="Ingredients (serving size) (Optional)"
                placeholderTextColor="black"
                onChangeText={(lunchIngredients) => setLunchIngredients(lunchIngredients)}
                />
            </View>
            <View style={[{flexDirection:'row'}, {display: 'flex'}, {justifyContent: 'space-between'}, {paddingHorizontal: 30}]}>
                <View style={[styles.inputViewRow, {width: '35%'}, formErrors['lunchCalories'].length == 0 ? {borderColor: "black"} : {borderColor: "red"}]}>
                    <TextInput
                    style={[styles.inputTextRow]}
                    placeholder="Calories"
                    placeholderTextColor="black"
                    onChangeText={(lunchCalories) => setLunchCalories(lunchCalories)}
                    />
                </View>
                <View style={[styles.inputViewRow, {width: '35%'}, formErrors['lunchProtein'].length == 0 ? {borderColor: "black"} : {borderColor: "red"}]}>
                    <TextInput
                        style={[styles.inputTextRow]}
                        placeholder="Protein"
                        placeholderTextColor="black"
                        onChangeText={(lunchProtein) => setLunchProtein(lunchProtein)}
                    />
                </View>
            </View>

            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 16, fontWeight:"800",color:black, textAlign: 'left', marginBottom:10}}>
                    Dinner
                </Text>
            </View>
            <View style={[styles.inputView, {width: '100%'}, formErrors['dinnerMeal'].length == 0 ? {borderColor: "black"} : {borderColor: "red"}]}>
                <TextInput
                style={[styles.inputText]}
                placeholder="Meal Name"
                placeholderTextColor="black"
                onChangeText={(dinnerMeal) => setDinnerMeal(dinnerMeal)}
                />
            </View>
            <View style={[styles.inputView, {width: '100%'}]}>
                <TextInput
                style={[styles.inputText]}
                placeholder="Ingredients (serving size) (Optional)"
                placeholderTextColor="black"
                onChangeText={(dinnerIngredients) => setDinnerIngredients(dinnerIngredients)}
                />
            </View>
            <View style={[{flexDirection:'row'}, {display: 'flex'}, {justifyContent: 'space-between'}, {paddingHorizontal: 30}]}>
                <View style={[styles.inputViewRow, {width: '35%'}, formErrors['dinnerCalories'].length == 0 ? {borderColor: "black"} : {borderColor: "red"}]}>
                    <TextInput
                    style={[styles.inputTextRow]}
                    placeholder="Calories"
                    placeholderTextColor="black"
                    onChangeText={(dinnerCalories) => setDinnerCalories(dinnerCalories)}
                    />
                </View>
                <View style={[styles.inputViewRow, {width: '35%'}, formErrors['dinnerProtein'].length == 0 ? {borderColor: "black"} : {borderColor: "red"}]}>
                    <TextInput
                        style={[styles.inputTextRow]}
                        placeholder="Protein"
                        placeholderTextColor="black"
                        onChangeText={(dinnerProtein) => setDinnerProtein(dinnerProtein)}
                    />
                </View>
            </View>
            
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 16, fontWeight:"800",color:black, textAlign: 'left', marginBottom:10}}>
                    Snacks
                </Text>
            </View>
            <View style={[styles.inputView, {width: '100%'}, formErrors['snacks'].length == 0 ? {borderColor: "black"} : {borderColor: "red"}]}>
                <TextInput
                style={[styles.inputText]}
                placeholder="Snacks"
                placeholderTextColor="black"
                onChangeText={(snacks) => setSnacks(snacks)}
                />
            </View>
            <View style={[{flexDirection:'row'}, {display: 'flex'}, {justifyContent: 'space-between'}, {paddingHorizontal: 30}]}>
                <View style={[styles.inputViewRow, {width: '35%'}, formErrors['snackCalories'].length == 0 ? {borderColor: "black"} : {borderColor: "red"}]}>
                    <TextInput
                    style={[styles.inputTextRow]}
                    placeholder="Calories"
                    placeholderTextColor="black"
                    onChangeText={(snackCalories) => setSnackCalories(snackCalories)}
                    />
                </View>
                <View style={[styles.inputViewRow, {width: '35%'}, formErrors['snackProtein'].length == 0 ? {borderColor: "black"} : {borderColor: "red"}]}>
                    <TextInput
                        style={[styles.inputTextRow]}
                        placeholder="Protein"
                        placeholderTextColor="black"
                        onChangeText={(snackProtein) => setSnackProtein(snackProtein)}
                    />
                </View>
            </View>

            <View>
                <TouchableOpacity onPress={addMealPlan} style={[styles.TouchableOpacity]}>
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

export default NutritionMealAdder;