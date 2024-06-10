import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const baseURL = 'http://localhost:5000/api';
// Async thunk for loading the user
export const loadUser = createAsyncThunk('auth/loadUser', async () => {
    const res = await axios.get(`${baseURL}/auth`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return res.data;
});

// Async thunk for logging in
export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
    const res = await axios.post(`${baseURL}/auth/login`, { email, password });
    localStorage.setItem('token', res.data.token);
    return res.data;
});

// Auth slice
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loadUser.rejected, (state) => {
                state.isAuthenticated = false;
                state.loading = false;
                state.user = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.loading = false;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state) => {
                state.isAuthenticated = false;
                state.loading = false;
                state.token = null;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
