import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Button, SafeAreaView, FlatList, TouchableWithoutFeedback, StatusBar} from 'react-native'
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

const Tab = createBottomTabNavigator();

const getUser = async() =>{
    const value = await AsyncStorage.getItem('userData');
    return value;
}


const Nutrition = ({navigation}) =>{
    const [userData, setUserData] = useState("No user data");
    const [loggedIn, setLoggedIn] = useState(true);
    const [caloriesAte, setCaloriesAte] = useState(0);
    const [calorieGoal, setCalorieGoal] = useState('');
    const [fullUserData, setFullUserData] = useState({});
    const [food, setFood] = useState({});
    const isFocused = useIsFocused();
   

    useEffect(() =>{
        const getStoredUser = async() =>{
            const userDataStored = await AsyncStorage.getItem('userData');
            if(!userDataStored || userDataStored.length == 0){
                setLoggedIn(false);
            }
            setUserData(userDataStored);
        }
        getStoredUser();
    }, [])

    
    useEffect(()=>{
        const handleLogout = async() =>{
            await AsyncStorage.removeItem('userData');
            navigation.navigate("Login");
        }

        if(!loggedIn){
            handleLogout();
        }
    }, [loggedIn]);

    // Here we get the calorieGoal and caloriesAte from the database so that we can show the progress to the user
    useEffect(() => {
        const getStoredGoal = async() => {
            const token = await AsyncStorage.getItem("userData");
    
            const response  = await axios.get('http://localhost:5001/nutrition/getCalorieGoal', {
                headers: {
                    'x-auth-token': token,
                }
            })
            console.log(response);
            setCalorieGoal(response.data.calorieGoal);
        }
        getStoredGoal();
    }, [isFocused])

    useEffect(() => {
        const getStoredAte = async() => {
            const token = await AsyncStorage.getItem("userData");
    
            const response  = await axios.get('http://localhost:5001/nutrition/getCaloriesAte', {
                headers: {
                    'x-auth-token': token,
                }
            })
            console.log(response);
            setCaloriesAte(response.data.caloriesAte);
        }
        getStoredAte();
    }, [isFocused])

    useEffect(() => {
        const getStoredFood= async() => {
            const token = await AsyncStorage.getItem("userData");

            const response  = await axios.get('http://localhost:5001/nutrition/getFoodLog', {
                headers: {
                    'x-auth-token': token,
                }
            })
            console.log(response);
            setFood(response.data.food);
        }
        getStoredFood();
    }, [isFocused])


    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={()=> navigation.navigate('NutritionFoodViewer', {item})} style={[styles.inputView, {width: '100%'}]}>
            <Text style={styles.inputText}>Food: {item.foodName}, Calories {item.foodCalories}, Protein {item.foodProtein}</Text>
        </TouchableOpacity>
    );

    
    return(
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
                    Nutrition
                </Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom:20, textAlign:'center', paddingHorizontal:30, justifyContent:'space-between'}}>
                <TouchableOpacity onPress={()=> navigation.navigate('Nutrition')}>
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16, color:maroon}}>
                       Daily
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('NutritionPlans')} style={{paddingLeft: 70}} >
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                       Plans
                    </Text>
                </TouchableOpacity> 
                <TouchableOpacity onPress={()=> navigation.navigate('Nutriton_Explore')}>
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                        Explore
                    </Text>
                </TouchableOpacity> 
            </View>

            <View style={[{marginBottom:20},{textAlign: 'center'}, {alignItems: 'center'}]}>
                <Text style={{fontFamily: 'Inter-Medium', fontWeight: '600', fontSize: 20}}> Calorie Goal: {calorieGoal}</Text>
                {console.log(parseFloat(caloriesAte/calorieGoal))}
                <Progress.Bar 
                    progress={!isNaN(calorieGoal) && !isNaN(caloriesAte) && caloriesAte != 0 && calorieGoal != 0 && parseFloat(caloriesAte/calorieGoal) >= 0 && parseFloat(caloriesAte/calorieGoal) <= 1 ? parseFloat((caloriesAte/calorieGoal).toFixed(2)) : 0}
                    width={300}
                    height={15}
                />
                <Text style={{paddingLeft: -30, fontSize: 16}}> Progress {caloriesAte} / {calorieGoal} </Text>
            </View>

            <View style={[{paddingBottom: 15}]}>
                <TouchableOpacity onPress={()=> navigation.navigate('CalorieCalculator')} style={[styles.TouchableOpacity, {width:'100%'}]} >
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '500', fontSize:16, color:"white"}}>
                        Calculate Your Calories Here!
                    </Text>
                </TouchableOpacity> 
            </View>

            <View style={{paddingLeft: 5}}>
                <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:25, color:black, marginBottom:20}}>
                        Food Log
                </Text>
            </View>

            <View style={[{flex:1}]}>
                <FlatList
                    data={food}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    scrollEnabled={true}
                />
            </View>

            <View style={{paddingBottom:15, alignItems:'center', paddingTop: 10}}>
                <TouchableOpacity onPress={()=> navigation.navigate('NutritionAddFood')} style={[styles.TouchableOpacity]}>
                    <Text style={{fontFamily:"Inter-Medium", fontWeight:"500", fontSize: 16, color: "white"}}>
                        Add Food
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


export default Nutrition;
