import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import articleReducer from './redux/articleSlice';
import userReducer from './redux/userSlice';
import filtersReducer from './redux/filtersSlice';
import favoritesReducer from './redux/favoritesSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
};

const rootReducer = {
    article: articleReducer,
    user: persistReducer(persistConfig, userReducer),
    filters: filtersReducer,
    favorites: favoritesReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export const persistor = persistStore(store);

export default store;
