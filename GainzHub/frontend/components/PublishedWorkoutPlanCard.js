//Workout plan card for workout plans page
import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TextInput, Button} from 'react-native'
import { Card, Paragraph, Button as But} from 'react-native-paper'
import {Colors} from "../components/colors"
import {TouchableOpacity} from "@gorhom/bottom-sheet"
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage'

const {maroon} = Colors;

const PublishedWorkoutPlanCard = ({navigation, plan, planName, userId, planPrivacy, planDescription}) => {
    const [privacy, setPrivacy] = useState(plan.planPrivacy);
    const [user, setUser] = useState({});
<<<<<<< HEAD
    const [currUser, setCurrUser] = useState({});
=======
>>>>>>> deef618 (BRAV-11 Completed Workout Explore)
    const isFocused = useIsFocused();

    const dict = {true: 'Unpublish', false: 'Publish'};

<<<<<<< HEAD

=======
>>>>>>> deef618 (BRAV-11 Completed Workout Explore)
    useEffect(() =>{
        const getUser = async() =>{
            try{ 
                const response = await axios.get("http://localhost:5001/user/getUserFromWorkoutPlan",
                {
                    params:{
                        userID: userId,
                    }
                });
                setUser(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        getUser();
    }, [isFocused]);


<<<<<<< HEAD
    useEffect(() => {
        async function getCurrentUser()  {
            try{
                const token = await AsyncStorage.getItem('userData');
                const response = await axios.get("http://localhost:5001/user/getUserSecure", {
                    headers: {
                        "x-auth-token": token
                    }
                });
                setCurrUser(response.data);
            }catch(err){
                console.log(err);
            }
        } 
        getCurrentUser();   
    }, [isFocused]);


    const handlePress = () => {
        console.log("pressed");
    }

    const renderButton = () => {
        if(currUser._id != user._id){
            return(
                <But style = {styles.button} 
                mode = 'contained'
                onPress = {handlePress}  
                >
                Add
                </But>
            );
        }
    }

    return(
        <View style={{display: 'flex', paddingRight:10}}>
            <Card onPress = {() => navigation.navigate("WorkoutPlanInfo", {plan: plan})} style={styles.planCardContainer} elevation={5}>
                <Card.Title title = {plan.planName}/>
                <Card.Content style={{display: 'flex',  minHeight:"60%", height:"60%"}}>
                    <Text style = {{color: maroon, fontStyle: 'bold'}}>{user.username}</Text>

                    {renderButton()}
=======



    return(
        <View style={{display: 'flex', paddingRight:10}}>
            <Card style={styles.planCardContainer} elevation={5}>
                <Card.Title title = {plan.planName}/>
                <Card.Content style={{display: 'flex',  minHeight:"60%", height:"60%"}}>
                    <Text style = {{color: maroon}}>{user.username}</Text>
>>>>>>> deef618 (BRAV-11 Completed Workout Explore)
                </Card.Content>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    planCardContainer: {
        width:'10em',
        height:"10em",
        borderRadius:10,
        borderWidth: 3,
        borderColor:'#545454',
        display: "flex",
        flexDirection:"column",
    },
    button:{
        marginTop: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2px',
        backgroundColor: 'black'
    }
});

export default PublishedWorkoutPlanCard;