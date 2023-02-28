import { Box, Card, CardActionArea, IconButton, Tooltip } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import InfoIcon from '@mui/icons-material/Info';
import BedIcon from '@mui/icons-material/Bed';
import ShowerIcon from '@mui/icons-material/Shower';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GLOBALS from '../../globals';

interface RecommendationProps {
    id: number;
    title: string;
    imageUrl: string;
    price: number;
    description: string;
    isNotificationEnabled: boolean;
    area?: number;
    rooms?: number;
    bedrooms?: number;
    bathrooms?: number;
}

/**
 * One card representing one recommendation for the
 */
function RecommendationCard({
    id,
    title,
    imageUrl,
    price,
    description,
    isNotificationEnabled,
    area,
    rooms,
    bedrooms,
    bathrooms,
}: RecommendationProps) {
    // TODO can we have a more generic card for using with last entries too ?

    const [isNotificationActive, setNotificationActive] = useState(false);

    const onNotificationClick = (e: React.MouseEvent) => {
        // Avoid that the "click on entire card" action is taken
        e.stopPropagation();
        e.preventDefault();
        // Toggle the notification
        setNotificationActive((prev) => !prev);
    };

    const longText =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et molestie turpis. Nulla lobortis leo a magna interdum, in luctus elit efficitur. Praesent dapibus ex eget lorem euismod, at malesuada enim aliquet. Duis commodo ante quis enim scelerisque, nec luctus augue ultrices. Nulla malesuada velit orci, sit amet euismod justo feugiat et. Suspendisse vehicula laoreet dui, vitae pellentesque orci tempor sed. Curabitur facilisis rhoncus nunc in accumsan.';

    return (
        <Card sx={{ width: '100%', height: '13em', mb: '2em', flexShrink: 0 }}>
            <CardActionArea
                component={Link}
                to={GLOBALS.routes.estate(id)}
                sx={{ width: '100%', height: '100%' }}
            >
                <Grid
                    container
                    flexDirection="row"
                    height="100%"
                    columnSpacing="0.5em"
                >
                    {/* Image */}
                    <Grid item md={5}>
                        <CardMedia
                            sx={{ height: '100%', borderRadius: '5px' }}
                            image="https://v.seloger.com/s/width/800/visuels/0/u/j/j/0ujjmzbxolmhn0v66tarvmbc9mzul426cp0ig8of4.jpg"
                        />
                    </Grid>
                    {/* Content */}
                    <Grid container item md={7}>
                        {/* First row */}
                        <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-between"
                            width="100%"
                            position="relative"
                        >
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                color="primary.dark"
                                maxWidth="70%"
                            >
                                Une très jolie maison !
                            </Typography>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    right: '0',
                                    top: '0',
                                }}
                            >
                                <Tooltip title="Parce que vous êtes gentil">
                                    <IconButton
                                        size="large"
                                        style={{
                                            backgroundColor: 'transparent',
                                        }}
                                    >
                                        <InfoIcon />
                                    </IconButton>
                                </Tooltip>
                                <IconButton
                                    size="large"
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onClick={onNotificationClick}
                                >
                                    {isNotificationActive ? (
                                        <NotificationsIcon />
                                    ) : (
                                        <NotificationsNoneIcon />
                                    )}
                                </IconButton>
                            </Box>
                        </Box>
                        {/* Price */}
                        <Box width="100%">
                            <Typography variant="body1">105.500€</Typography>
                        </Box>
                        {/* Caracteristics (size etc.) */}
                        <Grid
                            container
                            display="flex"
                            justifyContent="center"
                            alignItems=""
                        >
                            <Grid item xs={3}>
                                <TextWithIcon
                                    icon={<OpenInFullIcon />}
                                    text="132 m²"
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextWithIcon
                                    icon={<MeetingRoomIcon />}
                                    text="3"
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextWithIcon icon={<BedIcon />} text="2" />
                            </Grid>
                            <Grid item xs={3}>
                                <TextWithIcon icon={<ShowerIcon />} text="1" />
                            </Grid>
                        </Grid>
                        {/* The text that will overflow if too long */}
                        <Box width="100%">
                            <Typography
                                variant="body2"
                                // Only 2 lines before cropping
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: '2',
                                    WebkitBoxOrient: 'vertical',
                                }}
                            >
                                {longText}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardActionArea>
        </Card>
    );
}

interface TextIconProps {
    icon: JSX.Element;
    text?: string;
}

function TextWithIcon({ icon, text }: TextIconProps) {
    const textToDisplay = text || 'X';
    return (
        <Typography
            variant="subtitle1"
            sx={{ verticalAlign: 'middle', display: 'inline-flex' }}
        >
            {icon} {textToDisplay}
        </Typography>
    );
}

export default RecommendationCard;
