import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import uuid from 'react-native-uuid';

const ChatScreen = ({ route }) => {

    const { allData, index, setAllData } = route.params;

    const [messages, setMessages] = useState(allData[index].chatData);

    const setAsyncStorageData = async () => {
        await AsyncStorage.setItem('allData', JSON.stringify(allData));
    }

    useEffect(() => {
        setAsyncStorageData();
    }, [allData])

    useEffect(() => {
        setAllData((curr) => {
            let temp = curr;
            temp[index].chatData = messages;
            return temp;
        })
    }, [messages])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => {
            messages = [{
                _id: uuid.v4(),
                text: messages[0].text,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    avatar: 'https://placeimg.com/140/140/people',
                },
            }, ...messages]
            return GiftedChat.append(previousMessages, messages)
        })
    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
        />
    )
}

export default ChatScreen;