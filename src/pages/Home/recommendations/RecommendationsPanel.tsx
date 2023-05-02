import { Box, Button, Typography } from '@mui/material';
import { useContext } from 'react';
import EstateCard from '../../../components/EstateCard';
import HomeContext from '../HomeContext';
import mockEstates from '../mockEstates';

function RecommendationsPanel() {
    const nbRecommendations = mockEstates.length;

    const { enableLoading, disableLoading } = useContext(HomeContext);

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
                <Typography variant="h5">
                    <Typography display="inline" variant="h5" fontWeight="600">
                        {`${nbRecommendations} `}
                    </Typography>
                    recommendations pour vous
                </Typography>
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
                {mockEstates.map((r) => (
                    <EstateCard key={r.id} {...r} />
                ))}
            </Box>
        </Box>
    );
}

export default RecommendationsPanel;
