import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, FlatList, SafeAreaView} from 'react-native'
//import Slider from '@react-native-community/slider';
import {Colors} from '../components/colors'
import axios from 'axios';
import Toast from 'react-native-root-toast';
import { loginUser } from '../requests/userRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import { TextInput , Button} from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
//import CircularProgress from 'react-native-circular-progress-indicator';
//import "./reanimated2/js-reanimated/global";
// import CircularProgress from 'react-native-circular-progress-indicator';
//import * as Progress from 'react-native-progress'

const {maroon, black} = Colors;

const Profile_Edit = ({navigation}) =>{

    const [userData, setUserData] = useState("No user data");
    const [loggedIn, setLoggedIn] = useState(true);
    const [user, setUser] = useState({});
    const [bio, setBio] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState(null);

    const isFocused = useIsFocused();
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
            console.log(currentUser.data);
            setUser(currentUser.data);
        }
        getUser();
    }, [])
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

    const editProfile = async() => {

        const token = await AsyncStorage.getItem("userData");

        const response = await axios.put('http://localhost:5001/user/editProfile',
                                        {updatedUser: user}, {
            headers:{
                "x-auth-token": token,
            }
        });
        //console.log("hep");

        if(response.status == 200){
            Toast.show("Success!", {
                duration: Toast.durations.SHORT,
            })
        }
        else{
            Toast.show("Could not update meal plan", {
                duration: Toast.durations.SHORT,
            })
        }
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            const data = {"image": result.uri}
            const token = await AsyncStorage.getItem("userData");
            const status = await axios.post("http://localhost:5001/user/uploadProfilePic", data, {
                headers: {
                    'x-auth-token': token,
                }
            });
            console.log(status);
            setImage(result.uri);
        }
      };

    return(
        <View style={[styles.root, {paddingLeft: 20}]}>
            <View style={{flexDirection:'row', textAlign:'center', paddingBottom: 10, flex:1}}>
                <View style = {{paddingRight:50}}>
                    <TouchableOpacity onPress={()=> navigation.pop()}>
                        <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                            Back
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 26, fontWeight:"800",color:maroon, textAlign: 'center', marginBottom:15}}>
                    Edit Your Profile
                </Text>
            </View>
            <View>
                <TextInput
                    maxLength={30}
                    multiline
                    editable
                    numberOfLines={1}
                    label="First Name"
                    placeholder={user.firstName}
                    onChangeText={(val) => {
                        setFirstName(val);
                        setUser(previousState => { return {...previousState, firstName: val}})
                    }}
                    activeUnderlineColor="red"
                />
                <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:10, color:maroon,  textAlign:'right', padding:8}}>
                    Characters Left:{firstName.length}/30
                </Text>
            </View>
           
            <View>
                <TextInput
                    maxLength={30}
                    multiline
                    editable
                    numberOfLines={1}
                    label="Last Name"
                    placeholder={user.lastName}
                    onChangeText={(val) => {
                        setLastName(val);
                        setUser(previousState => { return {...previousState, lastName: val}})
                    }}
                    activeUnderlineColor="red"
                />
                <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:10, color:maroon,  textAlign:'right', padding:8}}>
                    Characters Left:{lastName.length}/30
                </Text>
            </View>
            <View>
                <TextInput
                    maxLength={30}
                    multiline
                    editable
                    numberOfLines={1}
                    label="Username"
                    placeholder={user.username}
                    onChangeText={(val) => {
                        setUserName(val);
                        setUser(previousState => { return {...previousState, username: val}})
                    }}
                    activeUnderlineColor="red"
                />
                <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:10, color:maroon,  textAlign:'right', padding:8}}>
                    Characters Left:{username.length}/30
                </Text>
            </View>
            <View>
                <TextInput
                    maxLength={50}
                    multiline
                    editable
                    numberOfLines={1}
                    label="Email"
                    placeholder={user.email}
                    onChangeText={(val) => {
                        setEmail(val);
                        setUser(previousState => { return {...previousState, email: val}})
                    }}
                    activeUnderlineColor="red"
                />
                <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:10, color:maroon,  textAlign:'right', padding:8}}>
                    Characters Left:{email.length}/50
                </Text>
            </View>
            <View>
                <TextInput
                    maxLength={150}
                    multiline
                    editable
                    numberOfLines={4}
                    label="Bio"
                    placeholder={user.bio ? user.bio : 'No Bio'}
                    onChangeText={(val) => {
                        setBio(val);
                        setUser(previousState => { return {...previousState, bio: val}})
                    }}
                    activeUnderlineColor="red"
                />
                <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:10, color:maroon,  textAlign:'right', padding:8}}>
                    Characters Left:{bio.length}/150
                </Text>
            </View>
            <View style={{paddingBottom:10, marginTop:20}}>
                <TouchableOpacity onPress={editProfile} style={[styles.TouchableOpacity]}>
                    <Text style={{fontFamily:"Inter-Medium", fontWeight:"600", fontSize: 18, color: "white"}}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={pickImage} style={[styles.TouchableOpacity]}>
                    <Text style={{fontFamily:"Inter-Medium", fontWeight:"600", fontSize: 18, color: "white"}}>
                        Change profile picture
                    </Text>
                </TouchableOpacity>
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
        width: '100%'
    },
    TouchableOpacity:{
        height:40,
        width:'100%',
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

export default Profile_Edit;