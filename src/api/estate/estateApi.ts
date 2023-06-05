import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import GLOBALS from '../../globals';
import { addAuthorizationToken } from '../apiInitializers';
import { Estate, EstateType, RateClass } from '../../types/estate';

export interface EstatePageParams {
    page?: number;
    pageSize?: number;
    type?: EstateType;
    city?: string;
    minPr?: number;
    maxPr?: number;
    minHArea?: number;
    maxHArea?: number;
    terrace?: boolean;
    balcony?: boolean;
    parking?: boolean;
    garage?: boolean;
    fKitchen?: boolean;
    elevator?: boolean;
    enClass?: RateClass;
    gzClass?: RateClass;
}

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
        })
    })
});

export const { useEstateByIdQuery, useEstatesPageQuery } = estateApi;
