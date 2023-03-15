export interface EstateProperties {
    title: string;
    imageUrl: string;
    propertyUrl: string;
    price: number;
    description: string;
    isNotificationEnabled: boolean;
    area?: number;
    rooms?: number;
    bedrooms?: number;
    bathrooms?: number;
}
