 import React, {useCallback, useEffect, useState} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Button} from 'react-native'
import {Colors} from '../components/colors'
import Toast from 'react-native-root-toast';
import axios from 'axios';
import { registerUser } from '../requests/userRequests';
import ErrorMSG from '../components/ErrorMsg';
import { ButtonSwitch } from '../components/ButtonSwitch';
import ShowPasswordBtn from '../components/ShowPasswordBtn';
const {maroon, black} = Colors;

const Register = ({navigation}) =>{
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const [name, setName] = useState(","); //of the form: firstname,lastname
    const [username, setUsername] = useState("");
    const [formErrors, setFormErrors] = useState({"firstName": "", "lastName": "", 
                                                    "email": "", "password": "", "username": ""});
    
    const[show, setShow] = useState(true);

    const handleName = (nameType, newName) =>{
        let commaIdx = name.indexOf(',');
        switch(nameType){
            case 'firstName': //Set before the comma
                setName(newName + name.slice(commaIdx, name.length));
                break;
            case 'lastName': //Set after the comma
                setName(name.slice(0, commaIdx+1) + newName);
                break;
            default: //Do nothing
                break;
        }
    }

    const handleClick = async() => {
        //Check if the fields have been filled out
        let currFormErrors = {"firstName": "", "lastName": "", 
        "email": "", "password": "", "username": ""};
        let firstName = name.split(',')[0];
        let lastName = name.split(',')[1];
        
        if(email.length == 0){
            currFormErrors['email'] = 'Please enter an email';
        }
        
        if(firstName.length == 0){
            currFormErrors['firstName'] = 'Please enter a first name';
        }

        if(lastName.length == 0){
            currFormErrors['lastName'] = 'Please enter a last name';
        }

        if(password.length < 8){
            currFormErrors['password'] = 'Password must be atleast 8 characters';
        }

        if(username.length == 0){
            currFormErrors['username'] = 'Please enter a username';
        }
        
        setFormErrors(currFormErrors);

        //Find the smallest string in the form errors (should be "" (emptry string))
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

        const userData = {
            firstName,
            lastName,
            email,
            password,
            username
        }

        try{
            const data = await registerUser(userData);
            console.log(data);
            if(data && data.status != 200){
                Toast.show(data.data.errors, {
                    duration: Toast.durations.SHORT,
                });
            }
            else{
                Toast.show("Sucessfully Registered!", {
                    duration: Toast.durations.SHORT,
                });
                navigation.navigate("Login");
            }
        } catch(e){
            console.log(e);
        }
    };
    return(
        <View style={[styles.root, {paddingLeft: 20}]}>
            <ButtonSwitch first = "Login" second = "Register"/>
            
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 50, fontWeight:"800",color:maroon}}>
                    Welcome
                </Text>
            </View>
            <View style={{paddingBottom: 34}}>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 24, fontWeight:"500",color:black, width: 244}}>
                    Get started with your fitness career.
                </Text>
            </View>
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <View style={{flexDirection: "row"}}>
                    <View style={[styles.inputView, {width: 165, margin:10}, formErrors['firstName'].length == 0 ? {borderColor: "#e8e8e8"} : {borderColor: "red"}]}>
                        <TextInput
                        style={styles.inputText}
                        placeholder="First Name"
                        placeholderTextColor="#BDBDBD"
                        onChangeText={(firstName) => handleName('firstName',firstName)}
                        />
                    </View>
                    <View style={[styles.inputView, {width: 165, margin:10}, formErrors['lastName'].length == 0 ? {borderColor: "#e8e8e8"} : {borderColor: "red"}]}>
                        <TextInput
                        style={styles.inputText}
                        placeholder="Last Name"
                        placeholderTextColor="#BDBDBD"
                        onChangeText={(lastName) => handleName('lastName', lastName)}
                        />
                    </View>
                </View>
                <View style={[styles.inputView, {width: 350}, formErrors['email'].length == 0 ? {borderColor: "#e8e8e8"} : {borderColor: "red"}]}>
                    <TextInput
                    style={[styles.inputText]}
                    placeholder="Email"
                    placeholderTextColor="#BDBDBD"
                    onChangeText={(email) => setEmail(email)}
                    />
                </View>
                <View style={[styles.inputView, {width: 350}, formErrors['username'].length == 0 ? {borderColor: "#e8e8e8"} : {borderColor: "red"}]}>
                    <TextInput
                    style={[styles.inputText]}
                    placeholder="Username"
                    placeholderTextColor="#BDBDBD"
                    onChangeText={(username) => setUsername(username)}
                    />
                </View>
                <View style={[styles.inputView, {width: 350, flexDirection:"row"}, formErrors['password'].length == 0 ? {borderColor: "#e8e8e8"} : {borderColor: "red"}]}>
                    <View style={{flex:1}}>
                        <TextInput
                        style={styles.inputText}
                        placeholder="Password"
                        placeholderTextColor="#BDBDBD"
                        secureTextEntry={show}
                        onChangeText={(password) => setPassword(password)}
                        />
                    </View>
                    <ShowPasswordBtn onPress={()=>{setShow(!show)}}/>
                </View>
                <View style={{paddingBottom:15}}>
                    <TouchableOpacity onPress={handleClick} style={[styles.TouchableOpacity]}>
                        <Text style={{fontFamily:"Inter-Medium", fontWeight:"500", fontSize: 16, color: "white"}}>
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Text style={{fontFamily: 'Inter-Medium', fontWeight: '700', color:'#981212'}}>
                        Forgot your password?
                    </Text>
                </TouchableOpacity>
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
        backgroundColor: "#F6F6F6",
        borderColor: "#e8e8e8",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
    },
    inputText:{
        height: 50,
        flex: 1,
        marginLeft: 10,
        padding: 10,
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        fontSize: 16,
    },
    TouchableOpacity:{
        height:51,
        width:343,
        borderRadius: 30,
        marginTop: 30,
        backgroundColor: '#8D0A0A',
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default Register;