import { Box, Typography } from '@mui/material';
import { useEstatesPageQuery } from '../../../api/estate/estateApi';
import EstatePageContent from '../../Home/EstatePageContent';
import { useListBienFavorisQuery } from '../../../api/favorites/favoritesApi';

function UserFavoritesTabPanel() {
    // TODO fetch REAL favorites API call (we will want a single query on user endpoint)
    const { data: estatePage, isFetching } = useEstatesPageQuery({});

    const {
        data: estateFavoris,
        isLoading,
        isError,
    } = useListBienFavorisQuery(0);

    // The goal is to change the number of favorites in real time
    // when the use click on a button for example
    // (if a favorite is set on an other page, this will not work obvioulsy)
    const nbFavorites = estateFavoris ? estateFavoris.totalCount : 0;

    // ELSE : use a query for this
    // (the mutation query should invalidate the "numberFavorites" query)

    return (
        <Box width="100%" height="100%" p="0.5em" sx={{ overflowY: 'scroll' }}>
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
            />
        </Box>
    );
}

export default UserFavoritesTabPanel;
