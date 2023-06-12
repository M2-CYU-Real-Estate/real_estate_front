import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authApi } from '../api/authentication/authenticationApi';
import { persistedAuthReducer } from './features/authentication/authenticationSlice';

import { persistStore } from 'redux-persist';
import * as persistConstants from 'redux-persist/es/constants';
import { userApi } from '../api/user/userApi';
import { estateApi } from '../api/estate/estateApi';
import { pricePredictionApi } from '../api/pricePrediction/pricePrediction';

// Create our store
export const store = configureStore({
    reducer: {
        authUser: persistedAuthReducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [estateApi.reducerPath]: estateApi.reducer,
        [pricePredictionApi.reducerPath]: pricePredictionApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Avoid throwing errors when Reduc Persist dispatch events
                ignoredActions: [
                    persistConstants.FLUSH,
                    persistConstants.REHYDRATE,
                    persistConstants.PAUSE,
                    persistConstants.PERSIST,
                    persistConstants.PURGE,
                    persistConstants.REGISTER,
                ],
            },
        })
            // Add all api middlewares afterwards
            .concat(authApi.middleware)
            .concat(userApi.middleware)
            .concat(estateApi.middleware)
            .concat(pricePredictionApi.middleware),
    // Permit to access devtools when not in production environment
    devTools: process.env.NODE_ENV !== 'production',
});

// Used for defining PersistGate in the index.tsx component
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// These hooks are typed versions of hooks for accessing the store
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
