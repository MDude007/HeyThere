import { useNavigation } from "@react-navigation/native";
import { View, Button, Text } from "react-native";

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View>
            <Text>Hello World</Text>
            <Button onPress={() => navigation.replace('SplashScreen')} title='Click Me' />
        </View>
    )
}

export default HomeScreen;