import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import GLOBALS from '../../globals';
import { User, UserProfiles } from '../../types/user';
import { addAuthorizationToken } from '../apiInitializers';
import { EnergyClass, PriceRange } from '../mocks/mockProfiles';


export interface UserProfilesAdd {
    name: string
    budgetClass: PriceRange;
    postalCode: string;
    acceptableDistance: number;
    houseArea: number;
    rooms: number;
    bedrooms: number;
    bathrooms: number;
    minEnergyClass: EnergyClass;
    balcony: boolean
    fittedKitchen: boolean
    scoreSecurity : number;
    scoreEducation: number;
    scoreHobbies: number;
    scoreEnvironment: number;
    scorePracticality: number;
}

export interface UserProfilesMod extends UserProfilesAdd {
    id?: string;
}

export const userApi = createApi({
    reducerPath: 'userApi',
    refetchOnReconnect: true,
    tagTypes: ["user", "profiles"],
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
        userProfiles: builder.query<UserProfiles[], void>({
            query: () => ({
                url: '/profiles',
                method: 'GET'
            }),
            providesTags: ["profiles"]
        }),
        profileById: builder.query<UserProfiles, string | undefined>({
            query: (id) => ({
                url: `/profiles/${id}`,
                method: 'GET'
            })
        }),
        createProfile: builder.mutation<void, UserProfilesAdd>({
            query: (param) => ({
                url: '/profiles',
                method: 'POST',
                body: param 
            }),
            invalidatesTags: ["profiles"]
        }),
        deleteProfile: builder.mutation<void, number | undefined>({
            query: (id) => ({
                url: `/profiles/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["profiles"]
        }),
        updateProfile: builder.mutation<void, UserProfilesMod>({
            query: (param) => {
                // The id came from query params, 
                // this can be undefined and needs to be checked
                const id = param.id;
                if (id === undefined) {
                    throw new Error(`No estate id found`);
                }
                const idNumber = parseInt(id);
                if (isNaN(idNumber) || idNumber < 0) {
                    throw new Error(`The provided id is not a number: ${id}`);
                }
                return {
                    url: `/profiles/${param.id}`,
                    method: 'PUT',
                    body: param
                };},
            invalidatesTags: ["profiles"]
        }),
    }),
});

export const { useCurrentUserQuery, useUserByIdQuery, useUserProfilesQuery, 
    useCreateProfileMutation, useProfileByIdQuery, useUpdateProfileMutation, useDeleteProfileMutation} = userApi;
