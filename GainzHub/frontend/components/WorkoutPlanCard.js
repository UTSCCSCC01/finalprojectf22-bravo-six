//Workout plan card for workout plans page
import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TextInput, Button} from 'react-native'
import { Card, Paragraph, Button as But} from 'react-native-paper'
import {Colors} from "../components/colors"
import {TouchableOpacity} from "@gorhom/bottom-sheet"
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';

const WorkoutPlanCard = ({workoutId, priv, planName, planDescription, profile}) => {
    const [isPrivate, setIsPrivate] = useState(true);
    const isFocused = useIsFocused();

    useEffect(()=>{
        async function getPrivate(){
            const mealPlanObj = await axios.get("http://localhost:5001/workout/getprivate", {params:{workoutPlanId: workoutId}});
            try{
                setIsPrivate(mealPlanObj.data.private);
            }
            catch{
                setIsPrivate(false);
            }
        }
        getPrivate();
    }, [isFocused])



    const handlePrivateWrapper = async() => {
        if(isPrivate){
            await axios.patch("http://localhost:5001/workout/unPrivateWorkout", {mealPlanId: workoutId});
            setIsPrivate(false);
        }
        else{
            await axios.patch("http://localhost:5001/workout/privateWorkout", {mealPlanId: workoutId});
            setIsPrivate(true);
        }
    }


    if(profile){
        return(
            <View style={[{flexDirection: 'row'}, {display: 'flex'}, {justifyContent: 'space-between'}, {paddingHorizontal: 5}]}>
                <Card style={[styles.planCardContainer, {width: '75%'}]} elevation={5}>
                <Card.Title title = {planName}/>
                <Card.Content style={{minHeight:"90%",height:"90%"}}>
                    <Paragraph  style={{overflow:"scroll", width:100,flexWrap:"wrap"}}>
                        {planDescription }
                    </Paragraph>
                </Card.Content>
                </Card>
    
                <TouchableOpacity onPress={()=> handlePrivateWrapper()} style={[styles.TouchableOpacityList]} >
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:14, color: "white"}}>
                        {isPrivate ? "Private" : "Public"}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
 
    const [privacy, setPrivacy] = useState(planPrivacy);
    
    const togglePrivacy = () =>{
        setPrivacy(priv => !priv);
    }

    const dict = {true: 'Unpublish', false: 'Publish'};
    
    return(
        <View style={{display: 'flex', paddingRight:10}}>
            <Card style={styles.planCardContainer} elevation={5}>
                <Card.Title title = {planName}/>
                <Card.Content style={{display: 'flex',  minHeight:"60%", height:"60%"}}>
                    <Paragraph  style={{overflow:"scroll", width:100,flexWrap:"wrap"}}>
                        {planDescription }
                    </Paragraph>
                    <But
                    style = {styles.button} 
                    mode = 'contained' 
                    buttonColor = {Colors.maroon}
                    onPress = {togglePrivacy}>{dict[privacy]}</But>
                </Card.Content>
            </Card>
        </View>

    );
}

const styles = StyleSheet.create({
    planCardContainer: {
        width:'80%',
        height:"100%",
        borderRadius:10,
        borderWidth: 3,
        borderColor:'#545454',
        display: "flex",
        flexDirection:"column",
    },
    TouchableOpacityList:{
        height:35,
        width:'100%',
        borderRadius: 30,
        marginTop: 8,
        backgroundColor: '#8D0A0A',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default WorkoutPlanCard;