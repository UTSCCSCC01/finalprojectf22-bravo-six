import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState} from 'react'
import { Button, TextInput, View} from 'react-native';
import Toast from 'react-native-root-toast';

const ChangeLastName = () =>{
    const [lastName, setLastName] = useState("");

    const handleClick = async() =>{
        //Get the user token
        const token = await AsyncStorage.getItem("userData");

        const response = await axios.post('http://localhost:5000/change/changeLastName',
                                        {newLastName: lastName}, {
            headers:{
                "x-auth-token": token,
            }
        });

        if(response.status == 200){
            Toast.show("Success!", {
                duration: Toast.durations.SHORT,
            })
        }
        else{
            Toast.show("Could not change last name", {
                duration: Toast.durations.SHORT,
            })
        }
        
    }

    return(
        <View>
            <TextInput placeholder='New Last Name' style={{padding:20}} onChangeText={(lastName)=>{setLastName(lastName)}}/>
            <Button title="Change" onPress={handleClick}/>
        </View>
    );
}



export default ChangeLastName;