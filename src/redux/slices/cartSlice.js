import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartApi from '../../api/cartApi';

// Thunk để lấy giỏ hàng
export const fetchCart = createAsyncThunk('cart/fetchCart', async (uId, { rejectWithValue }) => {
    try {
        const response = await cartApi.getCart(uId);
        return response;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Thunk để thêm sản phẩm vào giỏ hàng
export const addToCart = createAsyncThunk('cart/addToCart', async ({ uId, product }, { rejectWithValue }) => {
    try {
        const response = await cartApi.addToCart(uId, [product]);
        return response;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Thunk để tăng số lượng sản phẩm trong giỏ hàng
export const increaseQuantity = createAsyncThunk('cart/increaseQuantity', async ({ uId, prId }, { rejectWithValue }) => {
    try {
        const response = await cartApi.increaseQuantity(uId, prId);
        return response;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Thunk để giảm số lượng sản phẩm trong giỏ hàng
export const decreaseQuantity = createAsyncThunk('cart/decreaseQuantity', async ({ uId, prId }, { rejectWithValue }) => {
    try {
        const response = await cartApi.decreaseQuantity(uId, prId);
        return response;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalPrice: 0,
        status: 'idle',
        error: null,
    },
    reducers: {
        increaseItemQuantity: (state, action) => {
            const item = state.items.find(item => item.prId === action.payload.prId);
            if (item) {
                item.prQuantity += 1;
                state.totalPrice += item.prId.prPrice; // Cập nhật tổng giá
            }
        },
        decreaseItemQuantity: (state, action) => {
            const item = state.items.find(item => item.prId === action.payload.prId);
            if (item && item.prQuantity > 1) {
                item.prQuantity -= 1;
                state.totalPrice -= item.prId.prPrice; // Cập nhật tổng giá
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.cItems;
                state.totalPrice = action.payload.cTotalPrice;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.items = action.payload.data.cItems;
                state.totalPrice = action.payload.data.cTotalPrice;
            })
            .addCase(increaseQuantity.fulfilled, (state, action) => {
                state.items = action.payload.data.cItems;
                state.totalPrice = action.payload.data.cTotalPrice;
            })
            .addCase(decreaseQuantity.fulfilled, (state, action) => {
                state.items = action.payload.data.cItems;
                state.totalPrice = action.payload.data.cTotalPrice;
            });
    },
});

export const { increaseItemQuantity, decreaseItemQuantity } = cartSlice.actions;
export default cartSlice.reducer; 