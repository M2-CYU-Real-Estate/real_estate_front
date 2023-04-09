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
    if (token) {
        headers.set('Authorization', `${token}`);
    }
    return headers;
}
