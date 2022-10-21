import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Button, FlatList, SafeAreaView} from 'react-native'
import {Colors} from '../components/colors'
import axios from 'axios';
import Toast from 'react-native-root-toast';
import { loginUser } from '../requests/userRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import { useIsFocused } from '@react-navigation/native';

const {maroon, black} = Colors;

const WorkoutAddPlan = ({navigation: {goBack}}) => {
    
    return(
        <View style={[styles.root, {paddingLeft: 20}]}>
            <View style={[{alignItems: 'center'}]}>
                <Text style={{fontFamily:"Inter-Medium", fontWeight:"500", fontSize: 18, color: "white"}}>
                    Add
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root:{
        padding: 30
    },
    inputView:{
        height: 45,
        backgroundColor: "#FFFFFF",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        alignContent: 'center'
    },
    inputText:{
        height: 30,
        flex: 1,
        marginRight: 30,
        padding: 10,
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        fontSize: 14,
        alignContent: 'center',
        textAlign: 'left',
        borderRadius: 8,
        width: '100%',
        marginLeft: 30

    },
    inputViewRow:{
        height: 45,
        backgroundColor: "#FFFFFF",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        alignContent: 'center'
    },
    inputTextRow:{
        height: 30,
        flex: 1,
        marginRight: 30,
        padding: 10,
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        fontSize: 14,
        alignContent: 'center',
        textAlign: 'left',
        borderRadius: 8,
        width: '100%'

    },
    TouchableOpacity:{
        height:40,
        width:'40%',
        borderRadius: 30,
        backgroundColor: '#8D0A0A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',

    }
});

export default WorkoutAddPlan;