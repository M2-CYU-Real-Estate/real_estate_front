import { Box, Button } from '@mui/material';

interface InitialChoiceProps {
    goToProfileCreation: () => void;
    goToResults: () => void;
    setProfileChosen: (profile: string) => void;
}

function SearchInitialChoice({
    goToProfileCreation,
    goToResults,
    setProfileChosen,
}: InitialChoiceProps) {
    // TODO ==> stopped here

    return (
        <Box
            width="100%"
            height="100%"
            mx="4"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Button variant="contained" sx={{ my: '2em' }}>
                Utiliser le profil utilisateur
            </Button>
            <Button variant="contained" sx={{ my: '2em' }}>
                Utiliser un profil créé
            </Button>
            <Button variant="contained" sx={{ my: '2em' }}>
                Créer un nouveau profil
            </Button>
        </Box>
    );
}

export default SearchInitialChoice;
