import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {Text, View, StyleSheet, TouchableOpacity, Button, Platform, TouchableOpacityComponent} from 'react-native'
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


const BFCalculator = ({navigation: { goBack }}) => {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [age, setAge] = useState("");
    const [maleColour, setMaleColour] = useState("grey");
    const [femaleColour, setFemaleColour] = useState("grey");
    const [BF, setBF] = useState("");
    const [gender, getGender] = useState("");
    const [save, setSave] = useState(false);

    let today = new Date().toLocaleDateString()

    const [formErrors, setFormErrors] = useState({"gender": "", "height": "", "weight": "", 
    "age": ""});


    const AddBMI = async() => {
        if(save == false){
            Toast.show("Calculate BMI before Saving", {
                duration: Toast.durations.SHORT,
            })
            return;
        }
        const token = await AsyncStorage.getItem("userData");

        const response = await axios.post('http://localhost:5001/progress/addBF',
                                        {newBF:
                                        {
                                            BF: BF,
                                            date: today
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
            Toast.show("Could not add BMI", {
                duration: Toast.durations.SHORT,
            })
        }
        goBack();
    };

    const maleSelect = async() => {
        setMaleColour("blue");
        setFemaleColour("grey");
        getGender("male");
    };
    const femaleSelect = async() => {
        setMaleColour("grey");
        setFemaleColour("#e75480");
        getGender("female");
    };

    const calculateBF = () => {
        let currFormErrors = {"gender": "", "height": "", "weight": "", 
        "age": ""};

        if(gender == ""){
            currFormErrors['gender'] = 'Please choose a sex';
        }

        if(height.length == 0){
            currFormErrors['height'] = 'Please enter an height';
        }
        
        if(weight.length == 0){
            currFormErrors['weight'] = 'Please enter a weight';
        }

        if(age.length == 0){
            currFormErrors['age'] = 'Please enter a age';
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

        setSave(true);

        if(age>=18){
            if(gender == "male"){
                setBF((((Number(weight/((height/100)*(height/100))))*1.2 + 0.23*age)-16.2).toFixed(0));    
            }
            else{
                setBF((((Number(weight/((height/100)*(height/100))))*1.2 + 0.23*age)-5.4).toFixed(0));    
            }
        }
        else{
            if(gender == "male"){
                setBF((((Number(weight/((height/100)*(height/100))))*1.2 + 0.23*age)-2.2).toFixed(0));    
            }
            else{
                setBF((((Number(weight/((height/100)*(height/100))))*1.2 + 0.23*age)+1.4).toFixed(0));    
            }
        }

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
                <Text style={{fontFamily: "Inter-Medium", fontSize: 25, fontWeight:"800",color:black, textAlign: 'center', marginBottom:10}}>
                    Calculate Your BF!
                </Text>
            </View>
                <View style={[{alignContent:'center'}]}>
                    <Text style={{fontFamily: "Inter-Medium", fontSize: 15, fontWeight:"800",color:maroon, textAlign: 'center', marginTop:10}}>
                        Select Sex
                    </Text>
                    <View style={[{flexDirection: 'row'}, {display: 'flex'}, {justifyContent:'space-between', padding: 10}]}>
                        <TouchableOpacity onPress={maleSelect} style={[styles.Male, {backgroundColor: maleColour, marginRight: 5}]}>
                            <Text style={{fontFamily:"Inter-Medium", fontWeight:"500", fontSize: 16, color: "white"}}>
                                Male
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={femaleSelect} style={[styles.Male, {backgroundColor: femaleColour, marginLeft: 5}]}>
                            <Text style={{fontFamily:"Inter-Medium", fontWeight:"500", fontSize: 16, color: "white"}}>
                                Female
                            </Text>
                        </TouchableOpacity>
                    </View>
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
                    <View style={[styles.inputView, {width: 350}, formErrors['age'].length == 0 ? {borderColor: "black"} : {borderColor: "red"}]}>
                        <TextInput 
                            style={styles.textInputLine}
                            activeUnderlineColor={Colors.maroon} 
                            mode = "flat" label = "Age" 
                            placeholder = "Enter Age "
                            onChangeText={(age) => setAge(age)}
                        />
                    </View>
                    <Text style={{fontFamily: "Inter-Medium", fontSize: 25, fontWeight:"800",color:maroon, textAlign: 'center'}}>
                        {"Your BF%: "}{BF}
                    </Text>
                    <View style={{paddingBottom:15}}>
                        <TouchableOpacity onPress={calculateBF} style={[styles.TouchableOpacity]}>
                            <Text style={{fontFamily:"Inter-Medium", fontWeight:"500", fontSize: 16, color: "white"}}>
                                Calculate
                            </Text>
                        </TouchableOpacity>

                    </View>
                        <TouchableOpacity onPress={AddBMI} style={[styles.TouchableOpacity]}>
                            <Text style={{fontFamily:"Inter-Medium", fontWeight:"500", fontSize: 16, color: "white"}}>
                                Save
                            </Text>
                        </TouchableOpacity>
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

    },
    Male:{
        height:40,
        width:'50%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    Female:{
        height:40,
        width:'50%',
        borderRadius: 15,
        backgroundColor: '#FFC0CB',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default BFCalculator;