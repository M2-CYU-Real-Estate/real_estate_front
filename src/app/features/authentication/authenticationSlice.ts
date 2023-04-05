import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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

export const { logout, setUserCredentials } = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;
