import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersistConfig, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export interface AuthenticationState {
    token?: string | null;
    tokenExpirationDate?: Date | null;
    rememberMe: boolean;
}

const initialState: AuthenticationState = {
    token: null,
    tokenExpirationDate: null,
    rememberMe: false,
};

type CredentialsPayload = PayloadAction<{
    token: string;
    expirationDate: Date;
    rememberMe: boolean;
}>;

export const authenticationSlice = createSlice({
    name: 'authenticationSlice',
    initialState,
    reducers: {
        logout: () => initialState,
        setUserCredentials: (state, { payload }: CredentialsPayload) => {
            state.token = payload.token;
            state.tokenExpirationDate = payload.expirationDate;
            state.rememberMe = payload.rememberMe;
        },
    },
});

// Setup what is persisted and how
export const persistConfig: PersistConfig<AuthenticationState> = {
    keyPrefix: '',
    key: 'auth',
    storage: storage,
};

export const { logout, setUserCredentials } = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;
export const persistedAuthReducer = persistReducer(
    persistConfig,
    authenticationReducer
);
export const authenticationSliceName = authenticationSlice.name;
export const authenticationActions = authenticationSlice.actions;
