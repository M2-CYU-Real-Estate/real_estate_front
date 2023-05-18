import { Box, Grid, keyframes } from '@mui/material';
import { useCurrentUserQuery } from '../../api/user/userApi';
import Header from '../../components/Header';
import NotConnectedRestriction from '../../components/NotConnectedRestriction';
import CircularCenteredLoading from '../../components/loading/CircularCenteredLoading';
import UserDetailsPanel from './UserDetailsPanel';
import UserTabsPanel from './UserTabsPanel';

const link = 'https://source.unsplash.com/random/?house';

const backgroundFadeInAnimation = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-10vh);
    }
    100% { 
        opacity: 1;
        transform: translateY(0);
    }
`;

const papersFadeInAnimation = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-3vh);
    }
    50% {
        opacity: 0;
        transform: translateY(-3vh);
    }
    100% { 
        opacity: 1;
        transform: translateY(0);
    }
`;

function UserProfilePage() {
    const { data: user, isLoading } = useCurrentUserQuery();

    if (isLoading) {
        return <CircularCenteredLoading />;
    }

    if (user === undefined) {
        return <NotConnectedRestriction />;
    }

    return (
        <Box
            display="flex"
            alignItems="stretch"
            flexDirection="column"
            height="100vh"
        >
            <Header />
            <Grid
                container
                component="main"
                height="calc(100% - 69px)"
                display="flex"
            >
                <Box
                    position="absolute"
                    width="100%"
                    height="60%"
                    maxHeight="600px"
                    sx={{
                        backgroundImage: `linear-gradient(to top, white 15%, transparent), url(${link})`,
                        backgroundColor: 'primary.dark',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: -1,
                        animation: `${backgroundFadeInAnimation} ease-in-out 2s`,
                    }}
                ></Box>
                <Grid
                    item
                    xs={12}
                    md={4}
                    xl={3}
                    sx={{
                        animation: `${papersFadeInAnimation} ease-in-out 2s`,
                    }}
                >
                    <UserDetailsPanel user={user} />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={8}
                    xl={9}
                    sx={{
                        animation: `${papersFadeInAnimation} ease-in-out 2.5s`,
                    }}
                >
                    <UserTabsPanel />
                </Grid>
            </Grid>
        </Box>
    );
}

export default UserProfilePage;
