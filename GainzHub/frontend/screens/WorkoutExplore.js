import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Button, SafeAreaView, FlatList, TouchableWithoutFeedback, StatusBar, ScrollView} from 'react-native'
import {Colors} from '../components/colors'
import axios from 'axios';
import Toast from 'react-native-root-toast';
import { loginUser } from '../requests/userRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import PublishedWorkoutPlanCard from '../components/PublishedWorkoutPlanCard';

const {maroon, black} = Colors;
const Tab = createBottomTabNavigator();


const WorkoutExplore = ({navigation}) =>{
    const [loggedIn, setLoggedIn] = useState(true);
    const [publishedWorkoutPlans, setPublishedWorkoutPlans] = useState([]);

    useEffect(()=>{
        async function getPublishedWorkoutPlans(){
            try{
                const publishedWorkoutPlans = await axios.get("http://localhost:5001/workout/getPublishedWorkoutPlans");
                setPublishedWorkoutPlans(publishedWorkoutPlans.data);
            } catch (err){
                console.log(err);
            }
        }
        getPublishedWorkoutPlans();
    }, [publishedWorkoutPlans]);
<<<<<<< HEAD


    useEffect(() => {
        async function getCurrentUser()  {
            try{
                const token = await AsyncStorage.getItem("userData");
                const response = await axios.get("http://localhost:5001/user/getUserData", {
                    headers: {
                        "x-auth-token": token
                    }
                });
                console.log(response.data);
            }catch(err){
                console.log(err);
            }
        }    

    })
=======
>>>>>>> deef618 (BRAV-11 Completed Workout Explore)



    useEffect(()=>{
        const handleLogout = async() =>{
            await AsyncStorage.removeItem('userData');
            navigation.navigate("Login");
        }

        if(!loggedIn){
            handleLogout();
        }
    }, [loggedIn]);

<<<<<<< HEAD
    const renderPublishedWorkoutPlans = ({item}) => (
        <PublishedWorkoutPlanCard navigation = {navigation} 
            plan = {item} userId = {item.userId} planName = {item.planName} 
            planDescription = {item.description} planPrivacy = {item.published}/>
    );
=======
    const renderPublishedWorkoutPlans = ({item}) =>{
        return <PublishedWorkoutPlanCard plan = {item} userId = {item.userId} planName = {item.planName} planDescription = {item.description} 
        planPrivacy = {item.published}/>
    }
>>>>>>> deef618 (BRAV-11 Completed Workout Explore)
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
                    Workout
                </Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom:20, textAlign:'center', paddingHorizontal:30, justifyContent:'space-between'}}>
                <TouchableOpacity onPress={()=> navigation.navigate('Workout')}>
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                       Plans
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('WorkoutLogs')}>
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                       Logs
                    </Text>
                </TouchableOpacity> 
                <TouchableOpacity onPress={()=> navigation.navigate('WorkoutExplore')}>
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16, color:maroon}}>
                        Explore
                    </Text>
                </TouchableOpacity> 
            </View>
            <View style={{paddingLeft: 5}}>
                <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:25, color:black, marginBottom:20}}>
                        Workout Explore
                </Text>
            </View>

            <ScrollView>
                <FlatList
                    style={{height:160}}
                    scrollEnabled={true}
                    horizontal={true}
                    data={publishedWorkoutPlans}
                    renderItem={renderPublishedWorkoutPlans}
                    />
            </ScrollView>
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

export default WorkoutExplore;