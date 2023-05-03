/**
 * This component is a state machine with multiple states :
 *  1. Choice of the search
 *      - using user profile ==> go to state 3
 *          - If not defined, we will have "create your profile first or whatever"
 *      - using already created profile (dropdown) ==> go to state 3
 *      - using a new profile ==> go to state 2
 *
 *  2. Profile creation
 *      - same as with user
 *
 *  3. Display results
 *      - As on the other pages
 *      - Button for clearing search
 */

import { Box, Button } from '@mui/material';
import { useCurrentUserQuery } from '../../../api/user/userApi';
import CircularCenteredLoading from '../../../components/loading/CircularCenteredLoading';
import NotConnectedRestriction from '../not_connected_restriction';
import { useState } from 'react';
import SearchInitialChoice from './SearchInitialChoice';
import { useStateTransition } from './stateTransition';

function SearchByProfile() {
    const { data: user, isLoading } = useCurrentUserQuery();

    const [currentState, [goToIntialChoice, goToProfileCreation, goToResults]] =
        useStateTransition();

    const [profileChosen, setProfileChosen] = useState<string | undefined>(
        undefined
    );

    // If loading or no user found, we cannot display the panel
    if (isLoading) {
        return <CircularCenteredLoading />;
    }

    if (!user) {
        return <NotConnectedRestriction />;
    }

    // Return the JSX element depending on the state
    switch (currentState) {
        case 'initialChoice':
            return (
                <SearchInitialChoice
                    goToProfileCreation={goToProfileCreation}
                    goToResults={goToResults}
                    setProfileChosen={setProfileChosen}
                />
            );
        case 'profileCreation':
            return <div>Profile creation</div>;
        case 'results':
            return <div>RESULTS</div>;
    }
}

export default SearchByProfile;
