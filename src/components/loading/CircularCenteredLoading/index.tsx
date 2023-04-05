import { Box, CircularProgress } from '@mui/material';

/**
 * A spinner loading designed to be centered in the parent
 */
export default function CircularCenteredLoading() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    );
}
