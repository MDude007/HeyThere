import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import { DataContext } from "../../App";

const MapViewComponent = ({ currPosition }) => {
    const navigation = useNavigation();
    const { allData, setAllData } = useContext(DataContext);

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
                                        <Marker onPress={() => { navigation.navigate('ChatScreen', { index: id }) }} coordinate={{
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