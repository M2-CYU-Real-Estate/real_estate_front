import { Alert, Box, Pagination } from '@mui/material';
import CircularCenteredLoading from '../../components/loading/CircularCenteredLoading';
import { Estate } from '../../types/estate';
import EstateCard from '../../components/EstateCard';
import { useRef } from 'react';
import theme from '../../assets/theme';

interface EstatePageContent {
    estates?: Estate[];
    isLoading: boolean;
    isError: boolean;
    paginated?: boolean;
    count?: number;
    currentPage?: number;
    setCurrentPage?: (n: number) => void;
}

function EstatePageContent({
    estates,
    isLoading,
    isError,
    paginated = false,
    count = 0,
    currentPage = 0,
    setCurrentPage = () => {
        return;
    },
}: EstatePageContent) {
    const scrollRef = useRef<HTMLDivElement>(null);

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

    const changePage = (e: React.ChangeEvent<unknown>, n: number) => {
        setCurrentPage(n - 1);
        // Scroll to top of the div
        if (scrollRef && scrollRef.current) {
            scrollRef.current.scroll({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    console.log('state data: ');
    console.log(estates);
    return (
        <Box
            width="100%"
            height="100%"
            maxHeight="100%"
            p="0.5em"
            paddingTop="2em"
            sx={{ overflowY: 'scroll' }}
            ref={scrollRef}
        >
            {estates.map((estate) => (
                <EstateCard key={estate.id} {...estate} />
            ))}
            {paginated && (
                <Pagination
                    count={count}
                    defaultPage={currentPage + 1}
                    onChange={changePage}
                    siblingCount={1}
                    boundaryCount={2}
                    size="large"
                    sx={{
                        textAlign: 'center',
                        '& > *': {
                            justifyContent: 'center',
                            display: 'flex',
                        },
                    }}
                />
            )}
        </Box>
    );
}

export default EstatePageContent;
