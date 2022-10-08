import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import {Colors} from '../components/colors'

const ShowPasswordBtn = ({onPress}) =>{

    const {maroon, black} = Colors;

    return(
        <View style = {{flexDirection:"row", alignItems: "center"}}>
            <TouchableOpacity onPress = {onPress} style={{height: 20, width: 46}}>
                <Text style={{fontFamily: "Inter-Medium", fontSize: 12, fontWeight:"800",color:maroon}}> 
                    Show
                </Text>
            </TouchableOpacity>
        </View>

    );
}

export default ShowPasswordBtn;