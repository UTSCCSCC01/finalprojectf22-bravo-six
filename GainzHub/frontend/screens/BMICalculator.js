import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {Text, View, StyleSheet, TouchableOpacity, Button, Platform} from 'react-native'
import {Colors} from '../components/colors'
import { TextInput } from 'react-native-paper';
//import { Select } from "native-base";
//import RNPickerSelect from "react-native-picker-select";
//import { Model, Query } from 'mongoose';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';
const {maroon, black} = Colors;

const getUser = async() =>{
    const value = await AsyncStorage.getItem('userData');
    return value;
}


const BMICalculator = ({navigation: { goBack }}) => {
    const [sex, setSex] = useState("");
    const [diet, setDiet] = useState("");
    const [activity, setActivity] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [calories, setCalories] = useState("");
    const [age, setAge] = useState("");


    const [activityOptions, setActivityOptions] = useState([
        { value: 'bmr', label: 'BMR Calculation (ignoring activity level)'},
        { value: 'sedentary', label: 'Sedentary (low or little exercise)' },
        { value: 'lightly', label: 'Lightly Active (exercise 1-3 times a week)'},
        { value: 'moderate', label: 'Moderately Active (exercise 4-5 times a week)'},
        { value: 'active', label: 'Active (daily exercise or intense exercise 4-5 times a week)'},
        { value: 'very', label: 'Very Active (intense exercise 6-7 times a week)'},
        { value: 'extreme', label: 'Extremely Active (daily intense exercise or physical job)' },
    ]);
    const [activityOpen, setActivityOpen] = useState(false);
    const [sexOpen, setSexOpen] = useState(false);
    const [dietOpen, setDietOpen] = useState(false);

    const [sexOptions, setSexOptions] = useState([
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
    ]);
    const [dietOptions, setDietOptions] = useState([
        { value: 'bulk', label: 'Bulk' },
        { value: 'maintain', label: 'Maintain' },
        { value: 'cut', label: 'Cut' }
    ]);
    const [formErrors, setFormErrors] = useState({"height": "", "weight": "", 
    "age": "", "diet": "", "sex": "", "activity": ""});

    const [userData, setUserData] = useState("No user data");
    const [loggedIn, setLoggedIn] = useState(true);

    const updateCalorieGoal = async() => {
        // add calories to user.calorieGoal in the database
        const token = await AsyncStorage.getItem("userData");

        const response = await axios.post('http://localhost:5001/nutrition/changeCalorieGoal',
                                        {newCalorieGoal: Number(calories)}, {
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
            Toast.show("Could not update calorie goal", {
                duration: Toast.durations.SHORT,
            })
        }
    };

    const calculateCalories = () => {
        let currFormErrors = {"height": "", "weight": "", 
        "age": "", "diet": "", "sex": "", "activity": ""};

        if(height.length == 0){
            currFormErrors['height'] = 'Please enter an height';
        }
        
        if(weight.length == 0){
            currFormErrors['weight'] = 'Please enter a weight';
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

        setCalories(Number(weight/((height/100)*(height/100))).toFixed(0));    
        

    }

  
    return(
        <View style={[styles.root, {paddingLeft: 15}]}>
            <View style={{flexDirection:'row', justifyContent:'left', paddingBottom: 30}}>
                <View style = {{paddingRight: 50}}>
                    <TouchableOpacity onPress={()=> goBack()}>
                        <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                            Back
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 25, fontWeight:"800",color:maroon, textAlign: 'center', marginBottom:10}}>
                    Calculate Your BMI!
                </Text>
            </View>
                <View style={[{alignContent:'center'}]}>
                    <View style={[styles.inputView, {width: 350}, formErrors['height'].length == 0 ? {borderColor: "black"} : {borderColor: "red"}]}>
                        <TextInput 
                            style={styles.textInputLine}
                            activeUnderlineColor={Colors.maroon} 
                            mode = "flat" label = "Height (cm)" 
                            placeholder = "Enter Height (cm)"
                            onChangeText={(height) => setHeight(height)}
                        />
                    </View>
                    <View style={[styles.inputView, {width: 350}, formErrors['weight'].length == 0 ? {borderColor: "black"} : {borderColor: "red"}]}>
                        <TextInput 
                            style={styles.textInputLine}
                            activeUnderlineColor={Colors.maroon} 
                            mode = "flat" label = "Weight (kg)" 
                            placeholder = "Enter Weight (kg)"
                            onChangeText={(weight) => setWeight(weight)}
                        />
                    </View>
                    <Text style={{fontFamily: "Inter-Medium", fontSize: 25, fontWeight:"800",color:maroon, textAlign: 'center'}}>
                        {"Your BMI: "}{calories}
                    </Text>
                    <View style={{paddingBottom:15}}>
                        <TouchableOpacity onPress={calculateCalories} style={[styles.TouchableOpacity]}>
                            <Text style={{fontFamily:"Inter-Medium", fontWeight:"500", fontSize: 16, color: "white"}}>
                                Calculate
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root:{
        padding: 30,
    },
    inputView:{
        marginBottom: 20,
    },
    inputText:{
        height: 50,
        flex: 1,
        marginRight: 30,
        padding: 10,
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        fontSize: 14,
        alignContent: 'center',
        textAlign: 'center',
        borderRadius: 8,
        width: 350

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
    textInputLine:{
        backgroundColor: Colors.appBackground,
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

export default BMICalculator;