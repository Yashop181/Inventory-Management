import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const res = await axios.get('/api/products');
    return res.data;
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        loading: true,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.loading = false;
        });
    },
});

export default productSlice.reducer;
