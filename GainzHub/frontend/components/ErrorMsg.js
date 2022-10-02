import {Text, View, StyleSheet} from 'react-native'

const ErrorMSG = (props) => {
    return(
        <View style = {styles.container}>
            <Text style = {styles.msgText}>{props.message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    msgText:{
        color: '#FF0000',
    },
    container:{
        flex: 1,
    }
});


export default ErrorMSG;