import { Box, Button, Typography } from '@mui/material';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import GLOBALS from '../../globals';

function notFoundPage() {
    return (
        <Box
            display="flex"
            alignItems="stretch"
            flexDirection="column"
            height="100vh"
        >
            <Header />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    height: '100%',
                    backgroundColor: 'primary.light',
                }}
            >
                <Typography variant="h1" color="white">
                    404
                </Typography>
                <Typography variant="h6" color="white">
                    {"La page que vous recherchez n'existe pas"}
                </Typography>
                <Button
                    href={GLOBALS.routes.home()}
                    variant="contained"
                    sx={{ mt: '1em' }}
                >
                    {"Retourner à l'accueil"}
                </Button>
            </Box>
        </Box>
    );
}

export default notFoundPage;
