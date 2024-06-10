import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
    const res = await axios.get('http://localhost:5000/api/orders');
    return res.data;
});

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        loading: true,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.loading = false;
        });
    },
});

export default orderSlice.reducer;
