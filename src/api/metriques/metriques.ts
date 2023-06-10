
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { RootState } from '../../app/store';
import GLOBALS from '../../globals';
import { User } from '../../types/user';

interface Request {
    id: string;
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


export const metriquesApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: GLOBALS.apiRoutes.estates(),
        credentials: 'same-origin',
    }),
    endpoints: (builder) => ({
        stats: builder.query<ResponseStats, Request>({
            query: (id) => ({
                url: `/${id}/stats`,
                method: 'GET',
            }),
        }),
        advice: builder.query<ResponseAdvice, Request>({
            query: (id) => ({
                url: `/${id}/advice`,
                method: 'GET',
            }),
        }),
    }),
});
  

export const { useStatsQuery, useAdviceQuery} = metriquesApi;