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

const {maroon, black} = Colors;

//const Tab = createBottomTabNavigator();

const getUser = async() =>{
    const value = await AsyncStorage.getItem('userData');
    return value;
}
// NEED to have the goBack but also need to navigate through pages *FIGURE THAT OUT LATER*
const NutritionAddFood = ({navigation: {goBack}}) => {
    const [mealPlans, setMealPlans] = useState({});
    const isFocused = useIsFocused();

    /*
    useEffect(() => {
        const getStoredMealPlans = async() => {
            const token = await AsyncStorage.getItem("userData");
    
            const response  = await axios.get('http://localhost:5000/getPMP/getPersonalMealPlans', {
                headers: {
                    'x-auth-token': token,
                }
            })
            console.log(response);
            setMealPlans(response.data.personalMealPlans);
        }
        getStoredMealPlans();
    }, [isFocused])
    */
    //onPress={()=> navigation.navigate('NutritonMealPlanInfo')}

    const renderItem = ({ item }) => (
        <View style={[{flexDirection: 'row'}, {display: 'flex'}, {justifyContent: 'space-between'}, {paddingHorizontal: 5}]}>
            <TouchableOpacity onPress={()=> navigation.navigate('NutritionMealPlanInfo', {item})} style={[styles.inputView, {width: '75%'}]}>
                <Text style={styles.inputText}>{item.planName}</Text>
            </TouchableOpacity>
           
            <TouchableOpacity onPress={()=> navigation.navigate('Placeholder')} style={[styles.TouchableOpacityList]} >
                <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:14, color: "white"}}>
                    Publish
                </Text>
            </TouchableOpacity> 
            
        </View>
      );
    
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
                    Add a Food
                </Text>
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
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20
    },
    inputText:{
        height: 30,
        flex: 1,
        marginRight: 30,
        padding: 10,
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        fontSize: 18,
        alignContent: 'center',
        textAlign: 'left',
        borderRadius: 8,
        width: '100%'
    },
    TouchableOpacity:{
        height:25,
        width:'100%',
        borderRadius: 30,
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
    },
    TouchableOpacityList:{
        height:35,
        width:'20%',
        borderRadius: 30,
        marginTop: 8,
        backgroundColor: '#8D0A0A',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default NutritionAddFood;