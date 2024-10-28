// Chat.js
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, FlatList, StyleSheet } from 'react-native';
import { db, auth } from './firebase'; // Adjust the path according to your file structure
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch messages from Firestore
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'messages'), (snapshot) => {
            const messagesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(messagesData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Send a message
    const sendMessage = async () => {
        if (input) {
            try {
                await addDoc(collection(db, 'messages'), {
                    text: input,
                    uid: auth.currentUser.uid,
                    timestamp: new Date(),
                });
                setInput('');
            } catch (error) {
                console.error("Error sending message: ", error);
                // Optionally, display an alert or notification here
            }
        }
    };

    if (loading) {
        return <Text>Loading messages...</Text>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={({ item }) => (
                    <View style={item.uid === auth.currentUser.uid ? styles.myMessage : styles.friendMessage}>
                        <Text>{item.text}</Text>
                    </View>
                )}
                keyExtractor={item => item.id}
                style={styles.chatWindow}
                inverted // To display the latest message at the bottom
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                    placeholder="Type a message..."
                />
                <Button title="Send" onPress={sendMessage} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    chatWindow: {
        flex: 1,
        marginBottom: 10,
    },
    myMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#d1ffd1',
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
    },
    friendMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#e1e1e1',
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 5,
    },
});

export default Chat;
