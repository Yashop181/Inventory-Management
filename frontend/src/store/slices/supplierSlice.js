import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSuppliers = createAsyncThunk('suppliers/fetchSuppliers', async () => {
    const res = await axios.get('/api/suppliers');
    return res.data;
});

const supplierSlice = createSlice({
    name: 'suppliers',
    initialState: {
        suppliers: [],
        loading: true,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSuppliers.fulfilled, (state, action) => {
            state.suppliers = action.payload;
            state.loading = false;
        });
    },
});

export default supplierSlice.reducer;
