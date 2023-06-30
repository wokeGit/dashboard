import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersReducer';

export const store = configureStore({
    reducer: {
        users: usersReducer,
    }
});