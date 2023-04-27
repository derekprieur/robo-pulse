import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setActiveFilters: (state, action) => {
            return [...action.payload];
        },
    },
});

export const { setActiveFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
