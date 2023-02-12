import { LinearProgress, Fade, Box } from '@mui/material';

interface LoadingBarProps {
    isLoading: boolean;
    height?: number;
}

/**
 * An horizontal bar showing on top of the viewport (under the header)
 * indicating that some info is loading
 */
function LoadingBar({ isLoading, height = 5 }: LoadingBarProps) {
    return (
        <Box sx={{ height: height }}>
            <Fade
                in={isLoading}
                unmountOnExit
                // A a little delay in order to not break user flow immediately
                // (if response is fast, no loading is required)
                style={{ transitionDelay: isLoading ? '200ms' : '0ms' }}
            >
                <LinearProgress sx={{ height: height }} />
            </Fade>
        </Box>
    );
}

export default LoadingBar;
