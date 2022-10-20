import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

//Screens
import Login from '../screens/Login'
import Register from '../screens/Register';
import TempLanding from '../screens/TempLanding';
import NavBar from '../components/NavBar';
import CalorieCalculator from '../screens/CalorieCalculator';
import Nutrition from '../screens/Nutrition';
import NutritionAddFood from '../screens/NutritionAddFood';
import NutritionFoodViewer from '../screens/NutritionFoodViewer';
import NutritionPlans from '../screens/NutritionPlans';

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
                <Stack.Screen name = "NavBar" component={NavBar}/>
                <Stack.Screen name = "Nutrition" component={Nutrition}/>
                <Stack.Screen name = "CalorieCalculator" component={CalorieCalculator}/>
                <Stack.Screen name = "NutritionAddFood" component={NutritionAddFood}/>
                <Stack.Screen name = "NutritionFoodViewer" component={NutritionFoodViewer}/>
                <Stack.Screen name = "NutritionPlans" component={NutritionPlans}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppStack;