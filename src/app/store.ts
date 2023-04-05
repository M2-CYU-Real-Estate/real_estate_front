import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authApi } from '../api/authentication/authenticationApi';
import { persistedAuthReducer } from './features/authentication/authenticationSlice';

import { persistStore } from 'redux-persist';
import * as persistConstants from 'redux-persist/es/constants';

// On login / logout, we want to save / remove the token etc.
// Create middleware for this, that will be used on store creation
// const authenticationMiddleware: Middleware<{}, RootState> =
//     (store) => (next) => (action) => {
//         // If we logged in
//         if (authenticationActions.setUserCredentials.match(action)) {
//             localStorage.setItem(GLOBALS.storageKeys.token, )
//         }
//     };

// Combine all wanted reducers into one
const rootReducer = combineReducers({
    authUser: persistedAuthReducer,
    [authApi.reducerPath]: authApi.reducer,
});

// Wrap it with the persistor
// const persistedReducer = persistReducer(
//     {
//         key: 'root',
//         storage: storage,
//         // Only want some reducers to be handled
//         whitelist: ['authUser'],
//     },
//     rootReducer
// );

// Finally, we can create our store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    persistConstants.FLUSH,
                    persistConstants.REHYDRATE,
                    persistConstants.PAUSE,
                    persistConstants.PERSIST,
                    persistConstants.PURGE,
                    persistConstants.REGISTER,
                ],
            },
        }).concat(authApi.middleware),
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
