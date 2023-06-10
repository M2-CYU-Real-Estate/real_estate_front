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
import { useAdviceQuery } from '../../../api/metriques/metriques';
import { useParams } from 'react-router-dom';

type Annonce = {
    id: string;
};

function AdvicePanel() {
    const { data: estatePage, isFetching, isError } = useAdviceQuery({});

    const { id } = useParams<Annonce>();
    const testId = '231520';
    console.log('testid: ', testId);

    return (
        <Grid container spacing={2}>
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
                          280 000 €
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
                          275 000 €
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={0}>
                                    <Grid item xs={12} md={4}>
                                        <Card
                                            sx={{ minWidth: 5, bgcolor: '#449260 ', color: 'white' }}
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
                          260 000 €
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Card
                                            sx={{ minWidth: 5, bgcolor: ' #cecb10 ', color: 'white' }}
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
                          290 000 €
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                    <Grid item xs={12} md={4} sx={{ margin: '0 0 40px 0' }}>
                                        <Card
                                            sx={{ minWidth: 5, bgcolor: ' #e0573c ', color: 'white' }}
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
                          320 000 €
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Slider
                                        defaultValue={285000}
                                        aria-label="Small"
                                        valueLabelDisplay="on"
                                        disabled
                                        min={200000}
                                        max={400000}
                                        step={1000}
                                        sx={{
                                            '& .MuiSlider-rail': {
                                                backgroundImage: 'linear-gradient(.25turn, #0f0,#f00)',
                                            },
                                            '& .MuiSlider-track': {
                                                backgroundImage: 'linear-gradient(.25turn, #0f0,#f00)',
                                            },
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
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
        </Grid>
    );
}

const data = {
    labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Au',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
    ],
    datasets: [
        {
            label: '',
            data: [100, 500, 85, 90, 76, 300, 66, 44, 199, 299, 499, 500],
            fill: false,
        },
    ],
};

const optionsLine = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
};

const dataLine = {
    labels: ['Jun', 'Jul', 'Au', 'Sept', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            label: 'Prix',
            data: [320000, 310000, 295000, 300000, 315000, 310000, 320000],
            fill: false,
        },
    ],
};
export default AdvicePanel;
