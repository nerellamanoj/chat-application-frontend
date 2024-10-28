import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../services/firebase'; // Adjust the path according to your setup
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
    },
    reducers: {
        sendMessage: (state, action) => {
            state.messages.push(action.payload); // Add new message to the messages array
        },
        setMessages: (state, action) => {
            state.messages = action.payload; // Set the messages array
        },
    },
});

export const { sendMessage, setMessages } = chatSlice.actions;

// Fetch messages from Firestore
export const fetchMessages = () => async (dispatch) => {
    const unsubscribe = onSnapshot(collection(db, 'chats'), (snapshot) => {
        const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        dispatch(setMessages(messages)); // Update Redux store with fetched messages
    });

    return unsubscribe; // Return unsubscribe function to clean up
};

export default chatSlice.reducer;
