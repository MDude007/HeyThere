import { createStackNavigator } from "@react-navigation/stack";
import ChatListScreen from "../screens/ChatListScreen";
import ChatScreen from "../screens/ChatScreen";
import HomeScreen from "../screens/HomeScreen";
import MapViewScreen from "../screens/MapViewScreen";
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
                title: "Home Screen",
                headerTitleStyle: {
                    color: 'black',
                    fontFamily: 'Didot',
                    fontSize: 20,
                    fontWeight: 'bold'
                },
                headerStyle: {
                    backgroundColor: '#e1eefb'
                }
            }} />
            <Stack.Screen name="MapViewScreen" component={MapViewScreen} options={{
                title: "Map Screen",
                headerTitleStyle: {
                    color: 'black',
                    fontFamily: 'Didot',
                    fontSize: 20,
                    fontWeight: 'bold'
                },
                headerStyle: {
                    backgroundColor: '#e1eefb'
                }
            }} />
            <Stack.Screen name="ChatListScreen" component={ChatListScreen} options={{
                title: "Chat List",
                headerTitleStyle: {
                    color: 'black',
                    fontFamily: 'Didot',
                    fontSize: 20,
                    fontWeight: 'bold'
                },
                headerStyle: {
                    backgroundColor: '#e1eefb'
                }
            }} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} options={{
                title: "Chat Screen",
                headerTitleStyle: {
                    color: 'black',
                    fontFamily: 'Didot',
                    fontSize: 20,
                    fontWeight: 'bold'
                },
                headerStyle: {
                    backgroundColor: '#e1eefb'
                }
            }} />
        </Stack.Navigator >
    )
}

export default MyStack