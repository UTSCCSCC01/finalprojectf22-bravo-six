import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

//Screens
import Login from '../screens/Login'
import Register from '../screens/Register';
import Profile from '../screens/Profile';
import NavBar from '../components/NavBar';
import CalorieCalculator from '../screens/CalorieCalculator';
import Nutrition from '../screens/Nutrition';
import NutritionAddFood from '../screens/NutritionAddFood';
import NutritionFoodViewer from '../screens/NutritionFoodViewer';
import NutritionPlans from '../screens/NutritionPlans';
import NutritionMealAdder from '../screens/NutritionMealAdder';
import NutritionMealPlanInfo from '../screens/NutritionMealPlanInfo';
import WorkoutLanding from '../screens/WorkoutLanding';
import WorkoutAddPlan from '../screens/WorkoutAddPlan';
import WorkoutExplore from '../screens/WorkoutExplore';
import WorkoutLogs from '../screens/WorkoutLogs';
import Progresss from '../screens/Progress';
import ProgressBMI from '../screens/ProgressBMI';
import ProgressBF from '../screens/ProgressBF';
import ProgressAddBodyWeight from '../screens/ProgressAddBodyWeight';
import BMICalculator from '../screens/BMICalculator';
import BFCalculator from '../screens/BFCalculator';
import NutritionMealPlanEditor from '../screens/NutritionMealPlanEditor';
import ReviewMealPlan from '../screens/ReviewMealPlan';
import Social from '../screens/Social';
import SocialHome from '../screens/SocialHome';
import SocialExplore from '../screens/SocialExplore';
import SocialCreate from '../screens/SocialCreate';
import Profile_Edit from '../screens/Profile_Edit';
import ViewProfile from '../screens/ViewProfile';

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
                <Stack.Screen name = "Profile" component={Profile}/>
                <Stack.Screen name = "NavBar" component={NavBar}/>
                <Stack.Screen name = "CalorieCalculator" component={CalorieCalculator}/>
                <Stack.Screen name = "NutritionAddFood" component={NutritionAddFood}/>
                <Stack.Screen name = "NutritionFoodViewer" component={NutritionFoodViewer}/>
                <Stack.Screen name = "NutritionPlans" component={NutritionPlans}/>
                <Stack.Screen name = "NutritionMealAdder" component={NutritionMealAdder}/>
                <Stack.Screen name = "NutritionMealPlanInfo" component={NutritionMealPlanInfo}/>
                <Stack.Screen name = "Workout" component={WorkoutLanding}/>
                <Stack.Screen name = "WorkoutAddPlan" component={WorkoutAddPlan}/>
                <Stack.Screen name = "WorkoutExplore" component={WorkoutExplore}/>
                <Stack.Screen name = "WorkoutLogs" component={WorkoutLogs}/>
                <Stack.Screen name = "Progresss" component={Progresss}/>
                <Stack.Screen name = "ProgressBMI" component={ProgressBMI}/>
                <Stack.Screen name = "ProgressBF" component={ProgressBF}/>
                <Stack.Screen name = "BMICalculator" component={BMICalculator}/>
                <Stack.Screen name = "BFCalculator" component={BFCalculator}/>
                <Stack.Screen name = "NutritionMealPlanEditor" component={NutritionMealPlanEditor}/>
                <Stack.Screen name = "ReviewMealPlan" component={ReviewMealPlan}/>
                <Stack.Screen name = "AddBodyWeight" component={ProgressAddBodyWeight}/>
                <Stack.Screen name = "Profile_Edit" component={Profile_Edit}/>
                <Stack.Screen name = "ViewProfile" component={ViewProfile}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppStack;