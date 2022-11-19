import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage'

const {maroon} = Colors;

const addedWorkoutPlanCard = ({navigation, plan, planName, userId, planPrivacy, planDescription}) => {
    const [privacy, setPrivacy] = useState(plan.planPrivacy);
    const [user, setUser] = useState({});
    const [currUser, setCurrUser] = useState({});
    const isFocused = useIsFocused();

    const dict = {true: 'Unpublish', false: 'Publish'};

    useEffect(() => {
        async function getCurrentUser()  {
            try{
                const token = await AsyncStorage.getItem('userData');
                const response = await axios.get("http://localhost:5001/user/getUserSecure", {
                    headers: {
                        "x-auth-token": token
                    }
                });
                setCurrUser(response.data);
            }catch(err){
                console.log(err);
            }
        } 
        getCurrentUser();   
    }, [isFocused]);

    useEffect(() => {
        console.log(currUser);
    }, [isFocused]);




    return(
        <View style={{display: 'flex', paddingRight:10}}>
            <Card onPress = {() => navigation.navigate("WorkoutPlanInfo", {plan: plan})} style={styles.planCardContainer} elevation={5}>
                <Card.Title title = {plan.planName}/>
                <Card.Content style={{display: 'flex',  minHeight:"60%", height:"60%"}}>
                    <Text style = {{color: maroon, fontStyle: 'bold'}}>{user.username}</Text>
                    <But style = {styles.button} 
                    mode = 'contained'
                    >
                    Add
                    </But>
                </Card.Content>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    planCardContainer: {
        width:'10em',
        height:"10em",
        borderRadius:10,
        borderWidth: 3,
        borderColor:'#545454',
        display: "flex",
        flexDirection:"column",
    },
    button:{
        marginTop: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2px',
        backgroundColor: 'black'
    }
});

export default PublishedWorkoutPlanCard;