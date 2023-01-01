import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { FlatList, LogBox, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ChatListScreen = ({ route }) => {

    const { allData, setAllData } = route.params;
    const navigation = useNavigation();

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    const onItemPress = (item, index) => {
        if (item.isOnline) {
            navigation.navigate('ChatScreen', { allData: allData, index: index, setAllData: setAllData });
        }
        else {
            alert("User is offline or outside 1km radius.")
        }
    }

    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={allData}
                extraData={allData}
                keyExtractor={(item) => item.userName}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity style={styles.itemContainer} onPress={() => onItemPress(item, index)}>
                            <View style={[styles.onlineIndicator, item.isOnline ? { backgroundColor: '#00eb00' } : { backgroundColor: 'red' }]} />
                            <View style={styles.itemInnerContainer}>
                                <Text style={styles.userNameText}>{item.userName}</Text>
                                <Text numberOfLines={1} style={styles.lastMessageText}>{item.chatData.length != 0 ? item.chatData[0].text : 'No messages yet.'}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#e1eefb',
        paddingTop: 5,
        paddingBottom: 40
    },
    itemContainer: {
        backgroundColor: '#aed1f4',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 10,
        padding: 6,
        paddingHorizontal: 12,
        borderRadius: 10
    },
    onlineIndicator: {
        height: 15,
        width: 15,
        borderRadius: 10
    },
    itemInnerContainer: {
        flex: 1,
        marginLeft: 12
    },
    userNameText: {
        flex: 1,
        fontFamily: 'Avenir',
        fontSize: 20,
        fontWeight: 'bold'
    },
    lastMessageText: {
        marginTop: 5,
        flex: 1,
        fontFamily: 'Avenir',
        fontSize: 14,
        opacity: 0.5,
        marginRight: 20
    }
})


export default ChatListScreen;