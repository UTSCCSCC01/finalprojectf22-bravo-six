import axios from "axios";
const AUTH_URI = "http://localhost:5000/auth/";
/**
 * Sends register form data to server and creates a user accordingly, adding to DB
 * POST /api/register
 */
export const postUser = async(userData) => {
    try{
        const data = await axios.post(AUTH_URI, userData);
        return data;
    } catch(err){
        return err.response;
    }  
}

