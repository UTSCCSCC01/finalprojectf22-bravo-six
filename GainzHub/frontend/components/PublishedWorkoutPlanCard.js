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
    const isFocused = useIsFocused();

    const dict = {true: 'Unpublish', false: 'Publish'};

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





    return(
        <View style={{display: 'flex', paddingRight:10}}>
            <Card style={styles.planCardContainer} elevation={5}>
                <Card.Title title = {plan.planName}/>
                <Card.Content style={{display: 'flex',  minHeight:"60%", height:"60%"}}>
                    <Text style = {{color: maroon}}>{user.username}</Text>
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2px',

    }
});

export default PublishedWorkoutPlanCard;