import { EstateType, RateClass } from "../../types/estate";

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

export interface ProfilPageParams {
    page?: number;
    pageSize?: number;
    profileId?:number;
}

export interface PricePerMonth {
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

export interface ResponseAdvice {
    estimatedPrice: number;
    minPrice: number;
    maxPrice: number;
    meanPrice:number;
    pricePerMonth: PricePerMonth;
}

export interface ResponseStats {
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