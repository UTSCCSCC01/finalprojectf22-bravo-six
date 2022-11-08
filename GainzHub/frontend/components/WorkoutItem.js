import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TextInput, Button} from 'react-native'
import {Colors} from "../components/colors"
import {TouchableOpacity} from "@gorhom/bottom-sheet"
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';

const WorkoutItem = ({navigation, name, group, id, workoutIdx, workoutSets, handleUpdateSet})=>{
    const [workoutId, setWorkoutId] = useState(id ? id : -1);
    const [workoutName, setWorkoutName] = useState(name ? name : "");
    const [muscleGroup, setMuscleGroup] = useState(group ? group : "");
    const [workoutSet, setWorkoutSet] = useState(workoutSets ? workoutSets : [{setNum:1, lbs: null, reps:null}]); //One set by default

    useEffect(()=>{
        handleUpdateSet(workoutIdx, workoutSet);
    }, [workoutSet])

    useEffect(()=>{
        console.log(workoutIdx);
    }, [])

    const handleAddSet = () => {
        //Get the last set
        let newArr = workoutSet;
        //Remove all letters from input
        const newIdx = workoutSet.length+1;
        newArr = [...newArr, {setNum: newIdx, lbs:null, reps:null}];
        setWorkoutSet(newArr);
    }

    const handleChangeLbs = (newNum, idx) => {
        const newSet = workoutSet;
        //Remove all letters from input
        newNum = newNum.replace(/[^0-9]/g, '');
        newSet[idx-1].lbs = newNum;
        setWorkoutSet([...newSet]);
    }

    const handleChangeReps = (newNum, idx) => {
        const newSet = workoutSet;
        newSet[idx-1].reps = newNum;
        setWorkoutSet([...newSet]);
    }

    const handleRemoveSet = (idx) => {
        //Remove the index from the array
        const newSets = workoutSet;
        newSets.splice(idx-1, 1);
        
        //Reindex sets
        for(let i = 0; i < newSets.length; i++){
            newSets[i].setNum = i+1;
        }
        setWorkoutSet([...newSets]);
    }

    const renderSets = ({item})=>(
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"100%"}}>
                <View style={[styles.textInputView, {display:"flex", justifyContent:"center"}]}>
                    <Text style={[styles.setInput ,{fontFamily:"Inter-Medium", fontWeight:800, textAlign: 'center'}]}>
                        {item.setNum}
                    </Text>
                </View>
                <View style={[styles.textInputView, {display:"flex", justifyContent:"center"}]}>
                    <TextInput style={[styles.setInput ,{fontFamily:"Inter-Medium", fontWeight:800, textAlign: 'center'}]}
                        value={item.lbs == null ? "" : item.lbs}
                        onChangeText={(text)=>{handleChangeLbs(text, item.setNum)}}
                        maxLength={5}/>
                </View>

                <View style={[styles.textInputView, {display:"flex", justifyContent:"center"}]}>
                    <TextInput style={[styles.setInput ,{fontFamily:"Inter-Medium", fontWeight:800, textAlign: 'center'}]}
                    value={item.reps == null ? " " : item.reps}
                    onChangeText={(text)=>{handleChangeReps(text, item.setNum)}}
                    maxLength={5}/>
                </View>

                <View style={[styles.textInputView ,{display:"flex", justifyContent:'center', alignItems:"center"}]}>
                    <TouchableOpacity style={styles.setInput} onPress={()=>{handleRemoveSet(item.setNum)}}>
                            <View style={{width:23, height:6, backgroundColor: "#7a7979", borderRadius:20, borderWidth:1, borderColor:"#a8a8a8"}}/>
                    </TouchableOpacity>
                </View>
            </View>);


    return(
        <View style={[styles.workoutContainer]}>
            <View style={{fontFamily:"Inter-Medium", display:"flex", flexDirection:"column"}}>
                <Text style={{fontFamily:"Inter-Medium", fontWeight:800, color:Colors.maroon}}>
                    {workoutName}
                </Text>

                <FlatList
                    contentContainerStyle={{justifyContent: "space-evenly"}}
                    ListHeaderComponent={                
                        <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"98.5%", 
                        marginBottom:10, marginTop:10}}>
                            <Text style={{fontFamily:"Inter-Medium", fontWeight:800}}>Set</Text>
                            <Text style={{fontFamily:"Inter-Medium", fontWeight:800}}>lbs</Text>
                            <Text style={{fontFamily:"Inter-Medium", fontWeight:800}}>Reps</Text>
                            <Text style={{fontFamily:"Inter-Medium", fontWeight:800}}>{"    "}</Text>
                        </View>}
                    data={workoutSet}
                    renderItem={renderSets}
                    ItemSeparatorComponent={() => <View style={{height: 5}} />}
                    keyExtractor={item=>item.setNum}
                    scrollEnabled={true}
                />
                <View style={{marginTop: 10, marginBottom:10}}>
                    <TouchableOpacity style={[styles.setInput, {display:"flex", justifyContent:"center" }]}
                        onPress={()=>{handleAddSet()}}>
                            <Text style={{fontFamily:"Inter-Medium", fontWeight:800, textAlign:'center'}}>+ Add Set</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    workoutContainer:{
        padding:20,
        borderRadius:15,
    },
    setInput:{
        backgroundColor:"#e0dede",
        borderRadius:5,
        flex: 1
    },
    textInputView:{
        minWidth:40,
        maxWidth: 50
    }
})
export default WorkoutItem;