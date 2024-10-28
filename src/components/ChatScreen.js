import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, Text, TextInput, Button, View, StyleSheet, Alert } from 'react-native';
import WebSocketService from '../services/websocketService'; // Import the WebSocketService
import { sendMessage, fetchMessages } from '../redux/slices/chatSlice';

const wsService = new WebSocketService('wss://chat-application-backend-1-m57u.onrender.com');

export default function ChatScreen() {
   const [text, setText] = useState('');
   const [isConnected, setIsConnected] = useState(false);
   const user = useSelector(state => state.auth.user);
   const messages = useSelector(state => state.chat.messages);
   const dispatch = useDispatch();

   useEffect(() => {
      // Fetch messages on component mount
      dispatch(fetchMessages());

      if (user) {
         wsService.setOnOpenCallback((event) => {
            console.log('WebSocket connection established:', event);
            setIsConnected(true);
            wsService.sendMessage({ type: 'NEW_USER', userId: user.uid });
         });

         wsService.setOnMessageCallback((newMessage) => {
            dispatch(sendMessage(newMessage));
         });

         wsService.setOnErrorCallback((error) => {
            console.error("WebSocket Error: ", error);
            Alert.alert("Connection Error", "An error occurred with the chat connection. Please try again.");
            setIsConnected(false);
         });

         wsService.setOnCloseCallback((event) => {
            console.log('WebSocket connection closed:', event);
            setIsConnected(false);
            if (event.code === 1006) {
               Alert.alert('Connection Error', 'The connection was closed unexpectedly. Please try reconnecting.');
            }
         });

         // Connect to the WebSocket server
         wsService.connect();
      }

      return () => {
         wsService.close(); // Clean up on component unmount
      };
   }, [dispatch, user]);

   const handleSend = () => {
      if (user) {
         if (text && isConnected) {
            const message = { text, senderId: user.uid, timestamp: new Date().toISOString() };
            wsService.sendMessage({ type: 'NEW_MESSAGE', ...message });
            dispatch(sendMessage(message));
            setText('');
         } else {
            Alert.alert('Message Cannot Be Empty', 'Please type a message to send!');
         }
      } else {
         Alert.alert('Not Authenticated', 'You need to be logged in to send messages.');
      }
   };

   return (
      <View style={styles.container}>
         <FlatList
            data={messages}
            renderItem={({ item }) => (
               <Text style={item.senderId === user?.uid ? styles.sentMessage : styles.receivedMessage}>
                  {item.text}
               </Text>
            )}
            keyExtractor={(item, index) => index.toString()}
         />
         <View style={styles.inputContainer}>
            <TextInput
               value={text}
               onChangeText={setText}
               style={styles.input}
               placeholder="Type a message..."
            />
            <Button title="Send" onPress={handleSend} disabled={!text || !isConnected} />
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: { flex: 1, padding: 10 },
   inputContainer: { flexDirection: 'row', padding: 10 },
   input: { flex: 1, borderWidth: 1, padding: 8, borderRadius: 5 },
   sentMessage: { alignSelf: 'flex-end', backgroundColor: '#d1ffcc', margin: 5, padding: 10, borderRadius: 10 },
   receivedMessage: { alignSelf: 'flex-start', backgroundColor: '#f0f0f0', margin: 5, padding: 10, borderRadius: 10 },
});
