//Workout plan card for workout plans page
import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TextInput, Button} from 'react-native'
import { Card, Paragraph, Button as But} from 'react-native-paper'
import {Colors} from "../components/colors"
import {TouchableOpacity} from "@gorhom/bottom-sheet"
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';


const PublishedWorkoutPlanCard = ({navigation, planName, planDescription, planPrivacy}) => {
    const [privacy, setPrivacy] = useState(planPrivacy);
    
    const togglePrivacy = () =>{
        setPrivacy(priv => !priv);
    }

    const dict = {true: 'Unpublish', false: 'Publish'};
    
    return(
        <View style={{display: 'flex', paddingRight:10}}>
            <Card style={styles.planCardContainer} elevation={5}>
                <Card.Title title = {planName}/>
                <Card.Content style={{display: 'flex',  minHeight:"60%", height:"60%"}}>
                    <Paragraph  style={{overflow:"scroll", width:100,flexWrap:"wrap"}}>
                        {planDescription }
                    </Paragraph>
                    <But
                    style = {styles.button} 
                    mode = 'contained' 
                    buttonColor = {Colors.maroon}
                    onPress = {togglePrivacy}>{dict[privacy]}</But>
                </Card.Content>
            </Card>
        </View>

    );
}

const styles = StyleSheet.create({
    planCardContainer: {
        width:'10em',
        height:"10em",
        borderRadius:10,
        borderWidth: 3,
        borderColor:'#545454',
        display: "flex",
        flexDirection:"column",
    },
    button:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2px',

    }
});

export default PublishedWorkoutPlanCard;