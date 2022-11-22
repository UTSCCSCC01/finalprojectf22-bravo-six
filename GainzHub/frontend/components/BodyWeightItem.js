import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Button} from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

const BodyWeightItem = ({bodyWeightId, navigation, profile}) => {
    const [obj, setObj] = useState({weight: ""});
    const isFocused = useIsFocused();
    const [isPrivate, setIsPrivate] = useState(true);


    useEffect(()=>{
        async function getbodyWeightFromDb(){
            const bodyWeightObj = await axios.get("http://localhost:5001/progress/getBodyWeights", {params:{bodyWeightId: bodyWeightId}});
            setObj(bodyWeightObj.data);
        }
        getbodyWeightFromDb();
    }, [isFocused])

    useEffect(() =>{
        if(obj == null){
            return;
        }
        if(obj.private){
            setIsPrivate(true);
        }
        else{
            setIsPrivate(false);
        }
    }, [obj], [isFocused])

    const handlePrivateWrapper = async() => {
        if(isPrivate){
            await axios.patch("http://localhost:5001/progress/unPrivateBodyWeight", {mealPlanId: bodyWeightId});
            setIsPrivate(false);
        }
        else{
            await axios.patch("http://localhost:5001/progress/privateBodyWeight", {mealPlanId: bodyWeightId});
            setIsPrivate(true);
        }
    }

    
    if(profile){
        return (
            <View style={[{flexDirection: 'row'}, {display: 'flex'}, {justifyContent: 'space-between'}, {paddingHorizontal: 5}]}>
                
                <Text style={[styles.inputView, {width: '75%', height: 45}]}>
                    <Text style={styles.inputText}>
                        Weight: {obj ? obj.weight : "hello"} Kg
                    </Text>
                    <Text style={styles.inputText}>
                        Date: {obj ? obj.date : "hello"}
                    </Text>
                </Text>
                <TouchableOpacity onPress={()=> handlePrivateWrapper()} style={[styles.TouchableOpacityList]} >
                <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:14, color: "white"}}>
                    {isPrivate ? "Private" : "Public"}
                </Text>
            </TouchableOpacity>
            </View>


        );
    }
    
    return (
        <View style={[{flexDirection: 'row'}, {display: 'flex'}, {justifyContent: 'space-between'}, {paddingHorizontal: 5}]}>
            <TouchableOpacity style={[styles.inputView, {width: '100%'}]}>
                <Text style={styles.inputText}>
                    Weight: {obj ? obj.weight : "hello"} Kg
                </Text>
                <Text style={styles.inputText}>
                    Date: {obj ? obj.date : "hello"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    inputView:{
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20
    },      
    inputText:{
        height: 30,
        flex: 1,
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
    TouchableOpacityList:{
        height:35,
        width:'23%',
        borderRadius: 30,
        marginTop: 8,
        backgroundColor: '#8D0A0A',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
export default BodyWeightItem;