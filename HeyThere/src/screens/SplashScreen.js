import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";

const SplashScreen = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Image source={require('../assets/hey3.png')} style={styles.iconStyle} color='white' />
                <Text style={styles.titleTextStyle}> There</Text>
            </View>

            <LottieView
                source={require('../assets/SplashHeyThere.json')}
                autoPlay={true}
                loop={false}
                speed={1}
                onAnimationFinish={() => navigation.replace("HomeScreen")}
                style={styles.splashStyle}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#e1eefb'
    },
    titleContainer: {
        alignItems: 'center',
        flexDirection: "row"
    },
    iconStyle: {
        width: 75,
        height: 75,
        color: 'white'
    },
    titleTextStyle: {
        fontFamily: 'Papyrus',
        fontSize: 36,
        fontWeight: 'bold',
        color: 'black'
    },
    splashStyle: {
        width: 300,
        height: 300
    }
})

export default SplashScreen;