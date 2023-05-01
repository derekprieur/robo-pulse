import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeFilters: [],
    searchTerm: '',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setActiveFilters: (state, action) => {
            state.activeFilters = [...action.payload];
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
    },
});

export const { setActiveFilters, setSearchTerm } = filtersSlice.actions;

export default filtersSlice.reducer;
