import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TextInput, Button} from 'react-native'
import {Colors} from "../components/colors"
import {TouchableOpacity} from "@gorhom/bottom-sheet"
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';

const WorkoutItem = ({navigation, name, group, id})=>{
    const [workoutId, setWorkoutId] = useState(id ? id : -1);
    const [workoutName, setWorkoutName] = useState(name ? name : "");
    const [muscleGroup, setMuscleGroup] = useState(group ? group : "");
    const [workoutSet, setWorkoutSet] = useState([{setNum:1, lbs: null, reps:null}]); //One set by default

    const handleAddSet = () => {
        //Get the last set
        let newArr = workoutSet;
        const newIdx = workoutSet.length+1;
        newArr = [...newArr, {setNum: newIdx, lbs:null, reps:null}];
        setWorkoutSet(newArr);
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
                        defaultValue={item.lbs == null ? "" : item.lbs}
                        maxLength={5}/>
                </View>

                <View style={[styles.textInputView, {display:"flex", justifyContent:"center"}]}>
                    <TextInput style={[styles.setInput ,{fontFamily:"Inter-Medium", fontWeight:800, textAlign: 'center'}]}
                    defaultValue={item.reps == null ? " " : item.reps}
                    maxLength={5}/>
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
                        </View>}
                    data={workoutSet}
                    renderItem={renderSets}
                    ItemSeparatorComponent={() => <View style={{height: 5}} />}
                    keyExtractor={item=>item.setNum}
                    scrollEnabled={true}
                />
                <TouchableOpacity style={[styles.setInput, {display:"flex", justifyContent:"center", marginTop:10, marginBottom:10}]}
                    onPress={()=>{handleAddSet()}}>
                        <Text style={{fontFamily:"Inter-Medium", fontWeight:800, textAlign:'center'}}>+ Add Set</Text>
                </TouchableOpacity>
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