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
import BodyWeightItem from '../components/BodyWeightItem';
import WorkoutPlanCard from '../components/WorkoutPlanCard';
import { ScrollView } from 'react-native-gesture-handler';
//import CircularProgress from 'react-native-circular-progress-indicator';
//import "./reanimated2/js-reanimated/global";
// import CircularProgress from 'react-native-circular-progress-indicator';
//import * as Progress from 'react-native-progress'

const {maroon, black} = Colors;

const getUser = async() =>{
    const value = await AsyncStorage.getItem('userData');
    return value;
}

const ViewProfile = ({route, navigation}) =>{
    const [userData, setUserData] = useState("No user data");
    const [loggedIn, setLoggedIn] = useState(true);
    const [user, setUser] = useState({});
    const SelectedUser = route.params.SelectedUser;
    const selectedId = route.params.SelectedUser._id;
    const isFocused = useIsFocused();
    const [profileImage, setProfileImage]  = useState(null);
    const [isFollowed, setIsFollowed] = useState(false);
    const [followedText, setFollowedText] = useState("Follow");
    const [tabselect, setTAB] = useState("posts");
    const [caloriesAte, setCaloriesAte] = useState(0);
    const [calorieGoal, setCalorieGoal] = useState('');
    const [selectedNav, setSelectedNav] = useState({posts: true, workout: false, nutrition: false, 
        progress:false});
    const [visible, setVisible] = React.useState(false);
    const [posts, setPosts] = useState(null);
    //following = route.parans.SelectedUser.following.length;
    //followers = route.params.SelectedUser.followers.length;
    const [followers, setFollowers] = useState(SelectedUser.followers.length);
    //const isFollowed = user.following.includes(SelectedUser.username);
    console.log(SelectedUser);
    
    useEffect(() => {
        const getUser = async() => {
            const jwtToken = await AsyncStorage.getItem("userData");

            const currentUser = await axios.get("http://localhost:5001/user/getUserSecure", {
                headers: {
                    'x-auth-token': jwtToken,
                }
            })
            //console.log("helpppppppppppp");
            console.log(currentUser.data);
            console.log(currentUser.data.following.includes(SelectedUser._id));
            setIsFollowed(currentUser.data.following.includes(SelectedUser._id));
            console.log(isFollowed);
            setUser(currentUser.data);
        }
        getUser();
    }, [isFocused])

    useEffect(()=>{
        //Get the url to this user's pfp
        const getProfilePicture = async()=>{
            const token = await AsyncStorage.getItem("userData");
            const url = await axios.post("http://localhost:5001/user/getProfilePictureOther", {SelectedUser} , {
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

    useEffect(()=>{
        const getWorkoutPlans = async ()=>{
            const token = await AsyncStorage.getItem("userData");
            const workoutPlans = await axios.get("http://localhost:5001/workout/getWorkoutPlans", {SelectedUser} , {
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
    
            const response  = await axios.get('http://localhost:5001/nutrition/getCalorieGoal', {SelectedUser} , {
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
    
            const response  = await axios.get('http://localhost:5001/nutrition/getCaloriesAte', {SelectedUser} , {
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
            const response  = await axios.get('http://localhost:5001/progress/getUserBodyWeights', {SelectedUser} , {
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

            const postData = await axios.post("http://localhost:5001/social/getAllUserPosts", {SelectedUser} , {
                headers:{
                    'x-auth-token': token,
                }
            })
            setPosts(postData.data);
        }

        getAllPosts();
    }, [isFocused])
    
    //console.log(userData);

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

    const handleFollow = async() => {
        if(!isFollowed){
            const token = await AsyncStorage.getItem("userData");
            const response = await axios.post('http://localhost:5001/user/followUser', {selectedId}, {
                headers: {
                    'x-auth-token': token,
                }
            });
            
            const addFollower = await axios.post('http://localhost:5001/user/addFollower', {SelectedUser}, {
                headers: {
                    'x-auth-token': token,
                }
            });
            

            if(response.status == 200 && addFollower.status == 200){
                Toast.show("Successfully Followed!", {
                    duration: Toast.durations.SHORT,
                })
                setIsFollowed(true);
                setFollowers(followers+1);
            }
            else{
                Toast.show("Could follow User", {
                    duration: Toast.durations.SHORT,
                })
            }
         } else {
            const token = await AsyncStorage.getItem("userData");
            const response = await axios.post('http://localhost:5001/user/unfollowUser', {selectedId}, {
                headers: {
                    'x-auth-token': token,
                }
            });
            
            const addFollower = await axios.post('http://localhost:5001/user/removeFollower', {SelectedUser}, {
                headers: {
                    'x-auth-token': token,
                }
            });
            

            if(response.status == 200 && addFollower.status == 200){
                Toast.show("Successfully Unfollowed!", {
                    duration: Toast.durations.SHORT,
                })
                setIsFollowed(false);
                setFollowers(followers-1);
            }
            else{
                Toast.show("Could follow User", {
                    duration: Toast.durations.SHORT,
                })
            }
         }
        
    };

    const renderPosts = ({item}) =>(
        <View  style={{paddingTop: 20, display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:"#F6F6F6", paddingRight: 5}}>
            <TouchableOpacity onPress={()=>{showModal(); setModalItem(item)}}>
                <Image style={styles.postImage} source={{ uri: item.url }} />
            </TouchableOpacity>
        </View>
    )

    const renderBodyWeight = ({ item }) => (
        <BodyWeightItem bodyWeightId={item._id} navigation={navigation}/>
    );

    const renderWorkoutPlans = ({item}) => (
        <WorkoutPlanCard planName={item.planName} planDescription={item.description}/>
    )
    
    const userPosts = ()=>{
        return(<FlatList 
                data = {posts}
                renderItem = {renderPosts}
                keyExtractor={item => item._id}
                scrollEnabled={true}
                numColumns={3}
                />)
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
        return(<Text style={{paddingLeft: -30, fontSize: 16}}> {SelectedUser.firstName} {SelectedUser.lastName}'s daily calorie goal {caloriesAte}/{calorieGoal} </Text>)
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

    return(
        <View style={[styles.root, {paddingLeft: 20}, {flex:1}]}>
            <View style={{flexDirection:'row', justifyContent:'left', paddingBottom: 5}}>
                <View style = {{paddingRight: 50}}>
                    <TouchableOpacity onPress={()=> navigation.pop()}>
                        <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                            Back
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {{padding:10}}>
                <TouchableOpacity onPress={()=> handleFollow()} style={[styles.TouchableOpacity, {width: '100%'}]}>
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:20, color: 'white'}}>
                        {isFollowed ? "Following" : "Follow"}
                    </Text>
                </TouchableOpacity>
            </View> 
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 20, fontWeight:"800",color:black, textAlign:'center', marginBottom:5}}>
                    Followers: {followers ? followers : "0"}   Following: {SelectedUser.following ? SelectedUser.following.length : "0"}
                </Text>
            </View>
            <View style={{alignItems: 'center', paddingBottom: 10}}>
                <Image style={styles.image} source={{ uri: profileImage }} />
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 28, fontWeight:"800",color:black, textAlign:'center', marginBottom:5}}>
                    {SelectedUser.firstName} {SelectedUser.lastName}
                </Text>
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 20, fontWeight:"800",color:black, textAlign:'center', marginBottom:5}}>
                    {SelectedUser.bio ? SelectedUser.bio : 'No Bio'}
                </Text>
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

                <ScrollView>
                    {renderElement()}
                </ScrollView>
            </View>
         </View>
    );
}

const styles = StyleSheet.create({
    root:{
        padding: 30,
    },
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
});

export default ViewProfile;