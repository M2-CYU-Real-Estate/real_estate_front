import { Box, Typography } from '@mui/material';
import { useEstatesRecommandationQuery } from '../../../api/estate/estateApi';
import { useCurrentUserQuery } from '../../../api/user/userApi';
import NotConnectedRestriction from '../../../components/NotConnectedRestriction';
import CircularCenteredLoading from '../../../components/loading/CircularCenteredLoading';
import EstatePageContent from '../EstatePageContent';
import { useState } from 'react';

function RecommendationsPanel() {
    const { data: user, isLoading: isUserLoading } = useCurrentUserQuery();
    // TODO fetch REAL suggestions API call (we will want a single query on user endpoint)
    // TODO: we don't want pages, only a single list result (much simpler for server)
    const {
        data: estatePage,
        isFetching,
        isError,
    } = useEstatesRecommandationQuery();

    if (isUserLoading || isFetching) {
        return <CircularCenteredLoading />;
    }

    if (!user) {
        return <NotConnectedRestriction />;
    }

    const nbRecommendations = estatePage ? estatePage.length : 0;

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
                    <Typography display="inline" variant="inherit" fontWeight="600">
                        {`${nbRecommendations} `}
                    </Typography>
          recommendations pour vous
                </Typography>
            </Box>
            {/* The scrollable items part */}
            <EstatePageContent
                estates={estatePage}
                isLoading={isFetching}
                isError={isError}
            />
            {/* TODO SET PAGE COUNTER */}
        </Box>
    );
}

export default RecommendationsPanel;
