// An estate card containing all what is important on an estate

import BedIcon from '@mui/icons-material/Bed';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import ShowerIcon from '@mui/icons-material/Shower';
import { Box, Card, CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GLOBALS from '../../globals';
import { toFrenchDate } from '../../utils/DateUtils';
import { convertToArea, convertToCurrency } from '../../utils/StringUtils';
import FavoriteButton from '../FavoriteButton';
import TextWithIcon from '../TextWithIcon';

interface EstateCardProps {
    id: number;
    title: string;
    imageUrl: string;
    price: number;
    description: string;
    isFavorite: boolean;
    area?: number;
    rooms?: number;
    bedrooms?: number;
    bathrooms?: number;
    date: Date;
}

function EstateCard({
    id,
    title,
    imageUrl,
    price,
    description,
    isFavorite,
    area,
    rooms,
    bedrooms,
    bathrooms,
    date,
}: EstateCardProps) {
    // TODO: context for favorite functions ?

    const [isFavoriteEnabled, setFavoriteEnabled] = useState(isFavorite);

    const onNotificationClick = (e: React.MouseEvent) => {
        // Avoid that the "click on entire card" action is taken
        e.stopPropagation();
        e.preventDefault();
        // Toggle the notification
        setFavoriteEnabled((prev) => !prev);
        // TODO: perform the API call
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
                            {/* Favorite icon */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    right: '0',
                                    top: '0',
                                }}
                            >
                                <FavoriteButton
                                    isFavorite={isFavoriteEnabled}
                                    onToggle={onNotificationClick}
                                />
                            </Box>
                        </Box>
                        {/* Price & Date*/}
                        <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-between"
                            width="100%"
                            mr="1em"
                        >
                            <Typography variant="body1">
                                {convertToCurrency(price)}
                            </Typography>
                            <Typography variant="body2" fontStyle="italic">
                                {toFrenchDate(date)}
                            </Typography>
                        </Box>
                        {/* Caracteristics (size etc.) */}
                        <Grid container display="flex" justifyContent="center">
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

export default EstateCard;
