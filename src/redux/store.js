import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import statisticReducer from './slices/statisticSlice';

// Tạo store với configureStore
const store = configureStore({
    reducer: {
        product: productReducer,
        order: orderReducer,
        user: userReducer,
        cart: cartReducer,
        statistic: statisticReducer,
    },
});

export default store;