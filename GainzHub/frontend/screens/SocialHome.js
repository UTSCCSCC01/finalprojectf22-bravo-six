import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Button, SafeAreaView, FlatList, TouchableWithoutFeedback, StatusBar} from 'react-native'
import {Colors} from '../components/colors'
import axios from 'axios';
import Toast from 'react-native-root-toast';
import { loginUser } from '../requests/userRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import { SocialCard } from '../components/socialcard';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider , Card, Title, Paragraph } from 'react-native-paper';



const {maroon, black} = Colors;
const Tab = createBottomTabNavigator();

const SocialHome = ({navigation}) =>{
    const [loggedIn, setLoggedIn] = useState(true);
    const [AllPost, setAllPost] = useState([]);
    const isFocused = useIsFocused();;


    useEffect(()=>{
        async function getAllPost(){
            const Posts = await axios.get("http://localhost:5001/social/getpost");
            setAllPost(Posts.data);
        }
        getAllPost();
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

    const renderPosts = ({item}) => (
            <View style={{padding: 5}} >
                <Card>
                    <Card.Content key={item._id}>
                        <Title>{item.PostMessage}</Title>
                        <Paragraph>{ item.userId }</Paragraph>
                    </Card.Content>
                </Card>
                <Divider/>
            </View>
    )

    return (
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
                    Social
                </Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom:20, textAlign:'center', paddingHorizontal:30, justifyContent:'space-between'}}>
                <TouchableOpacity onPress={()=> {navigation.navigate('SocialHome'),window.location.reload()}}>
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16, color:maroon}}>
                       Home
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('SocialExplore')}>
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                       Explore
                    </Text>
                </TouchableOpacity> 
                <TouchableOpacity onPress={()=> navigation.navigate('SocialCreate')}>
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                        Create
                    </Text>
                </TouchableOpacity> 
            </View>
            <View style={{height:"100%"}}>
                <ScrollView style={{height:"50%"}}>
                    <FlatList
                        data = {AllPost}
                        renderItem={renderPosts}
                        scrollEnabled={true}
                    />
                </ScrollView>
            </View>
    </View>
    );
}



/**
 *                     {AllPost.map(Post => (
                        <ScrollView>
                            <View style={{padding: 5}} >
                            <ScrollView>
                                <Card>
                                <ScrollView>
                                    <Card.Content key={Post._id}>
                                        <Title>{Post.PostMessage}</Title>
                                        <Paragraph>{ Post.userId }</Paragraph>
                                    </Card.Content>
                                    </ScrollView>
                                </Card>
                                <Divider/>
                                </ScrollView>
                            </View>
                        </ScrollView>
                    ))}
 */
const styles = StyleSheet.create({
    root:{
        padding: 30,
    },
    inputView:{
        height: 60,
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
    }
});

export default SocialHome;