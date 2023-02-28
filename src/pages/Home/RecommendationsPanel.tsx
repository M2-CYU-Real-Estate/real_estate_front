import { Box, Button, Grid, List, Typography } from '@mui/material';
import RecommendationCard from './RecommendationCard';

function RecommendationsPanel() {
    const nbRecommendations = 20;

    return (
        <Box
            p={0}
            display="flex"
            flexDirection="column"
            height="100%"
            maxHeight="100%"
        >
            {/* Box with recommendation count & menus (filters, sort) */}
            <Box
                display="flex"
                flexDirection="row"
                justifyItems="stretch"
                justifyContent="center"
            >
                <Typography>
                    {nbRecommendations} recommendations pour vous
                </Typography>
                <Box
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    alignContent="center"
                >
                    <Button>Filtre 1</Button>
                    <Button>Filtre 2</Button>
                    <Button>Filtre 3</Button>
                    <Button>Filtre 4</Button>
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
                {[1, 2, 3, 4, 5].map((n) => (
                    <RecommendationCard key={n} />
                ))}
            </Box>
        </Box>
    );
}

export default RecommendationsPanel;
