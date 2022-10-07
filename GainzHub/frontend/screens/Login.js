import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Button} from 'react-native'
import {Colors} from '../components/colors'
import axios from 'axios';
import Toast from 'react-native-root-toast';
import { loginUser } from '../requests/userRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {maroon, black} = Colors;

const Login = ({navigation}) =>{
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[formErrors, setFormErrors] = useState({email: "", password: ""});

    //Logic to check if the user is already logged in
    useEffect(() => {
        const checkLoggedIn = async()=>{
            const storedData = await AsyncStorage.getItem("userData");
            if(storedData && storedData.length != 0){
                navigation.navigate("Nutrition");
            }
        }
        checkLoggedIn();
    }, [])
    

    const handleLogin = async() =>{
        //Validate fields first
        let currFormErrors = {email: "", password: ""}
        if (email.length == 0){
            currFormErrors.email = "Please include an email";
        }
        
        if(password.length == 0){
            currFormErrors.password = "Please include a password";
        }


        setFormErrors(currFormErrors);
        if(currFormErrors.email.length != 0 || currFormErrors.password.length != 0){
            let allErrorMessages = Object.entries(currFormErrors).map(x => x[1]).join("\n");
            Toast.show(allErrorMessages, {
                duration: Toast.durations.SHORT,
            });
            return;
        }

        //Attempt login
        const loginData = {
            email,
            password
        }

        try{
            const data = await loginUser(loginData);
            console.log(data);
            if(data && data.status != 200){
                Toast.show(data.data.errors,{
                    duration: Toast.durations.SHORT,
                });
            }
            else{
                //Store the response in secure local storage
                Toast.show("Sucessfully logged in!", {
                    duration: Toast.durations.SHORT,
                })
                await AsyncStorage.setItem('userData', data.data.token)

                navigation.navigate("Nutrition");
            }
        }catch(e){
            console.log(e);
        }

        //Display login results

    }

    return(
        <View style={[styles.root, {paddingLeft: 20}]}>
            <View style={{flexDirection:'row', justifyContent:'center', paddingBottom: 30}}>
                <View style = {{paddingRight: 50}}>
                    <TouchableOpacity style={{borderBottomWidth: 1, borderBottomColor: 'black'}}>
                        <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={()=> navigation.navigate('Register')} style={{paddingLeft: 50}} >
                        <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                            Register
                        </Text>
                    </TouchableOpacity> 
                </View>
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 50, fontWeight:"800",color:maroon}}>
                    Welcome
                </Text>
            </View>
            <View style={{paddingBottom: 34}}>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 24, fontWeight:"500",color:black, width: 244}}>
                    Sign back in. {"\n"}
                    We've missed you.
                </Text>
            </View>
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <View style={[styles.inputView, formErrors.email.length == 0 ? {borderColor: "#e8e8e8"} : {borderColor: "red"}]}>
                    <TextInput
                    style={styles.inputText}
                    placeholder="Email"
                    placeholderTextColor="#BDBDBD"
                    onChangeText={(email) => setEmail(email)}
                    />
                </View>
                <View style={[styles.inputView, formErrors.password.length == 0 ? {borderColor: "#e8e8e8"} : {borderColor: "red"}]}>
                    <TextInput
                    style={styles.inputText}
                    placeholder="Password"
                    placeholderTextColor="#BDBDBD"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                    />
                </View>
                <View style={{paddingBottom:15}}>
                    <TouchableOpacity style={[styles.TouchableOpacity]} onPress={handleLogin}>
                        <Text style={{fontFamily:"Inter-Medium", fontWeight:"500", fontSize: 16, color: "white"}}>
                            Log In
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
        padding: 40,
    },
    inputView:{
        width: 350,
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
        backgroundColor: '#8D0A0A',
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default Login;