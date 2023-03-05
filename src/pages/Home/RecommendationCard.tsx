import BedIcon from '@mui/icons-material/Bed';
import InfoIcon from '@mui/icons-material/Info';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import ShowerIcon from '@mui/icons-material/Shower';
import { Box, Card, CardActionArea, IconButton, Tooltip } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GLOBALS from '../../globals';
import { convertToArea, convertToCurrency } from '../../utils/StringUtils';

interface RecommendationProps {
    id: number;
    title: string;
    imageUrl: string;
    price: number;
    description: string;
    isNotificationEnabled: boolean;
    suggestionHint?: string;
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
    suggestionHint,
    area,
    rooms,
    bedrooms,
    bathrooms,
}: RecommendationProps) {
    // TODO can we have a more generic card for using with last entries too ?

    const [isNotificationActive, setNotificationActive] = useState(
        isNotificationEnabled
    );

    const onNotificationClick = (e: React.MouseEvent) => {
        // Avoid that the "click on entire card" action is taken
        e.stopPropagation();
        e.preventDefault();
        // Toggle the notification
        setNotificationActive((prev) => !prev);
    };

    return (
        <Card sx={{ width: '100%', height: '13em', mb: '2em', flexShrink: 0 }}>
            <CardActionArea
                component={Link}
                to={GLOBALS.routes.estate(id.toString())}
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
                            image={imageUrl}
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
                                {title}
                            </Typography>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    right: '0',
                                    top: '0',
                                }}
                            >
                                <Tooltip
                                    title={
                                        suggestionHint ||
                                        'Pas de raison particulière...'
                                    }
                                >
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
                            <Typography variant="body1">
                                {convertToCurrency(price)}
                            </Typography>
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
                                    text={convertToArea(area)}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextWithIcon
                                    icon={<MeetingRoomIcon />}
                                    text={rooms?.toString()}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextWithIcon
                                    icon={<BedIcon />}
                                    text={bedrooms?.toString()}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextWithIcon
                                    icon={<ShowerIcon />}
                                    text={bathrooms?.toString()}
                                />
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
                                {description}
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
    const textToDisplay = text || '...';
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
