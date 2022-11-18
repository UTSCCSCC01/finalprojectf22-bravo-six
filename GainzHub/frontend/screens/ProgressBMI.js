import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Button, SafeAreaView, FlatList, TouchableWithoutFeedback, StatusBar} from 'react-native'
import {Colors} from '../components/colors'
import axios from 'axios';
import Toast from 'react-native-root-toast';
import { loginUser } from '../requests/userRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import BMIitem from '../components/BMIitem';
import { ScrollView } from 'react-native-gesture-handler';


const {maroon, black} = Colors;
const Tab = createBottomTabNavigator();



const ProgressBMI = ({navigation}) =>{
    const [loggedIn, setLoggedIn] = useState(true);
    const isFocused = useIsFocused();
    const [BMI, setBMI] = useState({});

    useEffect(()=>{
        const handleLogout = async() =>{
            await AsyncStorage.removeItem('userData');
            navigation.navigate("Login");
        }

        if(!loggedIn){
            handleLogout();
        }
    }, [loggedIn]);

    useEffect(() => {
        const getStoredBMIs = async() => {
            const token = await AsyncStorage.getItem("userData");
            const response  = await axios.get('http://localhost:5001/progress/getUserBMIs', {
                headers: {
                    'x-auth-token': token,
                }
            })
            response.data.reverse();
            setBMI(response.data);
        }

        getStoredBMIs();
    }, [isFocused]);

    const renderBMI = ({ item }) => (
        <BMIitem BMIid={item._id} navigation={navigation}/>
    );
    return (
        <View style={[styles.root, {paddingLeft: 20}, {flex:1}]}>
            <View style={{flexDirection:'row', justifyContent:'left', paddingBottom: 5}}>
                <View style = {{paddingRight: 50}}>
                    <TouchableOpacity onPress={()=> setLoggedIn(false)}>
                        <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 30, fontWeight:"800",color:maroon, textAlign:'center', marginBottom:10}}>
                    Progress
                </Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom:20, textAlign:'center', paddingHorizontal:30, justifyContent:'space-between'}}>
                <TouchableOpacity onPress={()=> navigation.navigate('Progresss')}>
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                       Body Weight
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('ProgressBMI')}>
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16, color:maroon}}>
                       BMI
                    </Text>
                </TouchableOpacity> 
                <TouchableOpacity onPress={()=> navigation.navigate('ProgressBF')}>
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                        BF%
                    </Text>
                </TouchableOpacity> 
            </View>
            <View style={{paddingLeft: 5}}>
                <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:25, color:black, marginBottom:20}}>
                        Logs
                </Text>
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 20, fontWeight:"800",color:black, textAlign:'center', marginBottom:10}}>
                   BMI Progress
                </Text>
            </View>
            
            <View style={{flex:1}}>
                <ScrollView style={{flexGrow: 0, height: 280}}>
                    <FlatList
                        data={BMI}
                        renderItem={renderBMI}
                        keyExtractor={item => item._id}
                        scrollEnabled={true}
                    />
                </ScrollView>
            </View>
            <View style={{paddingBottom:15, alignItems:'center', paddingTop: 10}}>
                <TouchableOpacity onPress={()=> navigation.navigate('BMICalculator')} style={[styles.TouchableOpacity]}>
                    <Text style={{fontFamily:"Inter-Medium", fontWeight:"500", fontSize: 16, color: "white"}}>
                        Add Entry
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
        height: 60,
        backgroundColor: "#F6F6F6",
        borderColor: "#e8e8e8",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10
    },
    inputText:{
        height: 30,
        marginRight: 30,
        padding: 10,
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        fontSize: 18,
        alignContent: 'center',
        textAlign: 'left',
        borderRadius: 8,
        width: 300
    },
    TouchableOpacity:{
        height:40,
        width:'50%',
        borderRadius: 15,
        backgroundColor: '#8D0A0A',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ProgressBMI;
