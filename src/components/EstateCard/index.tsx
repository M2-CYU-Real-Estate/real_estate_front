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
import { Estate } from '../../types/estate';

function EstateCard({
    id,
    isFavorite,
    title,
    description,
    url,
    imageUrl,
    type,
    cityName,
    postalCode,
    price,
    houseAreaSqrtM,
    groundAreaSqrtM,
    roomCount,
    bedroomCount,
    bathroomCount,
    isTerracePresent,
    isBalconyPresent,
    isElevatorPresent,
    isGaragePresent,
    isParkingPresent,
    isFittedKitchenPresent,
    energyClass,
    gazEmissionClass,
    createdAt,
    lastUpdatedAt,
}: Estate) {
    // TODO: context for favorite functions ?
    console.log(typeof createdAt);
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
                <Grid container flexDirection="row" height="100%" columnSpacing="0.5em">
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
                        <Box>
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                color="primary.dark"
                                width="70%"
                                maxWidth="70%"
                                // Only 2 lines before cropping
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: '2',
                                    WebkitBoxOrient: 'vertical',
                                }}
                            >
                                {renameTitle(title)}
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
                                {toFrenchDate(createdAt)}
                            </Typography>
                        </Box>
                        {/* Caracteristics (size etc.) */}
                        <Grid container display="flex" justifyContent="center">
                            <Grid item xs={3}>
                                <TextWithIcon
                                    icon={<OpenInFullIcon />}
                                    text={convertToArea(houseAreaSqrtM)}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextWithIcon
                                    icon={<MeetingRoomIcon />}
                                    text={roomCount?.toString()}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextWithIcon
                                    icon={<BedIcon />}
                                    text={bedroomCount?.toString()}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextWithIcon
                                    icon={<ShowerIcon />}
                                    text={bathroomCount?.toString()}
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

/**
 * Do various modifications on title in order to be more presentable
 */
function renameTitle(title: string): string {
    return title
        .replace('Annonce vente ', '')
        .replace(/ - ParuVendu.fr ref .*/g, '')
        .replace('maison', 'Maison')
        .replace('appartement', 'Appartement');
}

export default EstateCard;
