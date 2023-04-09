import { Box, CircularProgress } from '@mui/material';

/**
 * A spinner loading designed to be centered in the parent
 */
export default function CircularCenteredLoading() {
    return (
        <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
            <CircularProgress />
        </Box>
    );
}
