import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";

const MapViewComponent = ({ currPosition, allData, setAllData }) => {

    const [state, setState] = useState([]);
    let x = Math.random() * 0.01;
    // need to add negative value as well
    console.log(x.toFixed(5));
    console.log(allData)
    const navigation = useNavigation();

    return (
        <>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: currPosition.latitude,
                    longitude: currPosition.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                }}
                minZoomLevel={12}
            >
                <Marker pinColor="blue" coordinate={{
                    latitude: currPosition.latitude,
                    longitude: currPosition.longitude
                }} />

                {
                    allData.map((item, id) => {
                        return (
                            <View key={id}>
                                {
                                    item.isOnline
                                        ?
                                        <Marker onPress={() => { navigation.navigate('ChatScreen', { allData: allData, index: id, setAllData: setAllData }) }} coordinate={{
                                            latitude: item.location.latitude,
                                            longitude: item.location.longitude
                                        }}>
                                            <View style={styles.userIndicator}>
                                                <Text style={styles.userIndicatorText}>{item.userName}</Text>
                                            </View>
                                        </Marker>

                                        :
                                        null
                                }
                            </View>
                        )

                    })
                }

                <Circle
                    center={{
                        latitude: currPosition.latitude,
                        longitude: currPosition.longitude
                    }}
                    radius={1000}
                    strokeWidth={1}
                    strokeColor={'#1a66ff'}
                    fillColor={'rgba(230,238,255,0.5)'}
                />
            </MapView>
        </>

    )
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    userIndicator: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'green',
        borderRadius: 5
    },
    userIndicatorText: {
        fontSize: 14,
        color: 'white',
        letterSpacing: -0.3,
        fontFamily: 'Avenir',
        fontWeight: 'bold'
    }
});

export default MapViewComponent;