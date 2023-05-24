/**
 * Defines all types and definitions for profile and forms.
 */

export enum PriceRange {
    LOW = 1,
    NORMAL,
    MEDIUM,
    RICH,
    VERY_RICH,
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
    energyClass: EnergyClass;
    balcony: boolean;
    fittedKitchen: boolean;
    targetCity: string;
    targetCityDistanceKm: number;
}

export interface BaseProfile {
    title: string;
    description: string;
    initialValues: FormValues;
}

export const profiles: BaseProfile[] = [
    {
        title: 'Par défaut',
        description: 'Aucun paramètre prédéfini, le choix par défaut',
        initialValues: {
            priceRange: PriceRange.NORMAL,
            houseAreaSqrtM: 90.0,
            rooms: 4,
            energyClass: EnergyClass.C,
            balcony: false,
            fittedKitchen: false,
            targetCity: 'Paris',
            targetCityDistanceKm: 100.0,
        },
    },
    {
        title: 'Jeune adulte',
        description:
            'Une personne qui débute sa vie et recherche un premier bien abordable',
        initialValues: {
            priceRange: PriceRange.NORMAL,
            houseAreaSqrtM: 90.0,
            rooms: 4,
            energyClass: EnergyClass.C,
            balcony: false,
            fittedKitchen: false,
            targetCity: 'Paris',
            targetCityDistanceKm: 100.0,
        },
    },
    {
        title: 'Petite famille',
        description:
            'Un couple avec un ou deux enfants qui recherche un bien pour les voir grandir',
        initialValues: {
            priceRange: PriceRange.NORMAL,
            houseAreaSqrtM: 90.0,
            rooms: 4,
            energyClass: EnergyClass.C,
            balcony: false,
            fittedKitchen: false,
            targetCity: 'Paris',
            targetCityDistanceKm: 100.0,
        },
    },
    {
        title: 'Grande famille',
        description:
            "Un couple avec beaucoup d'enfants d'âges divers et variés",
        initialValues: {
            priceRange: PriceRange.NORMAL,
            houseAreaSqrtM: 90.0,
            rooms: 4,
            energyClass: EnergyClass.C,
            balcony: false,
            fittedKitchen: false,
            targetCity: 'Paris',
            targetCityDistanceKm: 100.0,
        },
    },
];
