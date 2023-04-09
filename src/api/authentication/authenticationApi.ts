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
        baseUrl: GLOBALS.apiRoutes.auth(),
        credentials: 'same-origin',
    }),
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, AuthRequest>({
            query: (request) => ({
                url: 'login',
                method: 'POST',
                body: request,
            }),
        }),
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (request) => ({
                url: 'register',
                method: 'POST',
                body: request,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
