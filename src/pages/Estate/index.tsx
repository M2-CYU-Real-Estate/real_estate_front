import { Box, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEstateByIdQuery } from '../../api/estate/estateApi';
import Header from '../../components/Header';
import LoadingBar from '../../components/loading/LoadingBar';
import { Estate } from '../../types/estate';
import Error404 from '../Error404';
import MainEstatePanel from './MainEstatePanel';
import SideEstatePanel from './SideEstatePanel';

/**
 * The url parameters to fetch for the page
 */
type EstateParams = {
    id: string;
};

/**
 * The page on which to see a specific estate's properties
 */
function EstatePage() {
    const { id } = useParams<EstateParams>();
    const { data: estate, isLoading, isError } = useEstateByIdQuery(id);

    console.log(estate);

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
                    <Box height="100%">{estate && <EstatePanel estate={estate} />}</Box>
                </Box>
            )}
        </>
    );
}

function EstatePanel(props: { estate: Estate }) {
    return (
        <Grid container rowSpacing="2em">
            {/* The main panel with informations of the estate */}
            <Grid item xl={7} xs={12}>
                <MainEstatePanel {...props} />
            </Grid>
            {/* The side panel with statistics etc.*/}
            <Grid item xl={5} xs={12}>
                <SideEstatePanel {...props} />
            </Grid>
        </Grid>
    );
}

export default EstatePage;
