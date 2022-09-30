import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login';
import {useFonts} from 'expo-font'

export default function App() {
  let [fontsLoaded] = useFonts({
    "Inter-Thin": require("./assets/fonts/static/Inter-Thin.ttf"),
    "Inter-Bold": require("./assets/fonts/static/Inter-Bold.ttf"),
    "Inter-Medium": require("./assets/fonts/static/Inter-Medium.ttf")
  });
  
  if(!fontsLoaded){
    return (<Text>Loading</Text>);
  }

  return (
    <SafeAreaView style = {styles.root}>
      <Login/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
      flex: 1,
  },
})