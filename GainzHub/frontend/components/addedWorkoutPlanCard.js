import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, Switch, TouchableOpacity, Animated, Easing} from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import { Card, Paragraph, Button as But} from 'react-native-paper'
import {Colors} from '../components/colors'
import axios from 'axios';

const {maroon} = Colors;

const AddedWorkoutPlanCard = ({navigation, plan}) => {
    const [user, setUser] = useState({});
    const [currUser, setCurrUser] = useState({});
    const [plann, setPlann] = useState({});
    const [planUser, setPlanUser] = useState({});
    const isFocused = useIsFocused();
    
    const dict = {true: 'Unpublish', false: 'Publish'};

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

    useEffect(() => {
        async function getPlanFromID()  {
            try{
                const response = await axios.get("http://localhost:5001/workout/getWorkoutPlan", {params: {workoutPlanID: plan}});
                setPlann(response.data);
            }catch(err){
                console.log(err);
            }
        } 
        getPlanFromID();   
    }, [isFocused]);

    useEffect(() =>{
        const getPlanUser = async() =>{
            try{ 
                const response = await axios.get("http://localhost:5001/user/getUserFromWorkoutPlan",
                {
                    params:{
                        userID: plann.userId,
                    }
                });
                setPlanUser(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        getPlanUser();
    }, []);

    const handlePress = async() => {
        try{
            const token = await AsyncStorage.getItem("userData");
            const response = await axios.patch("http://localhost:5001/user/removePublishedWorkoutPlan", {workoutPlanId: plan},
            {
                headers: {
                    "x-auth-token": token
                }
            });
            console.log(response.data);
        } catch (err){
            console.log(err);
        }
    }

    return(
        <View style={{display: 'flex', paddingRight:10}}>
            <Card onPress = {() => navigation.navigate("WorkoutPlanInfo", {plan: plann})} style={styles.planCardContainer} elevation={5}>
                <Card.Title title = {plann.planName} />
                <Card.Content style={{display: 'flex',  minHeight:"60%", height:"60%"}}>
                    <Text style = {{color: maroon, fontStyle: 'bold'}}>{planUser ? planUser.username : "lxol"}</Text>
                    <But style = {styles.button} 
                    mode = 'contained'
                    onPress = {handlePress} 
                    >
                    Remove
                    </But>
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

export default AddedWorkoutPlanCard;