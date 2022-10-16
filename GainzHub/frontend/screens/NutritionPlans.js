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
    const test = [{
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Test Meal Plan',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Meal Plan',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Meal Plan',
      }
    ];

    const Item = ({ title }) => (
        <View style={[styles.inputView, {width: '100%'}]}>
            <Text style={styles.inputText}>{title}</Text>
        </View>
      );
      
    
    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );
    
    return(
        <View style={[styles.root, {paddingLeft: 20}]}>
            <View style={{flexDirection:'row', justifyContent:'left', paddingBottom: 5}}>
                <View style = {{paddingRight: 50}}>
                    <TouchableOpacity onPress={()=> navigation.navigate('Nutrition')}>
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
            <View style={{flexDirection: 'row', marginBottom:20, textAlign:'center'}}>
                <TouchableOpacity onPress={()=> navigation.navigate('Nutrition')} style={{paddingLeft: 40}} >
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                       Daily
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('NutritonPlans')} style={{paddingLeft: 70}} >
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16, color: maroon}}>
                       Plans
                    </Text>
                </TouchableOpacity> 
                <TouchableOpacity onPress={()=> navigation.navigate('Nutriton_Explore')} style={{paddingLeft: 60}} >
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                        Explore
                    </Text>
                </TouchableOpacity> 
            </View>
            <View>
                <Text style = {{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:26}}>
                    Meal Plan Library
                </Text>
            </View>
            <SafeAreaView>
                <FlatList
                    data={test}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    scrollEnabled={true}
                />
            </SafeAreaView>
            <View>
                <TouchableOpacity onPress={()=> navigation.navigate('NutritionMealAdder')} style={[styles.TouchableOpacity]} >
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16, color: "white"}}>
                        Meal Adder
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
        backgroundColor: "#FFFFFF",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        alignContent: 'center'
    },
    inputText:{
        height: 30,
        flex: 1,
        marginRight: 30,
        padding: 10,
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        fontSize: 20,
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
    listBox:{

    }
});

export default NutritionPlans;