import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import GLOBALS from '../../globals';
import { addAuthorizationToken } from '../apiInitializers';
import { Estate, EstateType, RateClass } from '../../types/estate';
import { EstatePageParams, ResponseAdvice, ResponsePositions, ResponseStats,ProfilPageParams  } from './estateInterface';



export const estateApi = createApi({
    reducerPath: 'estateApi',
    baseQuery: fetchBaseQuery({
        baseUrl: GLOBALS.apiRoutes.estates(),
        credentials: 'same-origin',
        prepareHeaders(headers, api) {
            return addAuthorizationToken(headers, api.getState);
        },
    }),
    endpoints: (builder) => ({
        estateById: builder.query<Estate, string | undefined>({
            query: (id) => {
                if (id === undefined) {
                    throw new Error(`No estate id found`);
                }
                const idNumber = parseInt(id);
                if (isNaN(idNumber) || idNumber < 0) {
                    throw new Error(`The provided id is not a number: ${id}`);
                }
                return {
                    url: `/${id}`,
                    method: 'GET',
                };
            },
        }),
        estatesPage: builder.query<PageResponse<Estate>, EstatePageParams>({
            query: (params = {}) => {
                return {
                    url: '',
                    method: 'GET',
                    params: params
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
          
        }),
        estatesRecommandation: builder.query<Estate[], void>({
            query: () => {
                return {
                    url: '/suggestions',
                    method: 'GET'
                };
            },
            transformResponse: (baseQueryReturnValue: Estate[]) => (
                baseQueryReturnValue.map(estate => ({
                    ...estate, 
                    createdAt: new Date(estate.createdAt), 
                    lastUpdatedAt: new Date(estate.lastUpdatedAt)}
                ))
            ),
        }),
        estatesProfile: builder.query<PageResponse<Estate>, ProfilPageParams>({
            query: (params = {}) => {
                return {
                    url: '/search-profile',
                    method: 'GET',
                    params: params
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
          
        }),
        stats: builder.query<ResponseStats, string | undefined>({
            query: (id) => {
                if (id === undefined) {
                    throw new Error(`No estate id found`);
                }
                const idNumber = parseInt(id);
                if (isNaN(idNumber) || idNumber < 0) {
                    throw new Error(`The provided id is not a number: ${id}`);
                }
                return {
                    url: `/${id}/stats`,
                    method: 'GET',
                };
            },
        }),
        advice: builder.query<ResponseAdvice,  string | undefined>({
            query: (id) => {
                if (id === undefined) {
                    throw new Error(`No estate id found`);
                }
                const idNumber = parseInt(id);
                if (isNaN(idNumber) || idNumber < 0) {
                    throw new Error(`The provided id is not a number: ${id}`);
                }
                return {
                    url: `/${id}/advice`,
                    method: 'GET',
                };
            },
        }),
        positions: builder.query<ResponsePositions[], number>({
            query: () => {
                return {
                    url: `/positions`,
                    method: 'GET',
                };
            },
        })
    })
});

export const { useEstateByIdQuery, useEstatesPageQuery, useAdviceQuery, useStatsQuery, usePositionsQuery, useEstatesRecommandationQuery, 
    useEstatesProfileQuery } = estateApi;
