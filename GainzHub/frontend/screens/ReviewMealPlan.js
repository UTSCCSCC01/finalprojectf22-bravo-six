import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Button, FlatList, SafeAreaView, Image} from 'react-native'
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


const ReviewMealPlan = ({route, navigation}) => {
    const [mealPlan, setMealPlan] = useState({});
    const [mealPlanId, setMealPlanId] = useState();
    const isFocused = useIsFocused();
    const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
    const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';
    const [defaultRating, setdefaultRating] = useState(2);
    const [maxRating, setMaxRating] = useState([1,2,3,4,5]);
    const CustomerRatingBar = () => {
        return(
            <View style = {styles.customRatingBarStyle}>
                {
                    maxRating.map((item, key) =>{
                        return (
                            <TouchableOpacity
                                activeOpacity = {0.7}
                                key = {item}
                                onPress={() => setdefaultRating(item)}
                            >
                                <Image 
                                    style={styles.starImgStyle}
                                    source={
                                        item <= defaultRating
                                            ? {uri: starImgFilled}
                                            : {uri: starImgCorner}
                                    }
                                />
                            </TouchableOpacity>
                        )
                    }) 
                }
            </View>
        )
    };


    const editReview = async() => {
        // add calories to user.calorieGoal in the database


        const token = await AsyncStorage.getItem("userData");
        console.log("HI");
        const response = await axios.post('http://localhost:5001/nutrition/editReview',
                                        {review: 1}, {
            headers:{
                "x-auth-token": token,
            }
        });

        

    };

    useEffect(() => {
        const getMealPlan = async() => {
            console.log(route.params.obj);
            const mealPlanObj = await axios.get("http://localhost:5001/nutrition/getMealPlan", {params:{mealPlanId: route.params.obj._id}});
            console.log(mealPlanObj.data);
            setMealPlan(mealPlanObj.data);
        }
        getMealPlan();
    }, [isFocused]);


    return(
        <View style={[styles.root, {paddingLeft: 20}]}>
            <View style={{flexDirection:'row', textAlign:'left', paddingBottom: 10}}>
                <View>
                    <TouchableOpacity onPress={()=> navigation.pop()}>
                        <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                            Back
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 36, fontWeight:"800",color:maroon, textAlign:'center', marginBottom:10}}>
                    Meal Plan: {mealPlan.planName}
                </Text>
            </View>

            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 24, fontWeight:"800",color:black, textAlign: 'center', marginBottom:10}}>
                    Total Calories: {mealPlan.breakfastCalories + mealPlan.lunchCalories + mealPlan.dinnerCalories + mealPlan.snackCalories}
                </Text>
            </View>

            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 24, fontWeight:"800",color:black, textAlign: 'center', marginBottom:10}}>
                    Total Protein: {mealPlan.breakfastProtein + mealPlan.lunchProtein + mealPlan.dinnerProtein + mealPlan.snackProtein} g
                </Text>
            </View>  
            <CustomerRatingBar/>
            <Text style={styles.textStyle}>
                {defaultRating + ' / ' + maxRating.length}
            </Text>

            <TouchableOpacity style={styles.buttonStyle} onPress={editReview}>
                <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                Review
                </Text>
            </TouchableOpacity>

        </View>


    );

}

const styles = StyleSheet.create({
    root:{
        padding: 30
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
        fontSize: 14,
        alignContent: 'center',
        textAlign: 'left',
        borderRadius: 8,
        width: '100%'

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
        height:40,
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
    customRatingBarStyle:{
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30
    },
    starImgStyle:{
        width: 40,
        height: 40,
        resizeMode: 'cover'
    },
    buttonStyle:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green'
    }

});

export default ReviewMealPlan;