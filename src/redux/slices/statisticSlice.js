import { createSlice } from '@reduxjs/toolkit';

const statisticSlice = createSlice({
    name: 'statistic',
    initialState: {
        data: {
            totalRevenue: 0,
            totalOrders: 0,
            totalProductsSold: 0,
            totalInventory: 0
        }
    },
    reducers: {
        setStatistics: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { setStatistics } = statisticSlice.actions;
export default statisticSlice.reducer; 