import createTransform from 'redux-persist/lib/createTransform';
import { AuthenticationState } from './authenticationSlice';

/**
 * The transform used to save authentication data and retrieve it from storage
 */

export const authenticationTransform = createTransform(
    (inboundState: AuthenticationState, key): any => ({
        ...inboundState,
        // Don't store the user data in the storage
        user: undefined,
    }),
    (outboundState: any): AuthenticationState => ({
        ...outboundState,
        // TODO, fetch the user with api
        user: undefined,
    })
);
