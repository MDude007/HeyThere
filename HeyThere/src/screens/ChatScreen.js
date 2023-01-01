import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useContext, useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import uuid from 'react-native-uuid';
import { DataContext } from "../../App";

const ChatScreen = ({ route }) => {

    const { index } = route.params;
    const { allData, setAllData } = useContext(DataContext);

    const [messages, setMessages] = useState(allData[index].chatData);

    const setAsyncStorageData = async (changedData) => {
        await AsyncStorage.setItem('allData', JSON.stringify(changedData));
    }

    useEffect(() => {
        if (messages.length) {
            let temp = allData;
            temp[index].chatData = messages;
            setAsyncStorageData(temp);
            setAllData(temp);
        }
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