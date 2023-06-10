
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { addAuthorizationToken } from '../apiInitializers';
import GLOBALS from '../../globals';


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


export const metriquesApi = createApi({
    reducerPath: 'metriquesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: GLOBALS.apiRoutes.estates(),
        credentials: 'same-origin',
        prepareHeaders(headers, api) {
            return addAuthorizationToken(headers, api.getState);
        },
    }),
    endpoints: (builder) => ({
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
    }),
});
  

export const { useStatsQuery, useAdviceQuery} = metriquesApi;