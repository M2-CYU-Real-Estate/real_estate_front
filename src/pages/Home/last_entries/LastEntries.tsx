import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { useEstatesPageQuery } from '../../../api/estate/estateApi';
import EstatePageContent from '../EstatePageContent';

function LastEntries() {
    const [page, setPage] = useState<number>(0);
    const {
        data: estatePage,
        isFetching,
        isError,
    } = useEstatesPageQuery({ page: page });

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
            <EstatePageContent
                estates={estatePage?.content}
                isLoading={isFetching}
                isError={isError}
                paginated
                count={estatePage?.pageCount}
                currentPage={page}
                setCurrentPage={setPage}
            />
        </Box>
    );
}

export default LastEntries;
