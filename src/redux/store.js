import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';
import statisticReducer from './slices/statisticSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        order: orderReducer,
        product: productReducer,
        statistic: statisticReducer,
        user: userReducer,
    },
});

export default store;