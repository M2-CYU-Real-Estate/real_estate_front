/**
 * Defines all types and definitions for profile and forms.
 */

export const enum PriceRange {
    LOW = 'low',
    MEDIUM = 'medium',
    NORMAL = 'normal',
    RICH = 'rich',
    VERY_RICH = 'very_rich',
}

export const enum EnergyClass {
    E = 1,
    D,
    C,
    B,
    A,
}

export interface FormValues {
    presetId: number;
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
            presetId: 0,
            priceRange: PriceRange.NORMAL,
            houseAreaSqrtM: 90,
            rooms: 4,
            bedrooms: 2,
            bathrooms: 1,
            energyClass: EnergyClass.C,
            balcony: false,
            fittedKitchen: false,
            city: 'Paris-1Er-Arrondissement (75001)',
            cityDistanceKm: 100,
        },
    },
    {
        title: 'Jeune adulte',
        description:
            'Une personne qui débute sa vie et recherche un premier bien abordable',
        initialValues: {
            presetId: 1,
            priceRange: PriceRange.LOW,
            houseAreaSqrtM: 90,
            rooms: 4,
            bedrooms: 2,
            bathrooms: 1,
            energyClass: EnergyClass.C,
            balcony: false,
            fittedKitchen: false,
            city: 'Paris-1Er-Arrondissement (75001)',
            cityDistanceKm: 100,
        },
    },
    {
        title: 'Petite famille',
        description:
            'Un couple avec un ou deux enfants qui recherche un bien pour les voir grandir',
        initialValues: {
            presetId: 2,
            priceRange: PriceRange.NORMAL,
            houseAreaSqrtM: 90,
            rooms: 4,
            bedrooms: 2,
            bathrooms: 1,
            energyClass: EnergyClass.C,
            balcony: false,
            fittedKitchen: false,
            city: 'Paris-1Er-Arrondissement (75001)',
            cityDistanceKm: 100,
        },
    },
    {
        title: 'Grande famille',
        description:
            "Un couple avec beaucoup d'enfants d'âges divers et variés",
        initialValues: {
            presetId: 3,
            priceRange: PriceRange.RICH,
            houseAreaSqrtM: 90,
            rooms: 4,
            bedrooms: 2,
            bathrooms: 1,
            energyClass: EnergyClass.C,
            balcony: false,
            fittedKitchen: false,
            city: 'Paris-1Er-Arrondissement (75001)',
            cityDistanceKm: 100,
        },
    },
];
