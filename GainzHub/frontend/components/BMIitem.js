import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Button} from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

const BMIitem = ({BMIid, navigation}) => {
    const [obj, setObj] = useState({BMI: ""});
    const isFocused = useIsFocused();
    
    useEffect(()=>{
        async function getBMIFromDb(){
            const BMIObj = await axios.get("http://localhost:5001/progress/getBMI", {params:{BMIid: BMIid}});
            setObj(BMIObj.data);
        }

        getBMIFromDb();
    }, [isFocused])

    
    return (
        <View style={[{flexDirection: 'row'}, {display: 'flex'}, {justifyContent: 'space-between'}, {paddingHorizontal: 5}]}>
            <TouchableOpacity style={[styles.inputView, {width: '100%'}]}>
                <Text style={styles.inputText}>
                    BMI: {obj ? obj.BMI : ""} 
                </Text>
                <Text style={styles.inputText}>
                    Date: {obj ? obj.date : ""}
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
export default BMIitem;