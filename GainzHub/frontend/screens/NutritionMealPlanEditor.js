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

const NutritionMealPlanEditor = ({route, navigation}) => {
    const mealPlan = route.params.obj;
    console.log(mealPlan);
    const [planName, setPlanName] = useState("");
    const [breakfastMeal, setBreakfastMeal] = useState("");
    const [breakfastIngredients, setBreakfastIngredients] = useState("");
    const [breakfastCalories, setBreakfastCalories] = useState("");
    const [breakfastProtein, setBreakfastProtein] = useState("");
    const [lunchMeal, setLunchMeal] = useState("");
    const [lunchIngredients, setLunchIngredients] = useState("");
    const [lunchCalories, setLunchCalories] = useState("");
    const [lunchProtein, setLunchProtein] = useState("");
    const [dinnerMeal, setDinnerMeal] = useState("");
    const [dinnerIngredients, setDinnerIngredients] = useState("");
    const [dinnerCalories, setDinnerCalories] = useState("");
    const [dinnerProtein, setDinnerProtein] = useState("");
    const [snacks, setSnacks] = useState("");
    const [snackCalories, setSnackCalories] = useState("");
    const [snackProtein, setSnackProtein] = useState("");
    return(
        <View style={[styles.root, {paddingLeft: 20}]}>
            <View style={{flexDirection:'row', textAlign:'center', paddingBottom: 10, flex:1}}>
                <View style = {{paddingRight:50}}>
                    <TouchableOpacity onPress={()=> navigation.pop()}>
                        <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                            Back
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 26, fontWeight:"800",color:maroon, textAlign: 'center', marginBottom:15}}>
                    Manage Your Meal Plan!
                </Text>
            </View>
            <View style={[styles.inputText, {flexDirection:'row'}, {paddingBottom:14}]}>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 22, fontWeight:"800",color:black, textAlign:'center', marginBottom:10}}>
                    Meal Plan:
                </Text>
                <TextInput
                    style={[styles.inputText]}
                    placeholder={mealPlan.planName}
                    placeholderTextColor="black"
                    onChangeText={(planName) => setPlanName(planName)}
                />
            </View>  
            <View style={{paddingBottom:10}}>
                <View style={{paddingBottom:3}}>
                    <Text style={{fontFamily: "Inter-Medium", fontSize: 20, fontWeight:"800",color:black, textAlign: 'left'}}>
                        Breakfast
                    </Text>
                </View>
                <View style={[styles.inputText, {flexDirection:'row'}, {paddingBottom:3}]}>
                    <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign:'left', paddingVertical:2}}>
                        Meal:
                    </Text>
                    <TextInput
                        style={[styles.inputText]}
                        placeholder={mealPlan.breakfastMeal ? mealPlan.breakfastMeal : 'No food included'}
                        placeholderTextColor="black"
                        onChangeText={(breakfastMeal) => setBreakfastMeal(breakfastMeal)}
                    />
                </View> 
                <View style={[styles.inputText, {flexDirection:'row'}, {paddingBottom:3}]}>
                    <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign:'left', paddingVertical:2}}>
                        Ingredients:
                    </Text>
                    <TextInput
                        style={[styles.inputText]}
                        placeholder={mealPlan.breakfastIngredients ? mealPlan.breakfastIngredients : 'No ingredients included'}
                        placeholderTextColor="black"
                        onChangeText={(breakfastIngredients) => setBreakfastIngredients(breakfastIngredients)}
                    />
                </View> 
                <View style={[styles.inputText, {flexDirection:'row'}, {paddingBottom:3}]}>
                    <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign:'left', paddingVertical:2}}>
                        Calories:
                    </Text>
                    <TextInput
                        style={[styles.inputText]}
                        placeholder={mealPlan.breakfastCalories ? mealPlan.breakfastCalories : 'No calories included'}
                        placeholderTextColor="black"
                        onChangeText={(breakfastCalories) => setBreakfastCalories(breakfastCalories)}
                    />
                </View> 
                <View style={[styles.inputText, {flexDirection:'row'}, {paddingBottom:3}]}>
                    <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign:'left', paddingVertical:2}}>
                        Protein:
                    </Text>
                    <TextInput
                        style={[styles.inputText]}
                        placeholder={mealPlan.breakfastProtein ? mealPlan.breakfastProtein: 'No protein included'}
                        placeholderTextColor="black"
                        onChangeText={(breakfastProtein) => setBreakfastProtein(breakfastProtein)}
                    />
                </View>
            </View>

            <View style={{paddingBottom:10}}>
                <View style={{paddingBottom:3}}>
                    <Text style={{fontFamily: "Inter-Medium", fontSize: 20, fontWeight:"800",color:black, textAlign: 'left'}}>
                        Lunch
                    </Text>
                </View>
                <View style={[styles.inputText, {flexDirection:'row'}, {paddingBottom:3}]}>
                    <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign:'left', paddingVertical:2}}>
                        Meal:
                    </Text>
                    <TextInput
                        style={[styles.inputText]}
                        placeholder={mealPlan.lunchMeal ? mealPlan.lunchMeal : 'No food included'}
                        placeholderTextColor="black"
                        onChangeText={(lunchMeal) => setLunchMeal(lunchMeal)}
                    />
                </View> 
                <View style={[styles.inputText, {flexDirection:'row'}, {paddingBottom:3}]}>
                    <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign:'left', paddingVertical:2}}>
                        Ingredients:
                    </Text>
                    <TextInput
                        style={[styles.inputText]}
                        placeholder={mealPlan.lunchIngredients ? mealPlan.lunchIngredients : 'No ingredients included'}
                        placeholderTextColor="black"
                        onChangeText={(lunchIngredients) => setLunchIngredients(lunchIngredients)}
                    />
                </View> 
                <View style={[styles.inputText, {flexDirection:'row'}, {paddingBottom:3}]}>
                    <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign:'left', paddingVertical:2}}>
                        Calories:
                    </Text>
                    <TextInput
                        style={[styles.inputText]}
                        placeholder={mealPlan.lunchCalories ? mealPlan.lunchCalories : 'No calories included'}
                        placeholderTextColor="black"
                        onChangeText={(lunchCalories) => setLunchCalories(lunchCalories)}
                    />
                </View> 
                <View style={[styles.inputText, {flexDirection:'row'}, {paddingBottom:3}]}>
                    <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign:'left', paddingVertical:2}}>
                        Protein:
                    </Text>
                    <TextInput
                        style={[styles.inputText]}
                        placeholder={mealPlan.lunchProtein ? mealPlan.lunchProtein: 'No protein included'}
                        placeholderTextColor="black"
                        onChangeText={(lunchProtein) => setLunchProtein(lunchProtein)}
                    />
                </View>
            </View>

            <View style={{paddingBottom:10}}>
                <View style={{paddingBottom:3}}>
                    <Text style={{fontFamily: "Inter-Medium", fontSize: 20, fontWeight:"800",color:black, textAlign: 'left'}}>
                        Dinner
                    </Text>
                </View>
                <View style={[styles.inputText, {flexDirection:'row'}, {paddingBottom:3}]}>
                    <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign:'left', paddingVertical:2}}>
                        Meal:
                    </Text>
                    <TextInput
                        style={[styles.inputText]}
                        placeholder={mealPlan.dinnerMeal ? mealPlan.dinnerMeal : 'No food included'}
                        placeholderTextColor="black"
                        onChangeText={(dinnerMeal) => setDinnerMeal(dinnerMeal)}
                    />
                </View> 
                <View style={[styles.inputText, {flexDirection:'row'}, {paddingBottom:3}]}>
                    <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign:'left', paddingVertical:2}}>
                        Ingredients:
                    </Text>
                    <TextInput
                        style={[styles.inputText]}
                        placeholder={mealPlan.dinnerIngredients ? mealPlan.dinnerIngredients : 'No ingredients included'}
                        placeholderTextColor="black"
                        onChangeText={(dinnerIngredients) => setDinnerIngredients(dinnerIngredients)}
                    />
                </View> 
                <View style={[styles.inputText, {flexDirection:'row'}, {paddingBottom:3}]}>
                    <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign:'left', paddingVertical:2}}>
                        Calories:
                    </Text>
                    <TextInput
                        style={[styles.inputText]}
                        placeholder={mealPlan.dinnerCalories ? mealPlan.dinnerCalories : 'No calories included'}
                        placeholderTextColor="black"
                        onChangeText={(dinnerCalories) => setDinnerCalories(dinnerCalories)}
                    />
                </View> 
                <View style={[styles.inputText, {flexDirection:'row'}, {paddingBottom:3}]}>
                    <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign:'left', paddingVertical:2}}>
                        Protein:
                    </Text>
                    <TextInput
                        style={[styles.inputText]}
                        placeholder={mealPlan.dinnerProtein ? mealPlan.dinnerProtein: 'No protein included'}
                        placeholderTextColor="black"
                        onChangeText={(dinnerProtein) => setDinnerProtein(dinnerProtein)}
                    />
                </View>
            </View>

            <View style={{paddingBottom:10}}>
                <View style={{paddingBottom:3}}>
                    <Text style={{fontFamily: "Inter-Medium", fontSize: 20, fontWeight:"800",color:black, textAlign: 'left'}}>
                        Snacks
                    </Text>
                </View>
                <View style={[styles.inputText, {flexDirection:'row'}, {paddingBottom:3}]}>
                    <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign:'left', paddingVertical:2}}>
                        Meal:
                    </Text>
                    <TextInput
                        style={[styles.inputText]}
                        placeholder={mealPlan.snacks ? mealPlan.snacks : 'No food included'}
                        placeholderTextColor="black"
                        onChangeText={(snacks) => setSnacks(snacks)}
                    />
                </View> 
                <View style={[styles.inputText, {flexDirection:'row'}, {paddingBottom:3}]}>
                    <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign:'left', paddingVertical:2}}>
                        Calories:
                    </Text>
                    <TextInput
                        style={[styles.inputText]}
                        placeholder={mealPlan.snackCalories ? mealPlan.snackCalories : 'No calories included'}
                        placeholderTextColor="black"
                        onChangeText={(snackCalories) => setSnackCalories(snackCalories)}
                    />
                </View> 
                <View style={[styles.inputText, {flexDirection:'row'}, {paddingBottom:3}]}>
                    <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:black, textAlign:'left', paddingVertical:2}}>
                        Protein:
                    </Text>
                    <TextInput
                        style={[styles.inputText]}
                        placeholder={mealPlan.snackProtein ? mealPlan.snackProtein: 'No protein included'}
                        placeholderTextColor="black"
                        onChangeText={(snackProtein) => setSnackProtein(snackProtein)}
                    />
                </View>
                <View style={{paddingBottom:10}}>
                    <TouchableOpacity style={[styles.TouchableOpacity]}>
                        <Text style={{fontFamily:"Inter-Medium", fontWeight:"600", fontSize: 18, color: "white"}}>
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={[styles.TouchableOpacity]}>
                        <Text style={{fontFamily:"Inter-Medium", fontWeight:"600", fontSize: 18, color: "white"}}>
                            Delete
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
                

        </View>
    );

}

const styles = StyleSheet.create({
    root:{
        padding: 20
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
        height: 28,
        flex: 1,
        marginRight: 10,
        paddingTop:0,
        paddingBottom:0,
        paddingLeft:10,
        fontFamily: "Inter-Medium",
        fontWeight: "800",
        fontSize: 18,
        alignContent: 'center',
        textAlign: 'left',
        borderRadius: 8,
        width: '100%',
        justifyContent:'center'

    },
    inputViewRow:{
        height: 45,
        backgroundColor: "#FFFFFF",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        alignContent: 'center'
    },
    inputTextRow:{
        height: 30,
        flex: 1,
        marginRight: 30,
        padding: 10,
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        fontSize: 14,
        alignContent: 'center',
        textAlign: 'left',
        borderRadius: 8,
        width: '100%'

    },
    TouchableOpacity:{
        height:35,
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

    }
});

export default NutritionMealPlanEditor;