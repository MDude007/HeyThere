import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet, Platform, PermissionsAndroid, ActivityIndicator } from "react-native";
import Geolocation from 'react-native-geolocation-service';

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
    const [allData, setAllData] = useState([]);

    async function requestLocationPermission() {
        if (Platform.OS == 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("You can use the location")
                } else {
                    console.log("location permission denied")
                    alert('Location Permission Error!')
                }
            } catch (err) {
                console.warn(err);
                alert('Location Permission Error!');
            }
        }
        if (Platform.OS === 'ios') {
            try {
                await Geolocation.requestAuthorization('whenInUse');
            } catch (error) {
                console.log('try catch: ', error);
                // alert('Location Permission Error!');
            }
        }
    }

    const getStoredData = async () => {
        let storedData = await AsyncStorage.getItem('allData');
        console.log(storedData);
        if (typeof (storedData) == 'undefined' || storedData == null || storedData.length == 0) {
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
        Geolocation.getCurrentPosition(
            (position) => {
                setCurrPosition(position.coords);
                console.log(position);
                setLoading(false);
            },
            (error) => {
                alert(error.message);
                setLoading(false);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
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
        <View style={styles.mainContainer}>
            {
                loading
                    ?
                    <ActivityIndicator size='large' />
                    :
                    <View>
                        <Text>Hello World</Text>
                        <Button onPress={() => updateData()} title="Mandatory" />
                        <Button onPress={() => navigation.navigate('MapViewScreen', { currPosition: currPosition, allData: allData, setAllData: setAllData })} title='Click Me' />
                        <Button onPress={() => navigation.navigate('ChatListScreen', { allData: allData, setAllData: setAllData })} title='Click Me CHat List' />
                    </View >
            }
        </View>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#e1eefb'
    }
});

export default HomeScreen;