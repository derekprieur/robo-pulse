import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentArticle: null,
    filteredArticles: [],
};

const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        setCurrentArticle: (state, action) => {
            state.currentArticle = action.payload;
        },
        setFilteredArticles: (state, action) => {
            state.filteredArticles = action.payload;
        },
    },
});

export const { setCurrentArticle, setFilteredArticles } = articleSlice.actions;

export default articleSlice.reducer;
