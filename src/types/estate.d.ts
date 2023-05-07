export interface EstateProperties {
    id: number;
    title: string;
    imageUrl: string;
    propertyUrl: string;
    price: number;
    description: string;
    isFavorite: boolean;
    area?: number;
    rooms?: number;
    bedrooms?: number;
    bathrooms?: number;
    date: Date;
}
