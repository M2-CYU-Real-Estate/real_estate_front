import { Box, Typography } from '@mui/material';
import { useEstatesPageQuery } from '../../../api/estate/estateApi';
import EstatePageContent from '../../Home/EstatePageContent';
import { useListBienFavorisQuery } from '../../../api/favorites/favoritesApi';
import { useState } from 'react';

function UserFavoritesTabPanel() {
    const [page, setPage] = useState<number>(0);

    const {
        data: estateFavoris,
        isLoading,
        isError,
    } = useListBienFavorisQuery({
        page: page,
        pageSize: 7,
    });

    // The goal is to change the number of favorites in real time
    // when the use click on a button for example
    // (if a favorite is set on an other page, this will not work obvioulsy)
    const nbFavorites = estateFavoris ? estateFavoris.totalCount : 0;

    // ELSE : use a query for this
    // (the mutation query should invalidate the "numberFavorites" query)

    return (
        <Box width="100%" p="0.5em">
            <Typography variant="h5" textAlign="center">
                <Typography display="inline" variant="inherit" fontWeight="600">
                    {`${nbFavorites} `}
                </Typography>
        Favoris enregistrés
            </Typography>
            <EstatePageContent
                estates={estateFavoris?.content}
                isLoading={isLoading}
                isError={isError}
                paginated
                count={estateFavoris?.pageCount}
                currentPage={page}
                setCurrentPage={setPage}
            />
        </Box>
    );
}

export default UserFavoritesTabPanel;
