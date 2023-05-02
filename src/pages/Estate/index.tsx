import { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import Error404 from '../../pages/404';
import Header from '../../components/Header';
import LoadingBar from '../../components/loading/LoadingBar';
import mockEstates from '../Home/mockEstates';
import MainEstatePanel from './MainEstatePanel';
import SideEstatePanel from './SideEstatePanel';
import { EstateProperties } from '../../types/estate';

/**
 * The url parameters to fetch for the page
 */
type EstateParams = {
    id: string;
};

/**
 * The page on which to see a specific estate's properties
 */
function Estate() {
    const { id } = useParams<EstateParams>();
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [estate, setEstate] = useState<EstateProperties>();

    // TODO fetch estate data for real :)
    useEffect(() => {
        setLoading(true);
        setTimeout(
            () =>
                fetchEstate(id)
                    .then((e) => setEstate(e))
                    .catch((err) => {
                        console.error(err);
                        setError(true);
                    })
                    .finally(() => setLoading(false)),
            1000
        );
    }, []);

    const [isFavoriteEnabled, setFavoriteEnabled] = useState(
        estate?.isFavorite || false
    );

    return (
        <>
            {/* If we cannot find the estate, show the 404 error page */}
            {isError ? (
                <Error404 />
            ) : (
                <Box display="flex" alignItems="stretch" flexDirection="column">
                    <Header />
                    <LoadingBar isLoading={isLoading} />
                    {/* Only display if loading ended */}
                    <Box height="100%">
                        {estate && <EstatePanel estate={estate} />}
                    </Box>
                </Box>
            )}
        </>
    );
}

function EstatePanel(props: { estate: EstateProperties }) {
    return (
        <Grid container rowSpacing="2em">
            {/* The main panel with informations of the estate */}
            <Grid item xl={7} xs={12}>
                <MainEstatePanel {...props} />
            </Grid>
            {/* The side panel with statistics etc.*/}
            {/* TODO create another component for this (or separate both in two sub-components) */}
            <Grid item xl={5} xs={12}>
                <SideEstatePanel {...props} />
            </Grid>
        </Grid>
    );
}

// TEMP: To remove when fetching will be better

// TODO delete this, this is not real
function fetchEstate(id?: string): Promise<EstateProperties> {
    if (!id) {
        return Promise.reject('No id found');
    }
    // We just fetch the property with the right id, handling simple promise
    const idNumber = Number.parseInt(id);
    const property = mockEstates.find((r) => r.id == idNumber);
    if (property) {
        return Promise.resolve(property);
    }
    return Promise.reject('No estate with this id found');
}

export type { EstateProperties };

export default Estate;
