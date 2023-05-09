import { Box, Button, Typography } from '@mui/material';
import GLOBALS from '../../globals';

/**
 * This panel is displayed if the user is not connected.
 *
 * This ask him to connect or create an account.
 */
function NotConnectedRestriction() {
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
                        ' pour profiter de cette fonctionnalité (et des autres !)'}
                </Typography>
            </Box>
            <Box
                width="100%"
                display="flex"
                flexDirection="row"
                justifyContent="space-evenly"
                mt="1em"
            >
                <div></div>
                <Button variant="contained" href={GLOBALS.routes.login()}>
                    Se connecter
                </Button>
                <Button variant="contained" href={GLOBALS.routes.register()}>
                    Créer un compte
                </Button>
                <div></div>
            </Box>
        </Box>
    );
}

export default NotConnectedRestriction;
