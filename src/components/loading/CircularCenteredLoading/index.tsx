import { Box, CircularProgress } from '@mui/material';

interface CircularCenteredLoadingProps {
    width?: string;
    height?: string;
}

/**
 * A spinner loading designed to be centered in the parent
 */
export default function CircularCenteredLoading({
    width = '100%',
    height = '100%',
}: CircularCenteredLoadingProps) {
    return (
        <Box sx={{ display: 'flex', width: width, height: height }}>
            <CircularProgress />
        </Box>
    );
}
