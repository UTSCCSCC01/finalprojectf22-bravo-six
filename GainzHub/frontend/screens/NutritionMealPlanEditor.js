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
    const [mealPlan, setMealPlan] = useState({});
    //console.log(mealPlan);

    useEffect(() => {
        const getMealPlan = async() => {
            //console.log(route.params.obj);
            const mealPlanObj = await axios.get("http://localhost:5001/nutrition/getMealPlan", {params:{mealPlanId: route.params.obj._id}});
            //console.log(mealPlanObj.data);
            setMealPlan(mealPlanObj.data);
        }
        getMealPlan();
    }, [isFocused]);



    const isFocused = useIsFocused();

    
    

    const editMealPlan = async() => {
        //check that all fields have values

        //errors could be checked later, right now i want functionality done
        /*
        let currFormErrors = {"planName": "",
            "breakfastMeal": "",
            "breakfastIngredients": "",
            "breakfastCalories": "",
            "breakfastProtein": "",
            "lunchMeal": "",
            "lunchIngredients": "",
            "lunchCalories": "",
            "lunchProtein": "",
            "dinnerMeal": "",
            "dinnerIngredients": "",
            "dinnerCalories": "",
            "dinnerProtein": "",
            "snacks": "",
            "snackCalories": "",
            "snackProtein": ""
        };

        if(planName.length == 0){
            currFormErrors['planName'] = 'Please enter a Name';
        }
        
        if(breakfastMeal.length == 0){
            currFormErrors['breakfastMeal'] = 'Please enter a Breakfast Meal';
        }

        if(breakfastCalories.length == 0){
            currFormErrors['breakfastCalories'] = 'Please enter Breakfast Calories';
        }

        if(breakfastProtein.length == 0){
            currFormErrors['breakfastProtein'] = 'Please enter Breakfast Protein';
        }

        if(lunchMeal.length == 0){
            currFormErrors['lunchMeal'] = 'Please enter a Lunch Meal';
        }

        if(lunchCalories.length == 0){
            currFormErrors['lunchCalories'] = 'Please enter Lunch Calories';
        }

        if(lunchProtein.length == 0){
            currFormErrors['lunchProtein'] = 'Please enter Lunch Protein';
        }

        if(dinnerMeal.length == 0){
            currFormErrors['dinnerMeal'] = 'Please enter a Dinner Meal';
        }

        if(dinnerCalories.length == 0){
            currFormErrors['dinnerCalories'] = 'Please enter Dinner Calories';
        }

        if(dinnerProtein.length == 0){
            currFormErrors['dinnerProtein'] = 'Please enter Dinner Protein';
        }

        if(snacks.length == 0){
            currFormErrors['snacks'] = 'Please enter some snacks';
        }

        if(snackCalories.length == 0){
            currFormErrors['snackCalories'] = 'Please enter Snack Calories';
        }

        if(snackProtein.length == 0){
            currFormErrors['snackProtein'] = 'Please enter Snack Protein';
        }

        setFormErrors(currFormErrors);

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
        */

        //console.log("help");
        // add calories to user.calorieGoal in the database
        const token = await AsyncStorage.getItem("userData");

        const response = await axios.put('http://localhost:5001/nutrition/editMealPlan',
                                        {updatedMealPlan: mealPlan}, {
            headers:{
                "x-auth-token": token,
            }
        });
        //console.log("hep");

        if(response.status == 200){
            Toast.show("Success!", {
                duration: Toast.durations.SHORT,
            })
        }
        else{
            Toast.show("Could not update meal plan", {
                duration: Toast.durations.SHORT,
            })
        }
    };

    const deleteMealPlan = async() => {
        const token = await AsyncStorage.getItem("userData");
        // delete cant use request bodies so ill just use post for now.
        const response = await axios.post('http://localhost:5001/nutrition/deleteMealPlan',
                                        {deletedMealPlan: mealPlan}, {
            headers:{
                "x-auth-token": token,
            }
        });
        //console.log("hep");

        if(response.status == 200){
            Toast.show("Success!", {
                duration: Toast.durations.SHORT,
            })
        }
        else{
            Toast.show("Could not update meal plan", {
                duration: Toast.durations.SHORT,
            })
        }

        //navigation.navigate("Nutrition");
    }

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
                    onChangeText={(planName) => setMealPlan(previousState => { return {...previousState, planName: planName}})}
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
                        onChangeText={(breakfastMeal) => setMealPlan(previousState => { return {...previousState, breakfastMeal: breakfastMeal}})}
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
                        onChangeText={(breakfastIngredients) => setMealPlan(previousState => { return {...previousState, breakfastIngredients: breakfastIngredients}})}
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
                        onChangeText={(breakfastCalories) => setMealPlan(previousState => { return {...previousState, breakfastCalories: breakfastCalories}})}
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
                        onChangeText={(breakfastProtein) => setMealPlan(previousState => { return {...previousState, breakfastProtein: breakfastProtein}})}
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
                        onChangeText={(lunchMeal) => setMealPlan(previousState => { return {...previousState, lunchMeal: lunchMeal}})}
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
                        onChangeText={(lunchIngredients) => setMealPlan(previousState => { return {...previousState, lunchIngredients: lunchIngredients}})}
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
                        onChangeText={(lunchCalories) => setMealPlan(previousState => { return {...previousState, lunchCalories: lunchCalories}})}
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
                        onChangeText={(lunchProtein) => setMealPlan(previousState => { return {...previousState, lunchProtein: lunchProtein}})}
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
                        onChangeText={(dinnerMeal) => setMealPlan(previousState => { return {...previousState, dinnerMeal: dinnerMeal}})}
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
                        onChangeText={(dinnerIngredients) => setMealPlan(previousState => { return {...previousState, dinnerIngredients: dinnerIngredients}})}
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
                        onChangeText={(dinnerCalories) => setMealPlan(previousState => { return {...previousState, dinnerCalories: dinnerCalories}})}
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
                        onChangeText={(dinnerProtein) => setMealPlan(previousState => { return {...previousState, dinnerProtein: dinnerProtein}})}
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
                        onChangeText={(snacks) => setMealPlan(previousState => { return {...previousState, snacks: snacks}})}
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
                        onChangeText={(snackCalories) => setMealPlan(previousState => { return {...previousState, snackCalories: snackCalories}})}
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
                        onChangeText={(snackProtein) => setMealPlan(previousState => { return {...previousState, snackProtein: snackProtein}})}
                    />
                </View>
                <View style={{paddingBottom:10}}>
                    <TouchableOpacity onPress={editMealPlan} style={[styles.TouchableOpacity]}>
                        <Text style={{fontFamily:"Inter-Medium", fontWeight:"600", fontSize: 18, color: "white"}}>
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={deleteMealPlan} style={[styles.TouchableOpacity]}>
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