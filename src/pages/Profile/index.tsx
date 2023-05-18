import { Box } from '@mui/material';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import Error404 from '../Error404';

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
            Profil {id}
            <p>Ici, on pourra voir la tronche du profil et le modifier</p>
            <p>(Le passer en principal, why not)</p>
        </Box>
    );
}

export default Profile;
