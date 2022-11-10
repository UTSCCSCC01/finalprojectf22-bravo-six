import React, {useState, useEffect, useRef, useMemo} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, Button, SafeAreaView} from 'react-native'
import {FlatList, ScrollView} from "react-native-gesture-handler";
import {TextInput} from 'react-native-paper'
import {Colors} from '../components/colors'
import BottomSheet from "@gorhom/bottom-sheet";
import { Searchbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import {MaterialCommunityIcons} from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from 'axios';
import Toast from 'react-native-root-toast';
import { loginUser } from '../requests/userRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import { useIsFocused } from '@react-navigation/native';
import WorkoutSearchItem from '../components/WorkoutSearchItem';
import WorkoutItem from '../components/WorkoutItem';

const {maroon, black} = Colors;

const WorkoutAddPlan = ({navigation: {goBack}}) => {
    const [planName, setPlanName] = useState("");
    const [description, setDescription] = useState("");
    const [workouts, setWorkouts] = useState([]); //Workouts that are added to our plan
    const [searchText, setSearchText] = useState("");
    const [searchWorkouts, setSearchWorkouts] = useState([]);
    const [selectedWorkouts, setSelectedWorkouts] = useState([]) //Array of workout ids of workouts that were selected
    const [bottomSheetIdx, setBottomSheetIdx] = useState(-1);
    const snapPoints = useMemo(() => ['70%', '70%'], []);
    const bottomSheetRef = useRef(null);

    const renderWorkouts = ({item}) => (<View>
        <WorkoutItem navigation={navigation} name={item.workoutData.Workout} group ={item.MuscleGroups} id={item._id}
            workoutIdx = {item.workoutIdx}
            workoutSets={item.sets}
            handleUpdateSet={handleUpdateSet}/>
    </View>);

    const handleSelectWorkout = (id, method)=>{
        if(method == "add"){
            setSelectedWorkouts([...selectedWorkouts, id]);
        }
        else{
            const tempArr = selectedWorkouts;
            const removeIdx = tempArr.indexOf(id);
            if(removeIdx != -1){
                tempArr.splice(removeIdx, 1);
            }
            setSelectedWorkouts([...tempArr]);
        }
    }

    const handleUpdateSet = (workoutIdx, newSets) =>{
        const newWorkouts = workouts;
        newWorkouts[workoutIdx].sets = newSets;
        console.log(newWorkouts);
        setWorkouts(newWorkouts);
    }

    const handleAddSelectedWorkouts = async() => {
        //populate workout array with workout ids from selected workouts
        tempArr = workouts;
        for(const id of selectedWorkouts){
            const workoutData = await axios.get("http://localhost:5001/workout/getWorkout", {
                params:{
                    workoutId: id,
                }
            });
            if(workoutData.status == 200){
                tempArr = [...tempArr, {workoutData: workoutData.data, workoutId: id, workoutIdx: selectedWorkouts.indexOf(id), sets:null}];
            }
        }
        setWorkouts(tempArr);
        setSearchText("");
        setSearchWorkouts([]);
        setSelectedWorkouts([]);
    }

    const renderSearch = ({item}) => (
        <WorkoutSearchItem navigation={navigation} name={item.Workout} id = {item._id} 
        group={item.MuscleGroup} selected={selectedWorkouts.includes(item._id)}
         handleSelect={handleSelectWorkout}/>
    )

    const handleAddWorkoutClick = () => {
        //Expand the bottom sheet
        bottomSheetRef.current.expand();
        bottomSheetRef.current.snapToIndex(1);
    }

    const handleCloseBottomSheet = () =>{
        bottomSheetRef.current.close();
    }

    const handleSearch = async (text) => {
        setSearchText(text);
        
        const searchResults = await axios.get("http://localhost:5001/workout/searchWorkouts", {
            params:{
                query: text
            }
        })
        setSearchWorkouts(searchResults.data);
    }

    return(
        <View style={[styles.root, {paddingLeft: 20}]}>
            <View style={{flexDirection:'row', justifyContent:'left', paddingBottom: 5}}>
                <View style = {{paddingRight: 50}}>
                    <TouchableOpacity onPress={() => goBack()}>
                        <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                            Back
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 22, fontWeight:"800",color:maroon, margin:20}}>
                    Create Workout Plan
                </Text>
                <TextInput
                    style = {[styles.textInputLine]}
                    activeUnderlineColor={Colors.maroon} 
                    mode = "flat" label = "Plan Name"
                    value = {planName}
                    theme={{colors:{
                        placeholder: "#BC0B0B"
                    }, fonts:{
                        regular:{
                            fontFamily:"Inter-Medium"
                        }
                    }}}
                    onChangeText={(name)=>setPlanName(name)}/>
                <TextInput
                    style = {[styles.textInputLine]}
                    activeUnderlineColor={Colors.maroon} 
                    mode = "flat" label = "Description"
                    value = {description}
                    theme={{colors:{
                        placeholder: "#BC0B0B"
                    }, fonts:{
                        regular:{
                            fontFamily:"Inter-Medium"
                        }
                    }}}
                    onChangeText={(desc)=>setDescription(desc)}/>
                <ScrollView style={{flexGrow: 0, maxHeight: 500, minHeight:0}}>
                    <FlatList
                        data={workouts}
                        renderItem={renderWorkouts}
                        keyExtractor={item => item._id}
                        scrollEnabled={true}
                    />
                </ScrollView>
                <View style={{paddingBottom:15, alignItems:'center', paddingTop: 10}}>
                    <TouchableOpacity onPress={()=> {handleAddWorkoutClick()}} style={[styles.TouchableOpacity]}>
                        <Text style={{fontFamily:"Inter-Medium", fontWeight:"500", fontSize: 16, color: "white"}}>
                            Add Workout
                        </Text>
                    </TouchableOpacity>
                </View>
                
                <BottomSheet
                    ref={bottomSheetRef}
                    index={bottomSheetIdx}
                    snapPoints={snapPoints}
                    >
                    <View>
                        <View style={{display:"flex", flexDirection:"row"}}>
                            <TouchableOpacity style={{margin:10, width:43}} onPress={()=>handleCloseBottomSheet()}>
                                <Text style={{fontFamily: "Inter-Medium"}}>Close</Text>
                            </TouchableOpacity>
                            <Searchbar
                                icon = {({ color, size }) => (
                                    <Ionicons name="search-outline" color={color} size={size} />
                                    )}
                                placeholder='Search for Workouts!' style={{paddingLeft:10}}
                                value = {searchText}
                                onChangeText = {(text) => handleSearch(text)}
                                clearIcon = {({ color, size }) => (
                                    <Ionicons name="trash" color={color} size={size} />
                                )}
                            />
                        </View>
                        <ScrollView style={{flexGrow: 0, height: 475, paddingTop:10, paddingLeft:5}}>
                            <FlatList 
                                data={searchWorkouts}
                                renderItem={renderSearch}
                                keyExtractor={item => item._id}
                                scrollEnabled={true}
                                ItemSeparatorComponent={() => <View style={{height: 5}} />}
                            />
                        </ScrollView>
                        <View style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                            <TouchableOpacity onPress={()=>{handleAddSelectedWorkouts()}}  
                                style={{display:"flex", alignItems:"center", justifyContent:"center", paddingTop:30}}>
                                <Text style={{fontFamily: "Inter-Medium", fontSize: 18, fontWeight:"800",color:maroon}}>
                                    Add {selectedWorkouts.length} workouts to plan?
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </BottomSheet>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root:{
        padding: 30
    },
    textInputLine:{
        backgroundColor: Colors.appBackground,
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
        width: '100%',
        marginLeft: 30

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
        width:'40%',
        borderRadius: 30,
        backgroundColor: '#8D0A0A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',

    }
});

export default WorkoutAddPlan;