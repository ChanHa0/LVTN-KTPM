import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productApi from '../../api/productApi';

// Thunk để lấy chi tiết sản phẩm
export const fetchProductDetail = createAsyncThunk('product/fetchProductDetail', async (id, { rejectWithValue }) => {
    try {
        const response = await productApi.getDetailProduct(id);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        // Các reducer khác nếu cần
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductDetail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductDetail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.product = action.payload;
            })
            .addCase(fetchProductDetail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default productSlice.reducer; 