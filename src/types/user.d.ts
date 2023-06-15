import { EnergyClass, PriceRange } from "../api/mocks/mockProfiles";

export type UserRole = 'USER' | 'ADMIN';
export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    creationDate: Date;
    lastLoginDate: Date;
}

export interface UserProfile {
    id: number;
    name: string;
    isMainProfile: boolean = false;
    caracteristics: object;
}


export interface UserProfiles {
    
    id: number;
    userId: number;
    isMainProfile: boolean;
    name: string
    budgetClass: PriceRange;
    postalCode: string;
    acceptableDistance: number;
    houseArea: number;
    rooms: number;
    bedrooms: number;
    bathrooms: number;
    minEnergyClass: EnergyClass;
    balcony: boolean
    fittedKitchen: boolean
    scoreSecurity : number;
    scoreEducation: number;
    scoreHobbies: number;
    scoreEnvironment: number;
    scorePracticality: number;

}