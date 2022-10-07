import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

//Screens
import Login from '../screens/Login'
import Register from '../screens/Register';
import TempLanding from '../screens/TempLanding';
import ChangeLastName from '../screens/ChangeLastName';

const Stack = createStackNavigator();

const AppStack = ()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login"
                            screenOptions={{
                            headerShown: false
                            }}>
                <Stack.Screen name = "Login" component={Login}/>
                <Stack.Screen name = "Register" component={Register}/>
                <Stack.Screen name = "TempLanding" component={TempLanding}/>
                <Stack.Screen name = "ChangeLastName" component={ChangeLastName}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppStack;