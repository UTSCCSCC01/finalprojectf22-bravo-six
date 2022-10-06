import React, {useEffect, useState} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Button, Platform} from 'react-native'
import {Colors} from '../components/colors'
//import { Select } from "native-base";
//import RNPickerSelect from "react-native-picker-select";
//import { Model, Query } from 'mongoose';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {maroon, black} = Colors;

const getUser = async() =>{
    const value = await AsyncStorage.getItem('userData');
    return value;
}


const CalorieCalculator = ({navigation}) => {
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
    const [userData, setUserData] = useState("No user data");
    const [loggedIn, setLoggedIn] = useState(true);
    /*
    useEffect(() =>{
        const getStoredUser = async() =>{
            const userDataStored = await AsyncStorage.getItem('userData');
            setUserData(JSON.parse(userDataStored));
        }
        getStoredUser();
    }, []);
    */

    //console.log(userData);

    const updateCalorieGoal = () => {
        // add calories to user.calorieGoal in the database
    };

    const calculateCalories = () => {
        var dietNum = 0;
        var activity_level = 0;
        if (activity === "bmr"){
            activity_level = 1
        } else if (activity === "sedentary"){
            activity_level = 1.2
        } else if (activity === "lightly"){
            activity_level = 1.3
        }else if (activity === "moderate"){
            activity_level = 1.45
        }else if (activity === "active"){
            activity_level = 1.65
        }else if (activity === "very"){
            activity_level = 1.8
        }else {
            activity_level = 1.95
        }

        if(diet === "bulk"){
            dietNum = 300;
        } else if(diet === "maintain"){
            dietNum = 0;
        } else{
            dietNum = -300;
        }

        if(sex === "female"){
            setCalories((activity_level * (10 * weight + 6.25 * height - 5 * age -161)) + dietNum);
        } else {
            setCalories((activity_level * (10 * weight + 6.25 * height - 5 * age + 5)) + dietNum);
        }
        updateCalorieGoal();

    }

  
    return(
        <View style={[styles.root, {paddingLeft: 20}]}>
            <View style={{flexDirection:'row', justifyContent:'left', paddingBottom: 30}}>
                <View style = {{paddingRight: 50}}>
                    <TouchableOpacity onPress={()=> navigation.navigate('Nutrition')}>
                        <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                            Back
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 25, fontWeight:"800",color:maroon, justifyContent:'center', marginBottom:10}}>
                    Calculate Your Calories!
                </Text>
            </View>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <View style={[styles.inputView, {width: 350}]}>
                        <TextInput
                        style={[styles.inputText]}
                        placeholder="Height (cm)"
                        placeholderTextColor='black'
                        onChangeText={(height) => setHeight(height)}
                        />
                    </View>
                    <View style={[styles.inputView, {width: 350}]}>
                        <TextInput
                        style={[styles.inputText]}
                        placeholder="Weight (kg)"
                        placeholderTextColor="black"
                        onChangeText={(weight) => setWeight(weight)}
                        />
                    </View>
                    <View style={[styles.inputView, {width: 350}]}>
                        <TextInput
                        style={styles.inputText}
                        placeholder="Age"
                        placeholderTextColor="black"
                        onChangeText={(age) => setAge(age)}
                        />
                    </View>
                    <View style={[styles.container, {width:350}]}>
                        <DropDownPicker
                            zIndex={3000}
                            zIndexInverse={1000}
                            dropDownDirection="TOP"  
                            open={activityOpen}
                            value={activity}
                            items={activityOptions}
                            setOpen={setActivityOpen}
                            setValue={setActivity}
                            setItems={setActivityOptions}
                            placeholder="Activity Level"
                        />
                    </View>
                    <View style={[styles.container, {width:350}]}>
                        <DropDownPicker
                            zIndex={3000}
                            zIndexInverse={1000}
                            dropDownDirection="TOP"
                            open={sexOpen}
                            value={sex}
                            items={sexOptions}
                            setOpen={setSexOpen}
                            setValue={setSex}
                            setItems={setSexOptions}
                            placeholder="Sex"
                        />
                    </View>
                    <View style={[styles.container, {width:350}]}>
                        <DropDownPicker
                            zIndex={3000}
                            zIndexInverse={1000}
                            dropDownDirection="TOP"
                            open={dietOpen}
                            value={diet}
                            items={dietOptions}
                            setOpen={setDietOpen}
                            setValue={setDiet}
                            setItems={setDietOptions}
                            placeholder="Diet Goal"
                            disableBorderRadius={true}
                        />
                    </View>
                    <View style={{paddingBottom:15}}>
                        <TouchableOpacity onPress={calculateCalories} style={[styles.TouchableOpacity]}>
                            <Text style={{fontFamily:"Inter-Medium", fontWeight:"500", fontSize: 16, color: "white"}}>
                                Calculate
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                    <Text style={{fontFamily: "Inter-Medium", fontSize: 25, fontWeight:"800",color:maroon, justifyContent:'center'}}>
                        {"Calories Needed: "}{Number(calories).toFixed(2)}
                    </Text>
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
        height: 45,
        backgroundColor: "#FFFFFF",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        alignContent: 'center'
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
        textAlign: 'center'

    },
    TouchableOpacity:{
        height:51,
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

export default CalorieCalculator;