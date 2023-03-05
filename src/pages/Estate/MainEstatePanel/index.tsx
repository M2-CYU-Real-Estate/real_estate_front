import { EstateProperties } from '..';
import { Box, Paper, Typography } from '@mui/material';

function MainEstatePanel(props: { estate: EstateProperties }) {
    const estate = props.estate;

    return (
        //  A box for centering the panel and setting a little margin
        <Box display="flex" justifyContent="center" padding="0.5em">
            {/* The width does not exceed a certain width, but it must tries 
                to take all the space available */}
            <Paper
                sx={{ marginTop: '1em', maxWidth: '800px', width: '100%' }}
                elevation={3}
            >
                {/* The image will always have the same ratio*/}
                <Box
                    component="img"
                    sx={{
                        borderRadius: '3px',
                        width: '100%',
                        aspectRatio: '16/9',
                        // If the resulting size is too big, the image will overflow a little
                        objectFit: 'cover',
                    }}
                    alt="Image de l'offre"
                    src={estate.imageUrl}
                />
                <Typography variant="h5" color="primary.dark">
                    {estate.title}
                </Typography>
            </Paper>
        </Box>
    );
}

export default MainEstatePanel;
