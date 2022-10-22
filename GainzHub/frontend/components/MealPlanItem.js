import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Button} from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

const MealPlanItem = ({mealPlanId, navigation, handlePublish}) => {
    const [obj, setObj] = useState({planName: "", published: false});
    const [published, setPublished] = useState(obj.published);
    const isFocused = useIsFocused();
    
    useEffect(()=>{
        async function getMealFromDb(){
            const mealPlanObj = await axios.get("http://localhost:5001/nutrition/getMealPlan", {params:{mealPlanId: mealPlanId}});
            setObj(mealPlanObj.data);
        }

        getMealFromDb();
    }, [isFocused])

    useEffect(() =>{
        setPublished(obj.published);
    }, [obj])
    
    const handlePublishWrapper = async() => {
        if(published){
            await axios.patch("http://localhost:5001/nutrition/unPublishMealPlan", {mealPlanId: mealPlanId});
            setPublished(false);
        }
        else{
            await axios.patch("http://localhost:5001/nutrition/publishMealPlan", {mealPlanId: mealPlanId});
            setPublished(true);
        }
        handlePublish(obj);
    }

    return (
        <View style={[{flexDirection: 'row'}, {display: 'flex'}, {justifyContent: 'space-between'}, {paddingHorizontal: 5}]}>
            
            <TouchableOpacity onPress={()=> navigation.navigate('NutritionMealPlanInfo', {obj})} style={[styles.inputView, {width: '75%'}]}>
                <Text style={styles.inputText}>{obj.planName}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> handlePublishWrapper()} style={[styles.TouchableOpacityList]} >
                <Text style={{fontFamily: "Inter-Medium", fontWeight: '600', fontSize:14, color: "white"}}>
                    {published ? "Published" : "Publish"}
                </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    inputView:{
        height: 45,
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
export default MealPlanItem;