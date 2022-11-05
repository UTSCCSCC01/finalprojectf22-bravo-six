import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState, useRef } from 'react';
import {Text, View, StyleSheet, Switch, TouchableOpacity, Animated, Easing} from 'react-native'
import { Colors } from './colors';
import React from 'react';

export const ButtonSwitch = (props) => {

    const navigation = useNavigation();
    const route = useRoute();

    let ovalPos = null;
    if(route.name == "Login"){
        ovalPos = new Animated.Value(0);
    }
    else{
        ovalPos = new Animated.Value(100);
    }
    

    const buttonHandler = (param) =>{
        if(param === 1){
            console.log(ovalPos);
            ovalMove(100, "Register");
        } else {
            console.log(ovalPos);
            ovalMove(0, "Login");
        }
    }

    const ovalMove = (x, param) => {
        Animated.timing(ovalPos, {
            toValue: x,
            duration: 150,
            easing: Easing.ease,
            useNativeDriver:false,
        }).start(() =>{
            navigation.push(param);
        })
    }


    return(
        <View style = {styles.container}>
            <View style = {styles.container2}>
                <TouchableOpacity onPress={() => buttonHandler(0)} style = {styles.opacity}>
                    <Text style = {[styles.text, {color: route.name === "Login" ? Colors.maroon : Colors.gray}]}>{props.first}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => buttonHandler(1)} style = {styles.opacity}>
                    <Text style = {[styles.text, {color: route.name === "Register" ? Colors.maroon : Colors.gray}]}>{props.second}</Text>
                </TouchableOpacity>
            </View>

            <Animated.View style = {[styles.ovalView, {transform: [{translateX: ovalPos}]}]}></Animated.View>


        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        border: '2px solid ',
        height: 50,
        width: 200,
        borderWidth: 25,
        borderRadius: 30,
        color: Colors.lightGray,
    },
    container2:{
        flex: 1,
        flexDirection: 'row',
    },
    opacity:{
        flex:1,
        margin:20,
        color: Colors.gray,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        color: Colors.gray,
        fontFamily: 'Inter-Bold',
    },
    ovalView: {
        height: 37,
        width: 80,
        backgroundColor: Colors.lightGray,
        borderRadius: 25,
        marginTop: 4,
        marginBottom: 8,
        marginLeft: 7,
        zIndex: -10,
    },
});
