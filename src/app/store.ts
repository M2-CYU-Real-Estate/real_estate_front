import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authApi } from '../api/authentication/authenticationApi';
import {
    authenticationReducer,
    AuthenticationState,
} from './features/authentication/authenticationSlice';

import storageSession from 'redux-persist/lib/storage/session';
import { PersistConfig, persistReducer } from 'redux-persist';

const persistConfig: PersistConfig<AuthenticationState> = {
    key: 'persist_root',
    storage: storageSession,
};

// TODO : how do we define properly this ? Do we really want to use redux-presist ?

export const store = configureStore({
    reducer: {
        authUser: authenticationReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
    // Permit to access devtools when not in production environment
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// These hooks are typed versions of hooks for accessing the store
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
