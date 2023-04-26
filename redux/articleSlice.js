import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentArticle: null,
};

const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        setCurrentArticle: (state, action) => {
            state.currentArticle = action.payload;
        },
    },
});

export const { setCurrentArticle } = articleSlice.actions;

export default articleSlice.reducer;
