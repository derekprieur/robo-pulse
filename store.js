import { configureStore } from '@reduxjs/toolkit';
import articleReducer from './redux/articleSlice';
import userReducer from './redux/userSlice';
import filtersReducer from './redux/filtersSlice';

const store = configureStore({
    reducer: {
        article: articleReducer,
        user: userReducer,
        filters: filtersReducer,
    },
});

export default store;
