
export enum PriceRange {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    NORMAL = 'NORMAL',
    RICH = 'RICH',
    VERY_RICH = 'VERY_RICH',
}

export enum EnergyClass {
    E = 1,
    D,
    C,
    B,
    A,
}

export interface FormValues {
    priceRange: PriceRange;
    houseAreaSqrtM: number;
    rooms: number;
    bedrooms: number;
    bathrooms: number;
    energyClass: EnergyClass;
    balcony: boolean;
    fittedKitchen: boolean;
    city: string;
    cityDistanceKm: number;
    securityScore: number;
    educationScore: number;
    hobbiesScore: number;
    environmentScore: number;
    practicalityScore: number;
}

export interface UserProfile {
    id: number;
    isMainProfile:boolean;
    name: string;
    caracteristics: FormValues;
}

export const mockProfiles: UserProfile[] = [
    {
        id: 1,
        isMainProfile: true,
        name: 'profile_1',
        caracteristics: {
            priceRange: PriceRange.LOW,
            houseAreaSqrtM: 90,
            rooms: 4,
            bedrooms: 2,
            bathrooms: 1,
            energyClass: EnergyClass.C,
            balcony: true,
            fittedKitchen: false,
            city: 'Paris-1er-Arrondissement (75001)',
            cityDistanceKm: 100,
            securityScore: 2,
            educationScore: 3.5,
            hobbiesScore: 2,
            environmentScore: 2,
            practicalityScore: 2,
        },
    },
    {
        id: 2,
        isMainProfile: false,
        name: 'profile_2',
        caracteristics: {
            priceRange: PriceRange.MEDIUM,
            houseAreaSqrtM: 90,
            rooms: 4,
            bedrooms: 2,
            bathrooms: 1,
            energyClass: EnergyClass.B,
            balcony: true,
            fittedKitchen: false,
            city: 'Paris-1er-Arrondissement (75001)',
            cityDistanceKm: 100,
            securityScore: 2,
            educationScore: 3.5,
            hobbiesScore: 2,
            environmentScore: 2,
            practicalityScore: 2,
        },
    },
];
