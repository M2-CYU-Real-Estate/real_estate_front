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

function SearchByProfile() {
    const { data: user, isLoading } = useCurrentUserQuery();

    if (isLoading) {
        return <CircularCenteredLoading />;
    }

    if (!user) {
        return <NotConnectedRestriction />;
    }

    return (
        <Box
            width="100%"
            height="100%"
            maxHeight="100%"
            display="flex"
            flexDirection="column"
            alignItems="space-around"
        >
            <Button>Choice 1</Button>
            <Button>Choice 2</Button>
            <Button>Choice 3</Button>
        </Box>
    );
}

export default SearchByProfile;
