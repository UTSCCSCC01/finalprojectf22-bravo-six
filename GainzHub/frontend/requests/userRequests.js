import axios from "axios";
import { Platform, processColor } from "react-native";

const AUTH_DEV_URI = "http://localhost:5000/auth/";

const ANDROID_DEV_URI = "http://10.0.2.2:5000/auth/";

const REQ_URI = () =>{
    switch(Platform.OS) {
        case "android":
            return ANDROID_DEV_URI;
        case "native":
            return AUTH_DEV_URI;
        default:
            return AUTH_DEV_URI;
    }
}

/**
 * Sends register form data to server and creates a user accordingly, adding to DB
 * POST /api/register
 */
export const registerUser = async(userData) => {
    try{
        const data = await axios.post(REQ_URI(), userData);
        return data;
    } catch(err){
        return err.response;
    }
}

export const loginUser = async(userData)=>{
    try{
        const data = await axios.post(REQ_URI()+'login', userData);
        return data;
    }catch(err){
        return err.response;
    }
}

export const updateUserField = async(userData)=>{
    try{
        axios.put(REQ_URI()+'updateUserField', userData);
    }catch(err){
        return err.response;
    }
}

