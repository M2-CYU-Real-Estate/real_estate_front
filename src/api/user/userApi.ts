import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import GLOBALS from '../../globals';
import { User } from '../../types/user';
import { addAuthorizationToken } from '../apiInitializers';

export const userApi = createApi({
    reducerPath: 'userApi',
    refetchOnReconnect: true,
    baseQuery: fetchBaseQuery({
        baseUrl: GLOBALS.apiRoutes.users(),
        credentials: 'same-origin',
        prepareHeaders(headers, api) {
            return addAuthorizationToken(headers, api.getState);
        },
    }),
    endpoints: (builder) => ({
        currentUser: builder.query<User, void>({
            query: () => ({
                url: 'me',
                method: 'GET',
            }),
        }),
        userById: builder.query<User, number>({
            query: (id) => ({
                url: '',
                method: 'GET',
                params: {
                    id: id,
                },
            }),
        }),
    }),
});

export const { useCurrentUserQuery, useUserByIdQuery } = userApi;
