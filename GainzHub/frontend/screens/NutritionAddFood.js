import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Button, FlatList, SafeAreaView} from 'react-native'
//import Slider from '@react-native-community/slider';
import {Colors} from '../components/colors'
import axios from 'axios';
import Toast from 'react-native-root-toast';
import { loginUser } from '../requests/userRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
//import CircularProgress from 'react-native-circular-progress-indicator';
//import "./reanimated2/js-reanimated/global";
// import CircularProgress from 'react-native-circular-progress-indicator';
//import * as Progress from 'react-native-progress'
//import Slider from '@react-native-community/slider';

const {maroon, black} = Colors;

//const Tab = createBottomTabNavigator();

const getUser = async() =>{
    const value = await AsyncStorage.getItem('userData');
    return value;
}
// NEED to have the goBack but also need to navigate through pages *FIGURE THAT OUT LATER*
const NutritionAddFood = ({navigation: {goBack}}) => {
    const [foodName, setFoodName] = useState("");
    const [foodCalories, setfoodCalories] = useState("");
    const [foodProtein, setFoodProtein] = useState("");
    const [foodCarbs, setFoodCarbs] = useState("");
    const [foodFat, setFoodFat] = useState("");
    const [foodSodium, setFoodSodium] = useState("");
    const [foodSugar, setFoodSugar] = useState("");
    const isFocused = useIsFocused();
    const [formErrors, setFormErrors] = useState({
        "foodName": "",
        "foodProtein": "",
        "foodCalories": ""
    })

    const logFood = async() => {
        //check that all fields have values
        let currFormErrors = {
            "foodName": "",
            "foodProtein": "",
            "foodCalories": ""
        };

        if(foodName.length == 0){
            currFormErrors['foodName'] = 'Please enter a Name';
        }
        
        if(foodProtein.length == 0 || isNaN(foodProtein)){
            currFormErrors['foodProtein'] = 'Please enter a valid Protein value (must be a number)';
        }

        if(foodCalories.length == 0 || isNaN(foodCalories)){
            currFormErrors['foodCalories'] = 'Please enter a valid Calorie Value (must be a number)';
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

        const response = await axios.post('http://localhost:5000/nutrition/logFood',
                                        {newFood:
                                        {
                                           foodName: foodName,
                                           foodCalories: foodCalories,
                                           foodProtein: foodProtein,
                                           foodCarbs: foodCarbs,
                                           foodFat: foodFat,
                                           foodSugar: foodSugar,
                                           foodSodium: foodSodium
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
            Toast.show("Could not add food", {
                duration: Toast.durations.SHORT,
            })
        }
    };
    
    return(
        <View style={[styles.root, {paddingLeft: 20}]}>
            <View style={{flexDirection:'row', justifyContent:'left', paddingBottom: 5}}>
                <View style = {{paddingRight: 50}}>
                    <TouchableOpacity onPress={() => goBack()}>
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
            <View style={{flexDirection:'row', justifyContent:'center', paddingBottom: 20}}>
                <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16, color:maroon}}>
                    Daily
                </Text>
                <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                    /Add Food
                </Text>
            </View>
            <View style={[styles.inputView, {width: '100%'}, formErrors['foodName'].length == 0 ? {borderColor: "black"} : {borderColor: "red"}, {alignItems: 'center'}]}>
                <TextInput
                style={[styles.inputText]}
                placeholder="Food Name"
                placeholderTextColor="black"
                onChangeText={(foodName) => setFoodName(foodName)}
                />
            </View>
            <View style={[styles.inputView, {width: '100%'}, formErrors['foodCalories'].length == 0 ? {borderColor: "black"} : {borderColor: "red"}, {alignItems: 'center'}]}>
                <TextInput
                style={[styles.inputText]}
                keyboardType='numeric'
                placeholder="Calories"
                placeholderTextColor="black"
                onChangeText={(foodCalories) => setfoodCalories(foodCalories)}
                />
            </View>
            
            <View style={[styles.inputView, {width: '100%'}, formErrors['foodProtein'].length == 0 ? {borderColor: "black"} : {borderColor: "red"}, {alignItems: 'center'}]}>
                <TextInput
                style={[styles.inputText]}
                placeholder="Protein"
                placeholderTextColor="black"
                onChangeText={(foodProtein) => setFoodProtein(foodProtein)}
                />
            </View>
            <View style={[styles.inputView, {width: '100%'}, {alignItems: 'center'}]}>
                <TextInput
                style={[styles.inputText]}
                placeholder="Fat (Optional)"
                placeholderTextColor="black"
                onChangeText={(foodFat) => setFoodFat(foodFat)}
                />
            </View>
            <View style={[styles.inputView, {width: '100%'}, {alignItems: 'center'}]}>
                <TextInput
                    style={[styles.inputText]}
                    placeholder="Carbohydrates (Optional)"
                    placeholderTextColor="black"
                    onChangeText={(foodCarbs) => setFoodCarbs(foodCarbs)}
                />
            </View>
            <View style={[styles.inputView, {width: '100%'}, {alignItems: 'center'}]}>
                <TextInput
                style={[styles.inputText]}
                placeholder="Sodium (Optional)"
                placeholderTextColor="black"
                onChangeText={(foodSodium) => setFoodSodium(foodSodium)}
                />
            </View>
            <View style={[styles.inputView, {width: '100%'}, {alignItems: 'center'}]}>
                <TextInput
                    style={[styles.inputText]}
                    placeholder="Sugar (Optional)"
                    placeholderTextColor="black"
                    onChangeText={(foodSugar) => setFoodSugar(foodSugar)}
                />
            </View>
            <View style={[{alignItems: 'center'}]}>
                <TouchableOpacity onPress={logFood} style={[styles.TouchableOpacity]}>
                    <Text style={{fontFamily:"Inter-Medium", fontWeight:"500", fontSize: 18, color: "white"}}>
                        Add
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
        width: '100%',
        marginLeft: 30

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
        width:'40%',
        borderRadius: 30,
        backgroundColor: '#8D0A0A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',

    }
});

export default NutritionAddFood;