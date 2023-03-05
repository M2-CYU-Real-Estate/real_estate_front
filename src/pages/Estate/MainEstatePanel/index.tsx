import BedIcon from '@mui/icons-material/Bed';
import InfoIcon from '@mui/icons-material/Info';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import ShowerIcon from '@mui/icons-material/Shower';
import { EstateProperties } from '..';
import { Box, Grid, Paper, Typography } from '@mui/material';
import TextWithIcon from '../../../components/TextWithIcon';
import { convertToArea, convertToCurrency } from '../../../utils/StringUtils';

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
                <Grid
                    container
                    display="flex"
                    justifyContent="center"
                    alignItems=""
                >
                    <Grid item xs={3}>
                        <TextWithIcon
                            icon={<OpenInFullIcon />}
                            text={convertToArea(estate.area)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextWithIcon
                            icon={<MeetingRoomIcon />}
                            text={estate.rooms?.toString()}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextWithIcon
                            icon={<BedIcon />}
                            text={estate.bedrooms?.toString()}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextWithIcon
                            icon={<ShowerIcon />}
                            text={estate.bathrooms?.toString()}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}

export default MainEstatePanel;
