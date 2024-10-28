import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../services/firebase'; // Adjust path as necessary
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Signup
export const signup = createAsyncThunk('auth/signup', async ({ email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return {
        uid: userCredential.user.uid,      // Extract user ID
        email: userCredential.user.email,  // Extract email
        displayName: userCredential.user.displayName || 'Guest', // Optional: Extract display name or set default
    };
});

// Login
export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
        uid: userCredential.user.uid,      // Extract user ID
        email: userCredential.user.email,  // Extract email
        displayName: userCredential.user.displayName || 'Guest', // Optional: Extract display name or set default
    };
});

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null },
    reducers: {}, // No logout needed as per your request
    extraReducers: (builder) => {
        builder
            .addCase(signup.fulfilled, (state, action) => {
                state.user = action.payload; // Store only serializable data
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload; // Store only serializable data
            });
    },
});

export default authSlice.reducer;
