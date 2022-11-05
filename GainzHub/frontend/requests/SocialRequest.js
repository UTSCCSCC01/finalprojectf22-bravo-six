import axios from "axios";
import { Platform, processColor } from "react-native";

const URI = "http://localhost:5001/social/post/";


export const registerPost = async(userData) => {
    try{
        console.log(userData);
        const data = await axios.post(URI, 
            userData);
        console.log("GOOD");
        return data;
    } catch(err){
        return err.response;
    }
}