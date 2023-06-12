import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    Slider,
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import React, { useEffect } from 'react';
import { useAdviceQuery } from '../../../api/estate/estateApi';
import { useParams } from 'react-router-dom';
import { Estate } from '../../../types/estate';
import CircularCenteredLoading from '../../../components/loading/CircularCenteredLoading';

type Annonce = {
    id: string;
};

function AdvicePanel(props: { estate: Estate }) {
    const estate = props.estate;
    const { id } = useParams<Annonce>();
    const { data: advice, isFetching, isError } = useAdviceQuery(id);
    if (isFetching) {
        return <CircularCenteredLoading />;
    }
    const dataLine = {
        labels: advice?.pricePerMonth ? Object.keys(advice.pricePerMonth) : [],
        datasets: [
            {
                label: 'Prix',
                data: advice?.pricePerMonth ? Object.values(advice.pricePerMonth) : [],
                fill: false,
            },
        ],
    };

    return (
        <Grid container spacing={2}>
            {advice?.pricePerMonth && (
                <Grid item lg={12} md={12} sm={12} xs={12} xl={12}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                Conseil achat sur le prix
                            </Typography>
                            <Box
                                display="flex"
                                className="donut"
                                padding="1em"
                                justifyContent="center"
                                alignContent="center"
                                width="100%"
                            >
                                <Grid container spacing={2}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6} md={6} sx={{ margin: '0 0 20px 0' }}>
                                            <Card
                                                sx={{
                                                    minWidth: 5,
                                                    bgcolor: '#154e6d  ',
                                                    color: 'white',
                                                }}
                                            >
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 15 }} gutterBottom>
                            Le Prix du bien
                                                    </Typography>

                                                    <Typography
                                                        variant="h5"
                                                        component="div"
                                                        fontWeight="bold"
                                                    >
                                                        {estate.price} €
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={6} md={6} sx={{ margin: '0 0 20px 0' }}>
                                            <Card
                                                sx={{
                                                    minWidth: 5,
                                                    bgcolor: '#5b707a ',
                                                    color: 'white',
                                                }}
                                            >
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 15 }} gutterBottom>
                            Le Prix conseilé
                                                    </Typography>

                                                    <Typography
                                                        variant="h5"
                                                        component="div"
                                                        fontWeight="bold"
                                                    >
                                                        {advice?.estimatedPrice} €
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={0}>
                                        <Grid item xs={12} md={4}>
                                            <Card
                                                sx={{
                                                    minWidth: 5,
                                                    bgcolor: '#449260 ',
                                                    color: 'white',
                                                }}
                                            >
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 15 }} gutterBottom>
                            Prix Min Ville
                                                    </Typography>
                                                    <Typography
                                                        variant="h5"
                                                        component="div"
                                                        fontWeight="bold"
                                                    >
                                                        {advice?.minPrice} €
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Card
                                                sx={{
                                                    minWidth: 5,
                                                    bgcolor: ' #cecb10 ',
                                                    color: 'white',
                                                }}
                                            >
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 15 }} gutterBottom>
                            Prix Moyen Ville
                                                    </Typography>
                                                    <Typography
                                                        variant="h5"
                                                        component="div"
                                                        fontWeight="bold"
                                                    >
                                                        {advice?.meanPrice} €
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>

                                        <Grid item xs={12} md={4} sx={{ margin: '0 0 40px 0' }}>
                                            <Card
                                                sx={{
                                                    minWidth: 5,
                                                    bgcolor: ' #e0573c ',
                                                    color: 'white',
                                                }}
                                            >
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 15 }} gutterBottom>
                            Prix Max Ville
                                                    </Typography>
                                                    <Typography
                                                        variant="h5"
                                                        component="div"
                                                        fontWeight="bold"
                                                    >
                                                        {advice?.maxPrice} €
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Slider
                                            defaultValue={estate.price}
                                            aria-label="Small"
                                            valueLabelDisplay="on"
                                            disabled
                                            min={200000}
                                            max={400000}
                                            step={1000}
                                            sx={{
                                                '& .MuiSlider-rail': {
                                                    backgroundImage:
                            'linear-gradient(.25turn, #0f0,#f00)',
                                                },
                                                '& .MuiSlider-track': {
                                                    backgroundImage:
                            'linear-gradient(.25turn, #0f0,#f00)',
                                                },
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            )}
      ;
            {advice?.pricePerMonth ? (
                <Grid item lg={12} md={12} sm={12} xs={12} xl={12}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                Quand acheter ce bien?
                            </Typography>
                            <Box
                                display="flex"
                                className="donut"
                                justifyContent="center"
                                alignContent="center"
                                width="100%"
                                maxHeight="20em"
                            >
                                <Line data={dataLine} options={optionsLine} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ) : (
                <Grid item lg={12} md={12} sm={12} xs={12} xl={12}>
                    <Typography variant="h5" component="div">
            Ce bien n\a pas de bien similaires pour la proposition de conseils
            sur le prix.
                    </Typography>
                </Grid>
            )}
      ;
        </Grid>
    );
}

const optionsLine = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
};

export default AdvicePanel;
