import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Platform, processColor } from "react-native";

const URI = "http://localhost:5001/social/post/";


export const registerPost = async(userData) => {
    try{
        console.log(userData);
        const token = await AsyncStorage.getItem("userData");
        const data = await axios.post(URI, 
            userData, {
                headers:{
                    'x-auth-token': token,
                }
            });
        console.log("GOOD");
        return data;
    } catch(err){
        return err.response;
    }
}