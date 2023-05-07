import { UserProfile } from '../../types/user';

export const mockProfiles: UserProfile[] = [
    {
        id: 1,
        isMainProfile: true,
        name: 'profile_1',
        caracteristics: {
            surface: 150,
        },
    },
    {
        id: 2,
        isMainProfile: false,
        name: 'profile_2',
        caracteristics: {
            surface: 150,
        },
    },
    {
        id: 3,
        isMainProfile: false,
        name: 'profile_3',
        caracteristics: {
            surface: 150,
        },
    },
    {
        id: 4,
        isMainProfile: false,
        name: 'profile_4',
        caracteristics: {
            surface: 150,
        },
    },
];
