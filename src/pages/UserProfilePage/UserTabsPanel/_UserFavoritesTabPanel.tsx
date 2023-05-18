import { Box, Typography } from '@mui/material';
import EstateCard from '../../../components/EstateCard';
import mockEstates from '../../../api/mocks/mockEstates';
import { useState } from 'react';

function UserFavoritesTabPanel() {
    // TODO: real API call
    const estates = mockEstates;

    // The goal is to change the number of favorites in real time
    // when the use click on a button for example
    // (if a favorite is set on an other page, this will not work obvioulsy)
    const [nbFavorites, setNbFavorites] = useState(estates.length);

    // ELSE : use a query for this
    // (the mutation query should invalidate the "numberFavorites" query)

    return (
        <Box
            width="100%"
            height="100%"
            maxHeight="100%"
            p="0.5em"
            sx={{ overflowY: 'scroll' }}
        >
            <Typography variant="h5" textAlign="center">
                <Typography display="inline" variant="h5" fontWeight="600">
                    {`${nbFavorites} `}
                </Typography>
                Favoris enregistrés
            </Typography>
            {estates.map((estate) => (
                // Maybe need a callback on the toggleFavorite button ?
                <EstateCard key={estate.id} {...estate} />
            ))}
        </Box>
    );
}

export default UserFavoritesTabPanel;
