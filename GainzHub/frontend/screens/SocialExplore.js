import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Button, SafeAreaView, FlatList, TouchableWithoutFeedback, StatusBar,   ActivityIndicator, Image} from 'react-native'
import {Colors} from '../components/colors'
import axios from 'axios';
import Toast from 'react-native-root-toast';
import { loginUser } from '../requests/userRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ImagesExample from '../assets/mike.jpg'
import filter from 'lodash.filter';
import { Searchbar, Modal, Portal , Provider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const {maroon, black} = Colors;
const Tab = createBottomTabNavigator();
 
const SocialExplore = ({navigation}) =>{
    const [loggedIn, setLoggedIn] = useState(true);
    const [AllUsers, setAllUsers] = useState([]);
    const [fullData, setFullData] = useState([]);
    const [userId, setUser] = useState('');
    const [SelectedUser, setSelectedUser] = useState([]);
    const [query, setQuery] = useState('');

    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const isFocused = useIsFocused();

    const ViewProfile = () => {
      return (
        <Provider>
        <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{backgroundColor: 'white',padding:10}}>
          <View style={{alignItems: 'center', paddingBottom: 1 }}>
              <Image style={styles.image} source={{ uri: ImagesExample }} />
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
        </Modal>
      </Portal>
    </Provider>
      )
    }

    useEffect(() => {
      CheckName();
  }, [])

  const CheckName = async() => {
      const jwtToken = await AsyncStorage.getItem("userData");
      const currentUser = await axios.get("http://localhost:5001/user/getUserSecure", {
          headers: {
              'x-auth-token': jwtToken,
          }
      })
      setUser(currentUser.data.username.toString());
  }

    useEffect(()=>{
    async function getAllUsers(){
        const Users = await axios.get("http://localhost:5001/user/getAllUser");
        setAllUsers(Users.data);
        setFullData(Users.data);

    }
    getAllUsers();
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

    const handleSearch = text => {
        const formattedQuery = text.toLowerCase();
        const filteredData = filter(fullData, user => {
          return contains(user, formattedQuery);
        });
        if(formattedQuery != ''){
        setAllUsers(filteredData);
        } else {
        setAllUsers(fullData);
        }
        setQuery(text);
      };
      
    const contains = ({ username, firstName , lastName }, query) => {
        if (username.toLowerCase().includes(query) || firstName.toLowerCase().includes(query) || lastName.toLowerCase().includes(query) || (firstName+lastName).toLowerCase().includes(query)  || (firstName+" "+lastName).toLowerCase().includes(query)) {
            return true;
        }
        return false;
    };

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
                <TouchableOpacity onPress={()=> navigation.navigate('SocialHome')}>
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                       Home
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('SocialExplore')}>
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16, color:maroon}}>
                       Explore
                    </Text>
                </TouchableOpacity> 
                <TouchableOpacity onPress={()=> navigation.navigate('SocialCreate')}>
                    <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:16}}>
                        Create
                    </Text>
                </TouchableOpacity> 
            </View>

            <View style={styles.container}>
                <Text style={styles.text}>User's</Text>

                <FlatList
                    ListHeaderComponent={
                      <Searchbar
                      icon = {({ color, size }) => (
                          <Ionicons name="search-outline" color={color} size={size} />
                          )}
                      placeholder='Search for Users!' style={{paddingLeft:10}}
                      value = {query}
                      onChangeText = {queryText => handleSearch(queryText)}
                      clearIcon = {({ color, size }) => (
                          <Ionicons name="trash" color={color} size={size} />
                      )}
                  />
                    }
                    data={AllUsers}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => (
                    <TouchableOpacity onPress={ () => {showModal(); setSelectedUser(item) }}>
                    <View style={styles.listItem}>
                        <Image
                        source={{ uri: ImagesExample }}
                        style={styles.coverImage}
                        />
                        <View style={styles.metaInfo}>
                        <Text style={styles.title}>{`${item.username}`}</Text>
                        <Text style={styles.subtitle}>{`${item.firstName} ${item.lastName}`}</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                    )
                  }
                />
                <ViewProfile></ViewProfile>
            </View>

    </View>
    );
}

const styles = StyleSheet.create({
    root:{
        padding: 10,
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
    },
    container: {
        flex: 1.2,
        backgroundColor: '#f8f8f8',
        alignItems: 'center'
      },
      text: {
        fontSize: 20,
        color: '#101010',
        fontWeight: '700'
      },
      listItem: {
        marginTop: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        flexDirection: 'row'
      },
      coverImage: {
        width: 100,
        height: 100,
        borderRadius: 8
      },
      metaInfo: {
        marginLeft: 10
      },
      title: {
        fontSize: 18,
        width: 200,
        padding: 10
      },
      subtitle: {
        fontSize: 14,
        width: 200,
        padding: 10
      },
      image: {
        width: 150,
        height: 150,
        borderRadius: 1000,
      },
});

export default SocialExplore;