import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { lstat } from 'fs';
import React, {useState, useEffect} from 'react'
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Colors } from '../components/colors';

const {maroon} = Colors

const WorkoutPlanInfo = ({route, navigation}) =>{
    const [workoutPlan, setWorkoutPlan] = useState({});
    const [workoutOBJ, setWorkoutOBJ] = useState({});
    const isFocused = useIsFocused();


    const {planName, description, workouts} = route.params.plan;
    console.log(workouts);

    useEffect(() =>{
        const getWorkout = async() =>{
            let temp = [];
            for(let workout of workouts){
                let temp2 = {};
                try{
                    const response = await axios.get("http://localhost:5001/workout/getWorkout", { params:{ workoutId: workout.workoutId }});
                    temp2.name = response.data.Workout;
                    temp2.muscle = response.data.MuscleGroup;
                    temp2.sets = workout.sets;
                    temp.push(temp2);
                } catch (err) { 
                    console.log(err);
                }  
            }
            setWorkoutOBJ(temp);
        }
        getWorkout();
    }, [isFocused]);

    console.log(workoutOBJ);
    const renderWorkouts = ({item}) => (
        <View style = {{marginTop: '25px'}}>
            <Text style = {styles.workoutHeader}>{item.name}</Text>
            <Text style = {[styles.workoutHeader, {fontSize: '16px'}]}>{item.muscle}</Text>
            <View style = {{marginTop: '10px'}}>
                <Text style = {styles.sets}>Sets: {item.sets.length}</Text>
                {item.sets.map((set,idx) => {
                    return(
                        <Text key = {idx}style= {styles.sets}>Set {idx+1} - {set.reps} Reps ({set.lbs}lbs)</Text>
                    );
                })}
            </View>
 
        </View>
    );
    return (
        <View>
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
                <View>
                    <Text style = {styles.headerText}>
                        {planName}
                    </Text>
                    <Text style = {[styles.headerText, {fontSize: 24}]}>
                        {description}
                    </Text>
                </View>
            </View>

            <ScrollView>
                <FlatList
                data = {workoutOBJ}
                renderItem = {renderWorkouts}
                />
            </ScrollView>
        </View> 
    );
}


const styles = StyleSheet.create({
    headerText: {
        fontFamily: "Inter-Medium", 
        fontSize: 36,
        fontWeight:"800",
        color: maroon,
        textAlign:'center',
        marginBottom:10
    },
    workoutHeader:{
        fontFamily: "Inter-Medium", 
        fontSize: 20,
        fontWeight:"800",
        color: maroon,
        textAlign:'center',
    },
    sets:{
        fontFamily: "Inter-Medium", 
        fontSize: 16,
        fontWeight:"800",
        color: '#000000',
        textAlign:'center',
    }
});
export default WorkoutPlanInfo;
