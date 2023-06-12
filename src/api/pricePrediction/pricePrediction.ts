import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import GLOBALS from '../../globals';
import { addAuthorizationToken } from '../apiInitializers';

export interface PredictedPrice {
    price: number;
}

export interface PredictedParams {
    houseArea: number;
    terrainArea: number;
    roomCount: number;
    bathroomCount: number;
    latitude: string;
    longitude: string;
    coord: string;
}
export const pricePredictionApi  = createApi({
    reducerPath: 'predictionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: GLOBALS.apiRoutes.prediction(),
        credentials: 'same-origin',
        prepareHeaders(headers, api) {
            return addAuthorizationToken(headers, api.getState);
        },
    }),
    endpoints: (builder) => ({
        pricePrediction: builder.mutation<PredictedPrice, PredictedParams>({
            query: (params) => {
                return {
                    url: ``,
                    method: 'GET',
                    params: params,
                    
                };
            },
        })
    })

});

export const { usePricePredictionMutation} = pricePredictionApi;
