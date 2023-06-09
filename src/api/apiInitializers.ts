/**
 * Various methods for initializing the various fetchBaseQueries
 */

import { RootState } from '../app/store';

// Define type for function definitions
type GetStateFunc = () => unknown;

/**
 * If the authorization token is present, add it in the headers
 */
export function addAuthorizationToken(
    headers: Headers,
    getState: GetStateFunc
): Headers {
    const token = (getState() as RootState).authUser.token;
    console.log(token);
    if (token) {
        headers.set('Authorization', `${token}`);
    }
    return headers;
}

/**
 * If the authorization token is present, add it in the headers.
 *
 * If the authorization token is not present, throw an error.
 */
export function addAuthorizationTokenOrThrow(
    headers: Headers,
    getState: GetStateFunc
): Headers {
    const token = (getState() as RootState).authUser.token;
    if (!token) {
        throw new Error('No authorization token could be found');
    }
    headers.set('Authorization', `${token}`);
    return headers;
}
