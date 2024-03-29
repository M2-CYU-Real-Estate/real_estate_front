import { Box, Button, Typography } from '@mui/material';
import { useEstatesProfileQuery } from '../../../api/estate/estateApi';
import EstatePageContent from '../EstatePageContent';
import { useState } from 'react';

interface ProfileResultsProps {
    profileId?: number;
    goToIntialChoice: () => void;
}

function ProfileResults({ profileId, goToIntialChoice }: ProfileResultsProps) {
    // We must have a container before in order to check if the profile is set
    if (profileId === undefined) {
        return <NoProfileIdSet goToIntialChoice={goToIntialChoice} />;
    }
    return (
        <EstateResults profileId={profileId} goToIntialChoice={goToIntialChoice} />
    );
}

interface EstateResultsProps {
    profileId: number;
    goToIntialChoice: () => void;
}

function EstateResults({ profileId, goToIntialChoice }: EstateResultsProps) {
    // TODO fetch REAL profile API call (we will want a single query on user endpoint)
    const [page, setPage] = useState<number>(0);

    const {
        data: estatePage,
        isFetching,
        isError,
    } = useEstatesProfileQuery({
        page: page,
        pageSize: 10,
        profileId: profileId,
    });

    console.log('data: ', estatePage);

    return (
        <Box
            p={0}
            display="flex"
            flexDirection="column"
            height="100%"
            maxHeight="100%"
        >
            <Box
                display="flex"
                flexDirection="row"
                justifyItems="stretch"
                justifyContent="center"
            >
                <Box
                    paddingTop="1em"
                    width="100%"
                    display="flex"
                    justifyContent="space-evenly"
                    alignContent="center"
                >
                    {/* TODO remove this: this is debug */}
                    {/* TODO add number of results */}
                    <Box>Profil choisi : {profileId}</Box>
                    <Button variant="contained" onClick={goToIntialChoice}>
            Retour au choix du profil
                    </Button>
                </Box>
            </Box>
            {/* The scrollable items part */}
            <Box
                width="100%"
                height="100%"
                maxHeight="100%"
                p="0.5em"
                paddingTop="2em"
                sx={{ overflowY: 'scroll' }}
            >
                <EstatePageContent
                    estates={estatePage?.content}
                    isLoading={isFetching}
                    isError={isError}
                    paginated
                    count={estatePage?.pageCount}
                    currentPage={page}
                    setCurrentPage={setPage}
                />
            </Box>
        </Box>
    );
}

interface NoProfileIdSetProps {
    goToIntialChoice: () => void;
}

function NoProfileIdSet({ goToIntialChoice }: NoProfileIdSetProps) {
    return (
        <Box
            width="100%"
            height="80%"
            mx="4"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Box width="auto">
                <Typography variant="h5" textAlign="center">
                    {"Vous n'êtes pas connecté."}
                </Typography>
                <Typography variant="body1" textAlign="center">
                    {'Veuillez vous connecter ou créer un nouveau compte' +
            ' pour profiter de cette fonctionnalité'}
                </Typography>
            </Box>
            <Box
                width="100%"
                display="flex"
                flexDirection="row"
                justifyContent="center"
                mt="1em"
            >
                <Button variant="contained" onClick={goToIntialChoice}>
          Retour
                </Button>
            </Box>
        </Box>
    );
}

export default ProfileResults;
