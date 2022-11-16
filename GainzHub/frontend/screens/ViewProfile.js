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
    //const isFollowed = user.following.includes(SelectedUser.username);
    console.log(SelectedUser);
    
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
            }
            else{
                Toast.show("Could follow User", {
                    duration: Toast.durations.SHORT,
                })
            }
         }
        
    };

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
                    Followers: {SelectedUser.followers ? SelectedUser.followers.length : "0"}   Following: {SelectedUser.following ? SelectedUser.following.length : "0"}
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