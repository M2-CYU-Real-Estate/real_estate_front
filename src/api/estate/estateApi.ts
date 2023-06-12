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

interface PricePerMonth {
    SEPTEMBER: number;
    NOVEMBER: number;
    JULY: number;
    FEBRUARY: number;
    JUNE: number;
    DECEMBER: number;
    MAY: number;
    JANUARY: number;
    MARCH: number;
    OCTOBER: number;
    APRIL: number;
    AUGUST: number;
}

interface ResponseAdvice {
    estimatedPrice: number;
    minPrice: number;
    maxPrice: number;
    meanPrice:number;
    pricePerMonth: PricePerMonth;
}

interface ResponseStats {
    meanScore: number;
    securityScore: number;
    educationScore: number;
    hobbiesScore:number;
    environmentScore:number
    practicalityScore: number;
    meanPriceBigCities: number;
    meanPriceApartment: number;
    meanPriceHouse: number;
}

export interface ResponsePositions {
    id: number;
    title: string;
    lat: string;
    lon: string;
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
            keepUnusedDataFor: 30
        }),
    })
});

export const { useEstateByIdQuery, useEstatesPageQuery, useAdviceQuery, useStatsQuery, usePositionsQuery } = estateApi;
