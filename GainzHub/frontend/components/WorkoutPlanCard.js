//Workout plan card for workout plans page
import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TextInput, Button} from 'react-native'
import { Card, Paragraph } from 'react-native-paper'
import {Colors} from "../components/colors"
import {TouchableOpacity} from "@gorhom/bottom-sheet"
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';


const WorkoutPlanCard = ({navigation, planName, planDescription}) => {
    return(
        <View style={{paddingRight:10}}>
            <Card style={styles.planCardContainer} elevation={5}>
                <Card.Title title = {planName}/>
                <Card.Content style={{minHeight:"90%",height:"90%"}}>
                    <Paragraph  style={{overflow:"scroll", width:100,flexWrap:"wrap"}}>
                        {planDescription }
                    </Paragraph>
                </Card.Content>
            </Card>
        </View>

    );
}

const styles = StyleSheet.create({
    planCardContainer: {
        width:'100%',
        height:"100%",
        borderRadius:10,
        borderWidth: 3,
        borderColor:'#545454',
        display: "flex",
        flexDirection:"column",
    }
});

export default WorkoutPlanCard;