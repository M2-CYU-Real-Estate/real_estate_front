/**
 * Handle the state transition system of this component
 */

import { useState } from 'react';

/**
 * The states possible for the component
 */
export type ComponentState = 'initialChoice' | 'results' | 'profileCreation';

// Shortcut for hook return
type ReturnedHooks = [() => void, () => void, () => void];

/**
 * Define a custom hook for retrieving all functions for state transition
 *
 * @returns an array with 2 elements
 *     - The current state
 *     - An array containing all state transition functions
 */
export function useStateTransition(): [ComponentState, ReturnedHooks] {
    const [currentState, setCurrentState] =
        useState<ComponentState>('initialChoice');

    // Create transition functions
    const goToIntialChoice = () => setCurrentState('initialChoice');
    const goToProfileCreation = () => setCurrentState('profileCreation');
    const goToResults = () => setCurrentState('results');

    return [currentState, [goToIntialChoice, goToProfileCreation, goToResults]];
}
