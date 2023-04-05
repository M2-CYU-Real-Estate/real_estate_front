import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersistConfig, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { User } from '../../../types/user';

export interface AuthenticationState {
    user?: User;
    token?: string;
    tokenExpirationDate?: Date;
    rememberMe: boolean;
}

const initialState: AuthenticationState = {
    user: undefined,
    token: undefined,
    tokenExpirationDate: undefined,
    rememberMe: false,
};

type CredentialsPayload = PayloadAction<{
    user: User;
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
            state.user = payload.user;
            state.token = payload.token;
            state.tokenExpirationDate = payload.expirationDate;
            state.rememberMe = payload.rememberMe;
        },
    },
});

// Setup what is persisted and how
const persistConfig: PersistConfig<AuthenticationState> = {
    key: 'auth',
    storage: storage,
    // What we want to persist ?
    whitelist: ['token', 'tokenExpirationDate', 'rememberMe'],
    // transforms: [
    //     // This transform maps the state to setup what is
    //     // persisted and retrieved (and how)
    //     createTransform(
    //         (inboundState: AuthenticationState) => ({
    //             ...inboundState,
    //             // Don't store the user data in the storage
    //             user: undefined,
    //         }),
    //         (outboundState): AuthenticationState => ({
    //             ...outboundState,
    //             // TODO, fetch the user with api
    //             user: undefined,
    //         })
    //     ),
    // ],
};

export const { logout, setUserCredentials } = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;
export const persistedAuthReducer = persistReducer(
    persistConfig,
    authenticationReducer
);
export const authenticationSliceName = authenticationSlice.name;
export const authenticationActions = authenticationSlice.actions;
