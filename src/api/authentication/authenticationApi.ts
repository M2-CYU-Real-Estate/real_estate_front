import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { RootState } from '../../app/store';
import GLOBALS from '../../globals';
import { User } from '../../types/user';

interface AuthRequest {
    email: string;
    password: string;
}

interface AuthResponse {
    user: User;
    token: string;
    expirationDate: Date;
}

interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

interface RegisterResponse {
    id: number;
    username: string;
    email: string;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        credentials: 'same-origin',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).authUser.token;
            if (token) {
                headers.set('authentication', `${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, AuthRequest>({
            query: (request) => ({
                url: GLOBALS.apiRoutes.login(),
                method: 'POST',
                body: request,
            }),
        }),
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (request) => ({
                url: GLOBALS.apiRoutes.register(),
                method: 'POST',
                body: request,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
