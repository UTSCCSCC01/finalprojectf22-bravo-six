import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Button, FlatList, SafeAreaView} from 'react-native'
//import Slider from '@react-native-community/slider';
import {Colors} from '../components/colors'
import axios from 'axios';
import Toast from 'react-native-root-toast';
import { loginUser } from '../requests/userRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import NutritionNav from '../components/NutritionNav';
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

// NEED to have the goBack but also need to navigate through pages *FIGURE THAT OUT LATER*
const NutritionPlans = ({navigation}) => {
    const [mealPlans, setMealPlans] = useState({});
    const isFocused = useIsFocused();

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
    
    const Item = ({ name }) => (
        <View style={[{flexDirection: 'row'}, {display: 'flex'}, {justifyContent: 'space-between'}, {paddingHorizontal: 5}]}>
            <View style={[styles.inputView, {width: '75%'}]}>
                <Text style={styles.inputText}>{name}</Text>
            </View>
           
            <TouchableOpacity onPress={()=> navigation.navigate('Placeholder')} style={[styles.TouchableOpacityList]} >
                <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:14, color: "white"}}>
                    Publish
                </Text>
            </TouchableOpacity> 
            
        </View>
      );
      
    
    const renderItem = ({ item }) => (
        <Item name={item.planName} />
    );
    
    return(
        <View style={[styles.root, {paddingLeft: 20}]}>
            <View style={{flexDirection:'row', justifyContent:'left', paddingBottom: 5}}>
                <View style = {{paddingRight: 50}}>
                    <TouchableOpacity onPress={()=> navigation.pop()}>
                        <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                            Back
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 30, fontWeight:"800",color:maroon, textAlign:'center', marginBottom:10}}>
                    Nutrition
                </Text>
            </View>
            <NutritionNav navigation={navigation}/>
            <View>
                <Text style = {{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:26}}>
                    Meal Plan Library
                </Text>
            </View>
            <SafeAreaView>
                <FlatList
                    data={mealPlans}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    scrollEnabled={true}
                />
            </SafeAreaView>
            <View>
                <TouchableOpacity onPress={()=> navigation.navigate('NutritionMealAdder')} style={[styles.TouchableOpacity]} >
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16, color: "white"}}>
                        Create A Meal Plan
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

export default NutritionPlans;