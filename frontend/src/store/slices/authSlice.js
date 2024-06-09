import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loadUser = createAsyncThunk('auth/loadUser', async () => {
    const res = await axios.get('/api/auth');
    return res.data;
});

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
    const res = await axios.post('/api/auth', { email, password });
    localStorage.setItem('token', res.data.token);
    return res.data;
});

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
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.loading = false;
                state.token = action.payload.token;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
