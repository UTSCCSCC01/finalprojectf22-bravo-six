import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {TextInput} from "react-native-paper";
import { Colors } from '../components/colors';
const Tab = createBottomTabNavigator();


export default function Social({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => alert('This is the "Social" screen.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Social</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    textInputLine:{
        backgroundColor: Colors.appBackground,
    }
})