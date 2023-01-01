import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { View, Button, Text, StyleSheet, Platform, ActivityIndicator, TouchableOpacity } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import { ScrollView } from "react-native-gesture-handler";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import { DataContext } from "../../App";

const emptyData = [
    {
        "userName": "User1",
        "location": {},
        "chatData": [],
        "isOnline": false
    },
    {
        "userName": "User2",
        "location": {},
        "chatData": [],
        "isOnline": false
    },
    {
        "userName": "User3",
        "location": {},
        "chatData": [],
        "isOnline": false
    },
    {
        "userName": "User4",
        "location": {},
        "chatData": [],
        "isOnline": false
    },
    {
        "userName": "User5",
        "location": {},
        "chatData": [],
        "isOnline": false
    },
    {
        "userName": "User6",
        "location": {},
        "chatData": [],
        "isOnline": false
    },
    {
        "userName": "User7",
        "location": {},
        "chatData": [],
        "isOnline": false
    },
    {
        "userName": "User8",
        "location": {},
        "chatData": [],
        "isOnline": false
    },
    {
        "userName": "User9",
        "location": {},
        "chatData": [],
        "isOnline": false
    },
    {
        "userName": "User10",
        "location": {},
        "chatData": [],
        "isOnline": false
    }
]

const HomeScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [currPosition, setCurrPosition] = useState({});
    const { allData, setAllData } = useContext(DataContext);
    // const [allData, setAllData] = useState([]);

    async function requestLocationPermission() {
        if (Platform.OS == 'android') {
            try {
                const locationPermission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

                if (locationPermission == RESULTS.GRANTED) {
                    findGeoLocation();
                }
                else if (locationPermission == RESULTS.DENIED || locationPermission == RESULTS.LIMITED) {
                    const reqResult = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
                    if (reqResult == RESULTS.GRANTED) {
                        findGeoLocation();
                    }
                }
            } catch (error) {
                // console.log('try catch: ', error);
            }
        }
        if (Platform.OS === 'ios') {
            try {
                const locationPermission = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

                if (locationPermission == RESULTS.GRANTED) {
                    findGeoLocation();
                }
                else if (locationPermission == RESULTS.DENIED || locationPermission == RESULTS.LIMITED) {
                    const reqResult = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
                    if (reqResult == RESULTS.GRANTED) {
                        findGeoLocation();
                    }
                }
            } catch (error) {
                // console.log('try catch: ', error);
            }
        }
    }

    const findGeoLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                setCurrPosition(position.coords);
                // console.log(position);
                setLoading(false);
            },
            (error) => {
                alert(error.message);
                setLoading(false);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    const getStoredData = async () => {
        let storedData = await AsyncStorage.getItem('allData');
        if (typeof (storedData) == 'undefined' || storedData == null || JSON.parse(storedData).length == 0) {
            await AsyncStorage.setItem('allData', JSON.stringify(emptyData));
            setAllData(emptyData);
        }
        else {
            setAllData(JSON.parse(storedData));
        }
    }

    const callInitailFunctions = () => {
        getStoredData();
        requestLocationPermission();
    }

    useEffect(() => {
        if (!loading) {
            updateData();
        }
    }, [loading])

    const updateData = () => {
        let tempData = allData;
        for (let i = 0; i < tempData.length; i++) {
            let isOnline = Math.random();
            if (isOnline < 0.5) tempData[i].isOnline = false;
            else {
                tempData[i].isOnline = true;
                let latDelta = Math.random();
                let longDelta = Math.random();
                tempData[i].location = {
                    latitude: currPosition.latitude + ((latDelta - 0.5) * 0.016),
                    longitude: currPosition.longitude + ((longDelta - 0.5) * 0.016)
                }
            }
        }
        setAllData(tempData);
    }

    useEffect(() => {
        callInitailFunctions();
    }, []);

    return (
        <ScrollView style={styles.mainContainer} contentContainerStyle={{ justifyContent: 'center' }}>
            {
                loading
                    ?
                    <ActivityIndicator size='large' />
                    :
                    <View style={{ marginBottom: 20 }}>
                        <View style={styles.instructionsContainer}>
                            <Text style={styles.instructionsText}>• There are three major screens in this app.</Text>
                            <Text style={styles.instructionsText}>• Map Screen will show the your current location and all the users online within 1 km radius.
                                You can tap on particular user to go to his chat.</Text>
                            <Text style={styles.instructionsText}>• Next is Chat List, which will show list of all the users with indicator showing wheter the
                                user is online or offline.</Text>
                            <Text style={styles.instructionsText}>• Finally in the Chat Screen you can chat with respective user. Chat is stored in AsyncStorage.
                                Since it's static you will receive the same text which you sent.</Text>
                        </View>
                        <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('MapViewScreen', { currPosition: currPosition })}>
                            <Text style={styles.buttonText}>Go to Map View</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('ChatListScreen')}>
                            <Text style={styles.buttonText}>Go to Chat List</Text>
                        </TouchableOpacity>
                    </View>
            }
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#e1eefb',
    },
    instructionsContainer: {
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: '10%',
        backgroundColor: '#78b3ed',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    instructionsText: {
        flex: 1,
        marginVertical: 5,
        fontFamily: 'Avenir',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: -0.3,
        opacity: 0.7
    },
    buttonStyle: {
        backgroundColor: '#78b3ed',
        height: 100,
        marginVertical: 10,
        marginHorizontal: '10%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Avenir',
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: -0.3
    }
});

export default HomeScreen;