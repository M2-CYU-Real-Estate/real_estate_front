
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import GLOBALS from '../../globals';
import { addAuthorizationToken } from '../apiInitializers';
import { Estate } from '../../types/estate';


export interface AddFavoriteParam {
    estateUrl:string;
}
export interface DeleteFavoriteParam {
    url:string;
}

export interface Annonce {
    
    id:number;
    isFavorite:boolean;
    title:string;
    description:string;
    url:string;
    imageUrl:string;
    type:string;
    cityName:string;
    postalCode:string;
    price:number;
    houseAreaSqrtM:number;
    groundAreaSqrtM:number;
    roomCount:number;
    bedroomCount:number;
    bathroomCount:number;
    isTerracePresent:boolean;
    isBalconyPresent: boolean;
    isElevatorPresent:boolean;
    isGaragePresent:boolean;
    isParkingPresent:boolean;
    isFittedKitchenPresent:boolean;
    energyClass:string;
    gazEmissionClass:string;
    createdAt:string;
    lastUpdatedAt:string;
}

export interface BienFavoris {
    totalCount:number
    size:number
    pageNumber:number
    pageCount:number
    content: Annonce
}

export const favoritesApi = createApi({
    reducerPath: 'favoritesApi',
    tagTypes: ["favorites"],
    baseQuery: fetchBaseQuery({
        baseUrl: GLOBALS.apiRoutes.favorites(),
        credentials: 'same-origin',
        prepareHeaders(headers, api) {
            return addAuthorizationToken(headers, api.getState);
        },
    }),
    endpoints: (builder) => ({
        addFavorite: builder.mutation<number, AddFavoriteParam>({
            query: (url) => {
                return {
                    url: ``,
                    method: 'POST',
                    body: url
                };
            },
            invalidatesTags: ['favorites']
        }),
        deleteFavorite: builder.mutation<number, DeleteFavoriteParam>({
            query: (url) => {
                return {
                    url: ``,
                    method: 'DELETE',
                    params: url
                };
            },
            invalidatesTags: ['favorites']
        }),
        listBienFavoris: builder.query<PageResponse<Estate>, number>({
            query: () => {
                return {
                    url: ``,
                    method: 'GET',
                };
            },
            transformResponse: (baseQueryReturnValue: PageResponse<Estate>) => ({
                ...baseQueryReturnValue,
                content: baseQueryReturnValue.content.map(estate => ({
                    ...estate, 
                    createdAt: new Date(estate.createdAt), 
                    lastUpdatedAt: new Date(estate.lastUpdatedAt)}
                ))
            }),
            providesTags: ['favorites']
        })
    })
});

export const { useAddFavoriteMutation, useDeleteFavoriteMutation, useListBienFavorisQuery} = favoritesApi;
