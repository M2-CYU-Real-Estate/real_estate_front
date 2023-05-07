import { Box, Button } from '@mui/material';
import { useContext } from 'react';
import EstateCard from '../../../components/EstateCard';
import HomeContext from '../HomeContext';
import mockEstates from '../../../api/mocks/mockEstates';

function LastEntries() {
    // TODO: api call for fetching estates
    const estates = mockEstates;

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
                {estates.map((estate) => (
                    <EstateCard key={estate.id} {...estate} />
                ))}
            </Box>
        </Box>
    );
}

export default LastEntries;
