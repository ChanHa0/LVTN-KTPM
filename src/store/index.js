import { createStore, combineReducers } from 'redux';

// Ví dụ về reducer cho sản phẩm
const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload };
        default:
            return state;
    }
};

// Kết hợp các reducer
const rootReducer = combineReducers({
    product: productReducer,
    // Thêm các reducer khác nếu cần
});

// Tạo store
const store = createStore(rootReducer);

export default store;