import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TextInput, Button} from 'react-native'
import {TouchableOpacity} from "@gorhom/bottom-sheet"
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

const WorkoutSearchItem = ({navigation, name, group, id, selected, handleSelect})=>{
    const [workoutId, setWorkoutId] = useState(id ? id : -1);
    const [workoutName, setWorkoutName] = useState(name ? name : "");
    const [muscleGroup, setMuscleGroup] = useState(group ? group : "");
    const [selectedIdx, setSelectedIdx] = useState(0);

    const colors = ["#faebeb","#ed7979"]

    useEffect(()=>{
        if(selected){
            setSelectedIdx(1);
        }
        else{
            setSelectedIdx(0);
        }
    },[])
    
    const handleSelectItem = ()=>{
        //Flip selected idx
        if(selectedIdx == 0){
            selected = true;
            setSelectedIdx(1);
            //Add to list of selected workouts
            handleSelect(workoutId, "add")
        }
        else{
            selected = false;
            setSelectedIdx(0);
            //Remove workout from list of selected
            handleSelect(workoutId, "remove")
        }
    }

    return(
        <View style={[styles.workoutContainer, {backgroundColor:colors[selectedIdx]}]}>
            <TouchableOpacity style={{fontFamily:"Inter-Medium", display:"flex", flexDirection:"column", alignItems:'center'}}
                            onPress={()=>handleSelectItem()}
            >
                <Text style={{fontFamily:"Inter-Medium"}}>
                    {workoutName}
                </Text>
                <Text style={{fontFamily:"Inter-Medium", color: "#6e6767"}}>
                    {muscleGroup}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    workoutContainer:{
        width:400,
        height:60,
        padding:20,
        borderRadius:15,
    }
})
export default WorkoutSearchItem;