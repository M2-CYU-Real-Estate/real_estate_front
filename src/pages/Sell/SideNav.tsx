import { Avatar, Box, Grid, Typography } from '@mui/material';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import InfoIcon from '@mui/icons-material/Info';
import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { Colors } from 'chart.js';

Chart.register(CategoryScale);
Chart.register(Colors);

function EstimatedPrice() {
    return (
        <Box
            sx={{
                width: '40vw',
                maxWidth: '560px',
                height: '100vw',
                overflowX: 'hidden',
                backgroundColor: 'primary.dark',
                '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: 1,
                },
            }}
        >
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                sx={{ margin: '60px 0 0 0' }}
            >
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
                    <Typography
                        component="h1"
                        variant="h6"
                        fontWeight="bold"
                        sx={{ color: 'white' }}
                    >
            Estimation du Prix
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                sx={{ margin: '20px 0 0 0' }}
            >
                <Grid item>
                    <Typography component="h1" variant="body1" sx={{ color: 'white' }}>
            Le prix total est de:
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography
                        component="h1"
                        variant="h6"
                        fontWeight="bold"
                        sx={{ color: 'white' }}
                    >
            300 000 €
                    </Typography>
                </Grid>
            </Grid>

            <Grid
                container
                alignItems="center"
                justifyContent="center"
                sx={{ margin: '20px 0 0 0' }}
            >
                <Grid item>
                    <Typography component="h1" variant="body1" sx={{ color: 'white' }}>
            Prix du bien au m²:
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography
                        component="h1"
                        variant="h6"
                        fontWeight="bold"
                        sx={{ color: 'white' }}
                    >
            300 €
                    </Typography>
                </Grid>
            </Grid>

            <Grid
                container
                alignItems="center"
                justifyContent="center"
                sx={{ margin: '40px 0 0 0' }}
            >
                <Grid item>
                    <Typography
                        component="h1"
                        variant="h6"
                        fontWeight="bold"
                        sx={{ color: 'white' }}
                    >
            Evolution du prix dans votre région
                    </Typography>
                </Grid>
            </Grid>

            <Box
                display="flex"
                className="donut"
                padding="2em"
                justifyContent="center"
                alignContent="center"
                width="100%"
                maxHeight="30em"
            >
                <Line data={data} options={chartOptions} />
            </Box>

            <Grid
                container
                alignItems="center"
                justifyContent="center"
                sx={{ margin: '40px 0 0 0' }}
            >
                <Grid item>
                    <Avatar
                        sx={{
                            backgroundColor: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <InfoIcon fontSize="large" />
                    </Avatar>
                </Grid>
                <Grid item>
                    <Typography
                        component="h1"
                        variant="h6"
                        fontWeight="bold"
                        sx={{ color: 'white' }}
                    >
            Comment ça marche?
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                sx={{ margin: '20px 0 0 20px' }}
            >
                <Grid item alignItems="center" justifyContent="center">
                    <div
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            width: '27rem',
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{ color: 'white', overflowWrap: 'break-word' }}
                        >
              Notre modèle IA et de machine learning a été entraîné sur une
              vaste base de données immobilières pour offrir des estimations
              précises et rapides. Vous pouvez donc obtenir une évaluation
              réaliste du prix de votre bien immobilier en quelques clics grâce
              à notre technologie avancée.
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </Box>
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
            data: [
                10445, 10639, 10427, 10361, 10514, 10536, 10374, 10194, 9869, 10282,
                9891, 10136,
            ],
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'white',
            color: 'white',
            elements: {
                point: {
                    backgroundColor: 'white', // Specify the color of the values here
                },
                line: {
                    borderColor: 'white', // Specify the color of the line here
                },
            },
            lineTension: 0.2,
            pointBorderColor: '#111',
            pointBorderWidth: 2,
        },
    ],
};

const chartOptions = {
    plugins: {
        datalabels: {
            color: 'whitesmoke',
        },
    },
    scales: {
        y: {
            ticks: {
                color: 'white',
            },
        },
        x: {
            ticks: {
                color: 'white',
            },
        },
    },
    legend: {
        labels: {
            color: 'white', // Specify the legend color here
        },
    },
    tooltips: {
        displayColors: false,
        titleFontSize: 16,
        bodyFontSize: 14,
        xPadding: 10,
        yPadding: 10,
    },
};
export default EstimatedPrice;
