import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

interface AuthRequest {
    email: string;
    password: string;
}
