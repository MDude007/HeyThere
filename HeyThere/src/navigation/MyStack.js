import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import SplashScreen from "../screens/SplashScreen";

const Stack = createStackNavigator();

const MyStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="SplasScreen">
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
                title: "HeyThere",
                headerTitleStyle: {
                    color: 'white',
                    fontFamily: 'Didot',
                    fontSize: 26,
                    fontWeight: 'bold'
                },
                headerStyle: {
                    backgroundColor: 'gray'
                }
            }} />
        </Stack.Navigator >
    )
}

export default MyStack