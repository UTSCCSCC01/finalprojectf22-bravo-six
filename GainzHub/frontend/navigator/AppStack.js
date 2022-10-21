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
import NutritionMealAdder from '../screens/NutritionMealAdder';
import NutritionMealPlanInfo from '../screens/NutritionMealPlanInfo';
import Workout from '../screens/Workout';
import WorkoutAddPlan from '../screens/WorkoutAddPlan';
import WorkoutExplore from '../screens/WorkoutExplore';
import WorkoutLogs from '../screens/WorkoutLogs';

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
                <Stack.Screen name = "CalorieCalculator" component={CalorieCalculator}/>
                <Stack.Screen name = "NutritionAddFood" component={NutritionAddFood}/>
                <Stack.Screen name = "NutritionFoodViewer" component={NutritionFoodViewer}/>
                <Stack.Screen name = "NutritionPlans" component={NutritionPlans}/>
                <Stack.Screen name = "NutritionMealAdder" component={NutritionMealAdder}/>
                <Stack.Screen name = "NutritionMealPlanInfo" component={NutritionMealPlanInfo}/>
                <Stack.Screen name = "Workout" component={Workout}/>
                <Stack.Screen name = "WorkoutAddPlan" component={WorkoutAddPlan}/>
                <Stack.Screen name = "WorkoutExplore" component={WorkoutExplore}/>
                <Stack.Screen name = "WorkoutLogs" component={WorkoutLogs}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppStack;