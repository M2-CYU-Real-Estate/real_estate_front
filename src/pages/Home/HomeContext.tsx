/**
 * Define a context for use in the home page (for passing loading functions for example)
 */
import { createContext } from 'react';

interface HomeContextType {
    enableLoading: () => void;
    disableLoading: () => void;
}

const HomeContext = createContext<HomeContextType>({
    enableLoading: createDefaultFunction('enableLoading'),
    disableLoading: createDefaultFunction('disableLoading'),
});

/**
 * Create a default function that will log a warning,
 * showing that the function was not created properly
 */
function createDefaultFunction(functionName: string) {
    const msg = `HomeContext: ${functionName} not defined, this will only log this message`;
    return () => console.warn(msg);
}

export default HomeContext;
