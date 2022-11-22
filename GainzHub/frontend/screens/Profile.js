import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Button, SafeAreaView, FlatList, TouchableWithoutFeedback, StatusBar} from 'react-native'
//import Slider from '@react-native-community/slider';
import {Colors} from '../components/colors'
import axios from 'axios';
import Toast from 'react-native-root-toast';
import { loginUser } from '../requests/userRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import NutritionPlans from './NutritionPlans';
import NutritionNav from '../components/NutritionNav';
import { ScrollView } from 'react-native-gesture-handler';
import { Searchbar, Modal, Portal , Provider } from 'react-native-paper';
import MealPlanItem from '../components/MealPlanItem';
import WorkoutPlanCard from '../components/WorkoutPlanCard';
import BodyWeightItem from '../components/BodyWeightItem';
//import CircularProgress from 'react-native-circular-progress-indicator';
//import "./reanimated2/js-reanimated/global";
// import CircularProgress from 'react-native-circular-progress-indicator';
//import * as Progress from 'react-native-progress'

const {maroon, black} = Colors;

// Temporary image that we will change once we figure out aws
const IMAGE = "https://www.onlinearsenal.com/uploads/default/original/3X/7/7/7788236c1bed0a1e47eebe7aee96d0b0864ce385.jpeg";



const getUser = async() =>{
    const value = await AsyncStorage.getItem('userData');
    return value;
}

const Profile = ({navigation}) =>{
    const [userData, setUserData] = useState("No user data");
    const [loggedIn, setLoggedIn] = useState(true);
    const [user, setUser] = useState({});
    const isFocused = useIsFocused();
    const [profileImage, setProfileImage]  = useState(null);
    const [posts, setPosts] = useState(null);
    const [selectedNav, setSelectedNav] = useState({posts: true, workout: false, nutrition: false, 
                                                    progress:false});
                                                    const [visible, setVisible] = React.useState(false);
    const [modalItem, setModalItem] = useState(null);
    const [mealPlans, setMealPlans] = useState({});
    const [workoutPlans, setWorkoutPlans] = useState(true);
    const [bodyWeight, setBodyWeight] = useState({});
    const [tabselect, setTAB] = useState("posts");
    const [caloriesAte, setCaloriesAte] = useState(0);
    const [calorieGoal, setCalorieGoal] = useState('');

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    useEffect(() => {
        const getStoredMealPlans = async() => {
            const token = await AsyncStorage.getItem("userData");
            const response  = await axios.get('http://localhost:5001/nutrition/getPersonalMealPlans', {
                headers: {
                    'x-auth-token': token,
                }
            })
            setMealPlans(response.data);
        }
        getStoredMealPlans();
    }, [isFocused]);


    useEffect(()=>{
        //Get the url to this user's pfp
        const getProfilePicture = async()=>{
            const token = await AsyncStorage.getItem("userData");
            const url = await axios.post("http://localhost:5001/user/getProfilePicture", {} , {
                headers: {
                    'x-auth-token': token,
                }
            })
            if(url.status == 200){
                setProfileImage(url.data.url);
            }
        }
        getProfilePicture();
    }, [isFocused])




    useEffect(()=>{
        const getWorkoutPlans = async ()=>{
            const token = await AsyncStorage.getItem("userData");
            const workoutPlans = await axios.get("http://localhost:5001/workout/getWorkoutPlans", {
                headers:{
                    "x-auth-token": token
                }
            });
            setWorkoutPlans(workoutPlans.data);
        }
        getWorkoutPlans();
    }, [isFocused])

    useEffect(() => {
        const getStoredGoal = async() => {
            const token = await AsyncStorage.getItem("userData");
    
            const response  = await axios.get('http://localhost:5001/nutrition/getCalorieGoal', {
                headers: {
                    'x-auth-token': token,
                }
            })
            setCalorieGoal(response.data.calorieGoal);
        }
        getStoredGoal();
    }, [isFocused])

    useEffect(() => {
        const getStoredAte = async() => {
            const token = await AsyncStorage.getItem("userData");
    
            const response  = await axios.get('http://localhost:5001/nutrition/getCaloriesAte', {
                headers: {
                    'x-auth-token': token,
                }
            })
            setCaloriesAte(response.data.caloriesAte);
        }
        getStoredAte();
    }, [isFocused])

    useEffect(() => {
        const getStoredBodyWeight = async() => {
            const token = await AsyncStorage.getItem("userData");
            const response  = await axios.get('http://localhost:5001/progress/getUserBodyWeights', {
                headers: {
                    'x-auth-token': token,
                }
            })
            response.data.reverse();
            setBodyWeight(response.data);
        }

        getStoredBodyWeight();
    }, [isFocused]);

    useEffect(()=>{
        const getAllPosts = async()=>{
            //Get all of the user's posts
            const token = await AsyncStorage.getItem("userData");

            const postData = await axios.post("http://localhost:5001/social/getAllUserPosts", {} ,{
                headers:{
                    'x-auth-token': token,
                }
            })
            setPosts(postData.data);
        }

        getAllPosts();
    }, [isFocused])

    useEffect(() =>{
        const getStoredUser = async() =>{
            const userDataStored = await AsyncStorage.getItem('userData');
            if(!userDataStored || userDataStored.length == 0){
                setLoggedIn(false);
            }
            setUserData(userDataStored);
        }
        getStoredUser();
    }, [])

    useEffect(() => {
        const getUser = async() => {
            const jwtToken = await AsyncStorage.getItem("userData");
            
            const currentUser = await axios.get("http://localhost:5001/user/getUserSecure", {
                headers: {
                    'x-auth-token': jwtToken,
                }
            })
            setUser(currentUser.data);
        }
        getUser();
    }, [isFocused])

    useEffect(()=>{
        const handleLogout = async() =>{
            await AsyncStorage.removeItem('userData');
            navigation.navigate("Login");
        }

        if(!loggedIn){
            handleLogout();
        }
    }, [loggedIn]);

    const handleNavPress = (linkName) => {
        let tempSelected = {posts: false, workout: false, nutrition: false, 
            progress:false};
        tempSelected[linkName] = true;
        setSelectedNav(tempSelected);
    }

    const renderPosts = ({item}) =>(
        <View  style={{paddingTop: 20, display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:"#F6F6F6", paddingRight: 5}}>
            <TouchableOpacity onPress={()=>{showModal(); setModalItem(item)}}>
                <Image style={styles.postImage} source={{ uri: item.url }} />
            </TouchableOpacity>
        </View>
    )
    const handlePublish = (obj) =>{
        
    }

    const renderMeals = ({ item }) => (
        <MealPlanItem mealPlanId={item._id} navigation={navigation} handlePublish={handlePublish} profile={true}/>
    );


    useEffect(()=>{
        const getWorkoutPlans = async ()=>{
            const token = await AsyncStorage.getItem("userData");
            const workoutPlans = await axios.get("http://localhost:5001/workout/getWorkoutPlans", {
                headers:{
                    "x-auth-token": token
                }
            });
            setWorkoutPlans(workoutPlans.data);
        }
        getWorkoutPlans();
    }, [isFocused])

    const renderWorkoutPlans = ({item}) => (
        <WorkoutPlanCard workoutId = {item._id} planName={item.planName} planDescription={item.description} profile = {true} priv = {item.private}/>
    )

    useEffect(() => {
        const getStoredBodyWeight = async() => {
            const token = await AsyncStorage.getItem("userData");
            const response  = await axios.get('http://localhost:5001/progress/getUserBodyWeights', {
                headers: {
                    'x-auth-token': token,
                }
            })
            response.data.reverse();
            setBodyWeight(response.data);
        }

        getStoredBodyWeight();
    }, [isFocused]);
    const renderBodyWeight = ({ item }) => (
        <BodyWeightItem bodyWeightId={item._id} navigation={navigation} profile = {true}/>
    );

    const userPosts = ()=>{
        if(selectedNav['posts'] == true){
            return(<FlatList 
                key={'_'}
                data = {posts}
                renderItem = {renderPosts}
                keyExtractor={item => "_" + item._id}
                scrollEnabled={true}
                numColumns={3}
                />)
        }
        else if(selectedNav['nutrition'] == true){
            return(
                <FlatList
                key={'#'}
                data={mealPlans}
                renderItem={renderMeals}
                keyExtractor={item => "#" + item._id}
                scrollEnabled={true}
                numColumns={1}

            />)
        }
        else if(selectedNav['workout']){
            return(
                <FlatList
                    style={{height:140}}
                    scrollEnabled={true}
                    data={workoutPlans}
                    renderItem={renderWorkoutPlans}
                    numColumns={1}
                    />
            )
        }
        else if(selectedNav['progress']){
            return(
                <FlatList
                    key={'!'}
                    data={bodyWeight}
                    renderItem={renderBodyWeight}
                    keyExtractor={item => "!" + item._id}
                    scrollEnabled={true}
                    numColumns={1}

            />
            )
        }

    }

    const userBW = ()=>{
        return(<FlatList 
                data = {posts}
                renderItem = {renderBodyWeight}
                keyExtractor={item => item._id}
                scrollEnabled={true}
                numColumns={3}
                />)
    }

    const userWO = ()=>{
        return(<FlatList 
                data = {posts}
                renderItem = {renderWorkoutPlans}
                keyExtractor={item => item._id}
                scrollEnabled={true}
                numColumns={3}
                />)
    }

    const userNUT = ()=>{
        return(<Text style={{paddingLeft: -30, fontSize: 16}}> {user.firstName} {user.lastName}'s daily calorie goal {caloriesAte} / {calorieGoal} </Text>)
    }

    const renderElement = ()=>{
        if(tabselect == 'posts')
           return userPosts();
        if(tabselect == 'progress')
           return userBW();
        if(tabselect == 'workout')
           return userWO();
        if(tabselect == 'nutrition')
           return userNUT();
        return null;
    }

    const ViewImage = ({image, description}) => {
        return (
          <Provider>
          <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{backgroundColor: 'white',padding:10}}>
            <View style={{alignItems: 'center', paddingBottom: 1 }}>
                <Image style={{width:400, height:400, resizeMode:'contain'}} source={{ uri: image }} />
            </View>

            <View style={{paddingVertical: 10}}>
                <View style={{width:"100%", backgroundColor:'#000000', height:2}}/>
            </View>

            <View>
                <Text  style={{fontFamily: "Inter-Medium", fontSize: 15, fontWeight:"800",color:black, textAlign:'center', marginBottom:5}}>
                    {description}
                </Text>
            </View>
          </Modal>
        </Portal>
      </Provider>
        )
      }


    return(
        <View style={[styles.root, {paddingLeft: 20}, {flex:1}]}>
            <View style={{flexDirection:'row', justifyContent:'left', paddingBottom: 5}}>
                <View style = {{paddingRight: 50}}>
                    <TouchableOpacity onPress={()=> setLoggedIn(false)}>
                        <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 30, fontWeight:"800",color:maroon, textAlign:'center', marginBottom:10}}>
                    Profile
                </Text>
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 20, fontWeight:"800",color:black, textAlign:'center', marginBottom:5}}>
                    Followers: {user.followers ? user.followers.length : "0"}   Following: {user.following ? user.following.length : "0"}
                </Text>
            </View>
            <View style={{alignItems: 'center', paddingBottom: 10}}>
                <Image style={styles.image} source={{ uri: profileImage }} />
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 28, fontWeight:"800",color:black, textAlign:'center', marginBottom:5}}>
                    {user.firstName} {user.lastName}
                </Text>
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 20, fontWeight:"800",color:black, textAlign:'center', marginBottom:5}}>
                    {user.bio ? user.bio : 'No Bio'}
                </Text>
            </View>
            
            <View style={{paddingBottom:15, alignItems:'center', paddingTop: 10}}>
                <TouchableOpacity onPress={()=> navigation.navigate('Profile_Edit')} style={[styles.TouchableOpacity]}>
                    <Text style={{fontFamily:"Inter-Medium", fontWeight:"500", fontSize: 16, color: "white"}}>
                        Edit Profile
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.profileNavCont}>
                <View style={{borderBottomColor:"#8D0A0A", borderBottomWidth: selectedNav['posts'] ? 2 : 0}}>
                    <TouchableOpacity onPress={()=>{handleNavPress("posts"); setTAB("posts")}}>
                        <Text style={styles.profileNavTxt}> Posts</Text>
                    </TouchableOpacity>
                </View>

                <View style={{borderBottomColor:"#8D0A0A", borderBottomWidth: selectedNav['workout'] ? 2 : 0}}>
                    <TouchableOpacity onPress={()=>{handleNavPress("workout"); setTAB("workout")}}>
                        <Text style={styles.profileNavTxt} >Workout</Text>
                    </TouchableOpacity> 
                </View>

                <View style={{borderBottomColor:"#8D0A0A", borderBottomWidth: selectedNav['nutrition'] ? 2 : 0}}>
                    <TouchableOpacity onPress={()=>{handleNavPress("nutrition"); setTAB("nutrition")}}>
                        <Text style={styles.profileNavTxt} >Nutrition</Text>
                    </TouchableOpacity>
                </View>

                <View style={{borderBottomColor:"#8D0A0A", borderBottomWidth: selectedNav['progress'] ? 2 : 0}}>
                    <TouchableOpacity onPress={()=>{handleNavPress("progress"); setTAB("progress")}}>
                        <Text style={styles.profileNavTxt} >Progress</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView>
                {renderElement()}
            </ScrollView>


            <ViewImage image={modalItem ? modalItem.url : ""} description={modalItem ? modalItem.PostMessage : ""} />


         </View>
    );
}

const styles = StyleSheet.create({
    root:{
        padding: 30,
    },
    profileNavCont:{
        display:'flex',
        flexDirection:"row",
        justifyContent:'space-evenly',
    },
    profileNavTxt:{
        fontFamily: "Inter-Medium", 
        fontSize: 14, 
        fontWeight:"800",
        color:maroon,
        marginBottom:10,
    }
    ,
    inputView:{
        height: 90,
        backgroundColor: "#F6F6F6",
        borderColor: "#e8e8e8",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10
    },
    inputText:{
        height: 30,
        marginRight: 30,
        padding: 10,
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        fontSize: 18,
        alignContent: 'center',
        textAlign: 'left',
        borderRadius: 8,
        width: 300
    },
    TouchableOpacity:{
        height:40,
        width:'50%',
        borderRadius: 15,
        backgroundColor: '#8D0A0A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 1000,
      },
    postImage:{
        width:115,
        height:115,
        resizeMode:'cover'
    }
});

export default Profile;