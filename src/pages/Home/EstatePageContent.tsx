import { Alert } from '@mui/material';
import CircularCenteredLoading from '../../components/loading/CircularCenteredLoading';
import { Estate } from '../../types/estate';
import EstateCard from '../../components/EstateCard';

interface EstatePageContent {
    estates?: Estate[];
    isLoading: boolean;
    isError: boolean;
}

function EstatePageContent({ estates, isLoading, isError }: EstatePageContent) {
    if (isLoading) {
        return <CircularCenteredLoading />;
    }

    if (isError || estates === undefined) {
        return (
            <Alert severity="error">
        Une erreur est survenue lors de la récupération des biens. veuillez
        retenter plus tard.
            </Alert>
        );
    }

    if (estates.length === 0) {
        return <Alert severity="warning">Aucun bien trouvé</Alert>;
    }

    return (
        <>
            {estates.map((estate) => (
                <EstateCard key={estate.id} {...estate} />
            ))}
        </>
    );
}

export default EstatePageContent;
