import { configureStore } from '@reduxjs/toolkit';
import articleReducer from './redux/articleSlice';

const store = configureStore({
    reducer: {
        article: articleReducer,
    },
});

export default store;
