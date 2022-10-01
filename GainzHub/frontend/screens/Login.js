import React, {useState} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Button} from 'react-native'
import {Colors} from '../components/colors'

const {maroon, black} = Colors;

const Login = ({navigation}) =>{
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
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
                <View style={styles.inputView}>
                    <TextInput
                    style={styles.inputText}
                    placeholder="Email"
                    placeholderTextColor="#BDBDBD"
                    onChangeText={(email) => setEmail(email)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                    style={styles.inputText}
                    placeholder="Password"
                    placeholderTextColor="#BDBDBD"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                    />
                </View>
                <View style={{paddingBottom:15}}>
                    <TouchableOpacity style={[styles.TouchableOpacity]}>
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
        padding: 30,
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