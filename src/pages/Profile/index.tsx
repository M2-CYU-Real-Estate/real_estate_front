import { Box } from '@mui/material';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import Error404 from '../Error404';

import UpdateProfile from './UpdateProfileForm';
/**
 * The url parameters to fetch for the page
 */
type ProfileParams = {
    id: string;
};

function Profile() {
    // TODO: fetch the profile, should throw an error if the profile does not belong to the user

    const { id } = useParams<ProfileParams>();

    if (!id) {
        return <Error404 />;
    }

    return (
        <Box
            display="flex"
            alignItems="stretch"
            flexDirection="column"
            height="100vh"
        >
            <Header />
            {/* Display Form here */}
            <Box
                display="flex"
                alignItems="stretch"
                flexDirection="column"
                height="100vh"
                padding="2em"
            >
                <UpdateProfile />
            </Box>
        </Box>
    );
}

export default Profile;
