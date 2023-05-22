import { EstateProperties } from '..';
import { Box, Link, Paper, Typography } from '@mui/material';
import CaracteristicsBar from './CaracteristicsBar';
import { convertToCurrency } from '../../../utils/StringUtils';
import { useState } from 'react';
import FavoriteButton from '../../../components/FavoriteButton';

function MainEstatePanel(props: { estate: EstateProperties }) {
    const estate = props.estate;
    const [isFavoriteEnabled, setFavoriteEnabled] = useState(estate.isFavorite);

    const onNotificationClick = (e: React.MouseEvent) => {
        // Avoid that the "click on entire card" action is taken
        e.stopPropagation();
        e.preventDefault();
        // Toggle the notification
        setFavoriteEnabled((prev) => !prev);
        // TODO: perform the API call
    };

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
                <Box
                    padding="1em"
                    display="flex"
                    rowGap="1em"
                    justifyContent="space-between"
                    flexDirection="column"
                >
                    <Box>
                        <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-between"
                        >
                            <Typography variant="h5" color="primary.dark">
                                {estate.title}
                            </Typography>
                            <Link
                                component="a"
                                href={estate.propertyUrl}
                                target="blank"
                            >
                                {"Voir le site de l'annonce"}
                            </Link>
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-between"
                        >
                            <Typography variant="body1" fontWeight="bold">
                                {convertToCurrency(estate.price)}
                            </Typography>
                            <FavoriteButton
                                isFavorite={isFavoriteEnabled}
                                onToggle={onNotificationClick}
                            />
                        </Box>
                    </Box>
                    <CaracteristicsBar {...estate} />
                    {/* Description */}
                    <Box width="100%">
                        <Typography variant="body2">
                            {estate.description}
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default MainEstatePanel;
