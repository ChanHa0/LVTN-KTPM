import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [] },
    reducers: {
        setCartItems: (state, action) => {
            state.items = action.payload;
        },
        addItemToCart: (state, action) => {
            state.items.push(action.payload);
        },
        removeItemFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
    },
});

export const { setCartItems, addItemToCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer; 