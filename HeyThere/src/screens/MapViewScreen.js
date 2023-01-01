import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DataContext } from "../../App";
import MapViewComponent from "../components/MapView";

const MapViewScreen = ({ route }) => {

    const { currPosition } = route.params;
    const { allData, setAllData } = useContext(DataContext);

    return (
        <View style={styles.mapContainer}>
            {
                typeof (currPosition.latitude) !== 'undefined'
                    ?
                    <MapViewComponent currPosition={currPosition} />
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