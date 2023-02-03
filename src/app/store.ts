import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './features/authentication/authenticationSlice';

export const store = configureStore({
    reducer: {
        authUser: authenticationReducer,
    },
    // Permit to access devtools when not in production environment
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
