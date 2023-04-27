import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.currentUser = {
                displayName: action.payload.displayName,
                email: action.payload.email,
                photoURL: action.payload.photoURL,
            };
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
