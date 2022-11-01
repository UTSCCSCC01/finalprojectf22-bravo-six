import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Button} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import Toast from 'react-native-root-toast';

const PublishedMeal = ({mealPlanId, navigation}) => {
    const [obj, setObj] = useState({planName: "", published: false});
    const [creator, setCreator] = useState({username: ""}) //Creator of the meal plan
    const [user, setUser] = useState({}); //Current user
    const [addedText, setAddedText] = useState("Get");
    const [added, setAdded] = useState(false);
    const [owner, setOwner] = useState(false); //Is this current meal plan owned by the current user?
    const isFocused = useIsFocused();
    
    useEffect(()=>{
        async function intializeUseStates(){
            const mealPlanObj = await axios.get("http://localhost:5001/nutrition/getMealPlan", {params:{mealPlanId: mealPlanId}});
            setObj(mealPlanObj.data);

            const token = mealPlanObj.data.userId;
            const userInfo = await axios.get("http://localhost:5001/user/getUser", {
                headers: {
                    'x-auth-token': token,
                }
            })
            setCreator(userInfo.data);

            const jwtToken = await AsyncStorage.getItem("userData");
            
            const currentUser = await axios.get("http://localhost:5001/user/getUserSecure", {
                headers: {
                    'x-auth-token': jwtToken,
                }
            })
            console.log(currentUser.data);
            setUser(currentUser);

            //Check if the meal plan was already added or if it was created by them
            if(mealPlanObj.data.userId == currentUser.data._id){
                setOwner(true);
            }
            else if(currentUser.data.exploreMealPlans.includes(mealPlanId)){
                console.log("sdff");
                setAdded(true);
            }
        }
        intializeUseStates();
    }, [isFocused])

    useEffect(() => {
        if(added){
            setAddedText("Added");
        }
        else{
            setAddedText("Get");
        }
    }, [added])

    useEffect(() =>{
        if(owner){
            setAddedText("Owner");
        }
    }, [owner]);

    const handleAddClick = async () =>{
        const jwtToken = await AsyncStorage.getItem("userData");
        console.log(jwtToken);
        if(added && !owner){
            //Remove meal plan from collection
            const result = await axios.patch("http://localhost:5001/user/removeAddedPlan", {mealPlanId: mealPlanId}, {
                headers: {
                    'x-auth-token': jwtToken,
                }
            })

            if(result.status == 200){
                Toast.show("Unadded Plan", {
                    duration: Toast.durations.SHORT,
                });
                setAdded(false);
            }
            else{
                Toast.show("Error unadding", {
                    duration: Toast.durations.SHORT,
                });
            }
        }
        else if(!owner){
            //Add meal plan
            const result = await axios.patch("http://localhost:5001/user/addExplorePlan", {mealPlanId: mealPlanId}, {
                headers: {
                    'x-auth-token': jwtToken,
                }
            })

            if(result.status == 200){
                Toast.show("Added Plan", {
                    duration: Toast.durations.SHORT,
                });
                setAdded(true);
            }
            else{
                Toast.show("Error adding", {
                    duration: Toast.durations.SHORT,
                });
            }
        }
    }

    return (
        <View style={[{flexDirection: 'row'}, {display: 'flex'}, {justifyContent: 'space-between'}, {paddingHorizontal: 5}]}>
            
            <TouchableOpacity onPress={()=> navigation.navigate('NutritionMealPlanInfo', {obj})} style={[styles.inputView, {width: '75%'}]}>
                <Text style={styles.inputText}>{obj.planName}</Text>
                <Text style={styles.inputText}>
                    Creator: {creator.username}
                </Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={()=> handleAddClick()} style={[styles.TouchableOpacityList]} >
                <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:14, color: "white"}}>
                    {addedText}
                </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    inputView:{
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
    TouchableOpacityList:{
        height:35,
        width:'23%',
        borderRadius: 30,
        marginTop: 8,
        backgroundColor: '#8D0A0A',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
export default PublishedMeal;