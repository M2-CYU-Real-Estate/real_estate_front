export type EstateType = "HOUSE" | "APARTMENT";

export type RateClass = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "NC";

export interface Estate {
    id: number;
    isFavorite: boolean;
    title: string;
    description: string;
    url: string;
    imageUrl: string;
    type?: EstateType;
    cityName: string;
    postalCode: string;
    price: number;
    houseAreaSqrtM: number;
    groundAreaSqrtM: number;
    roomCount: number;
    bedroomCount: number;
    bathroomCount: number;
    isTerracePresent: boolean;
    isBalconyPresent: boolean;
    isElevatorPresent: boolean;
    isGaragePresent: boolean;
    isParkingPresent: boolean;
    isFittedKitchenPresent: boolean;
    energyClass: RateClass;
    gazEmissionClass: RateClass;
    createdAt: Date;
    lastUpdatedAt: Date;
}

