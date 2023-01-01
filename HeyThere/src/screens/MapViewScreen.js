import { StyleSheet, Text, View } from "react-native";
import MapViewComponent from "../components/MapView";

const MapViewScreen = ({ route }) => {

    const { currPosition, allData, setAllData } = route.params;

    return (
        <View style={styles.mapContainer}>
            {
                typeof (currPosition.latitude) !== 'undefined'
                    ?
                    <MapViewComponent currPosition={currPosition} allData={allData} setAllData={setAllData} />
                    :
                    <Text style={styles.errorText}>Location Error!</Text>
            }

        </View>
    )

};

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#e1eefb'
    },
    errorText: {
        fontFamily: 'Avenir',
        fontSize: 20,
        textAlign: 'center'
    }
});

export default MapViewScreen;