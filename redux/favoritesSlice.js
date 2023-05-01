import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favoritedArticles: [],
};

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        setFavoritedArticles: (state, action) => {
            state.favoritedArticles = action.payload;
        },
        addFavoritedArticle: (state, action) => {
            state.favoritedArticles.push(action.payload);
        },
        removeFavoritedArticle: (state, action) => {
            state.favoritedArticles = state.favoritedArticles.filter(
                (article) => article.url !== action.payload.url
            );
        },
    },
});

export const {
    setFavoritedArticles,
    addFavoritedArticle,
    removeFavoritedArticle,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
