import { Avatar, Box, Grid, Typography } from "@mui/material";
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';


function EstimatedPrice() {

    return (
      
        <Box
            sx={{
                width: 350,
                height: 300,
                backgroundColor: 'primary.dark',
                '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: 1,
                },
            }}
        >
            <Grid container alignItems="center" justifyContent="center" sx={{ margin: '20px 0' }}>
                <Grid item>
                    <Avatar
                        sx={{
                            backgroundColor: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <EuroSymbolIcon fontSize="large" />
                    </Avatar>
                </Grid>
                <Grid item>
                    <Typography component="h1" variant="h6" sx={{ color: 'white' }}>
                                Estimation du Prix
                    </Typography>
                </Grid>
            </Grid>
            <Grid container alignItems="center" justifyContent="center"  sx={{ margin: '20px' }}>
                <Grid item>
                    <Typography component="h1" variant="h6" sx={{ color: 'white' }}>
                     Le prix total est de:
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography component="h1" variant="h6" sx={{ color: 'white' }}>
                     300 000 €
                    </Typography>
                </Grid>
            </Grid>

            <Grid container alignItems="center" justifyContent="center">
                <Grid item>
                    <Typography component="h1" variant="h6" sx={{ color: 'white' }}>
                     Le prix par m2 est:
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography component="h1" variant="h6" sx={{ color: 'white' }}>
                     300 €
                    </Typography>
                </Grid>
            </Grid>
        
        </Box>

    );

}
export default EstimatedPrice;
