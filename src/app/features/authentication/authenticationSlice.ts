import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
    id: number;
    name: string;
    email: string;
    creationDate: Date;
    lastLoginDate: Date;
}

interface AuthenticationState {
    user?: User | null;
    token?: string | null;
    rememberMe: boolean;
}

const initialState: AuthenticationState = {
    user: null,
    token: null,
    rememberMe: false,
};

export const authenticationSlice = createSlice({
    name: 'authenticationSlice',
    initialState,
    reducers: {
        logout: () => initialState,
    },
});

export const { logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
