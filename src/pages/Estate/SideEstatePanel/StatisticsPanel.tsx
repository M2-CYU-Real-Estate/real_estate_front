import {
    Box,
    Card,
    CardActions,
    CardContent,
    Grid,
    Rating,
    Typography,
} from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import house from '../../../assets/images/house.jpg';
import securityImage from '../../../assets/images/security.png';
import educationImage from '../../../assets/images/education.jpg';
import noteMoyenneImage from '../../../assets/images/noteMoyenne.avif';
import viePratique from '../../../assets/images/viePratique.jpg';
import environnmentImage from '../../../assets/images/environnement.png';
import sportImage from '../../../assets/images/sport.webp';
import { Link } from '@mui/material';
import GLOBALS from '../../../globals';
import Paper from '@mui/material/Paper';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function StatisticsPanel() {
    return (
        <Box paddingTop="1em">
            <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12} xl={12}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                Avis sur la ville de Paris
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
                                    <Grid item xs={6} md={4}>
                                        <Card sx={{ minWidth: 5 }}>
                                            <CardContent>
                                                <Typography
                                                    sx={{ fontSize: 15 }}
                                                    color="text.secondary"
                                                    gutterBottom
                                                >
                          Note Moyenne
                                                </Typography>
                                                <Typography variant="h5" component="div">
                          3.5 / 5
                                                </Typography>
                                                <Box
                                                    component="img"
                                                    sx={{
                                                        borderRadius: '3px',
                                                        width: '130px',
                                                        height: '255px',
                                                        maxHeight: '400px',
                                                        aspectRatio: '16/9',
                                                        objectFit: 'cover',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                    }}
                                                    alt="Image de l'offre"
                                                    src={noteMoyenneImage}
                                                />
                                                <Rating
                                                    name="half-rating-read"
                                                    value={3.5}
                                                    readOnly
                                                    size="small"
                                                    precision={0.5}
                                                />
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={6} md={8}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={4} sx={{ margin: '0 0 20px 0' }}>
                                                <Card sx={{ minWidth: 10 }}>
                                                    <CardContent>
                                                        <Typography
                                                            sx={{ fontSize: 12 }}
                                                            color="text.secondary"
                                                            gutterBottom
                                                        >
                              Sécurité
                                                        </Typography>
                                                        <Box
                                                            component="img"
                                                            sx={{
                                                                borderRadius: '3px',
                                                                width: '100px',
                                                                maxWidth: '200px',
                                                                aspectRatio: '16/9',
                                                                objectFit: 'cover',
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                            }}
                                                            alt="Image de l'offre"
                                                            src={securityImage}
                                                        />
                                                        <Rating
                                                            name="half-rating-read"
                                                            value={3.9}
                                                            readOnly
                                                            size="small"
                                                            precision={0.5}
                                                        />
                                                        <Typography variant="h5" component="div">
                              3.9 / 5
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <Card sx={{ minWidth: 5 }}>
                                                    <CardContent>
                                                        <Typography
                                                            sx={{ fontSize: 12 }}
                                                            color="text.secondary"
                                                            gutterBottom
                                                        >
                              Education
                                                        </Typography>
                                                        <Box
                                                            component="img"
                                                            sx={{
                                                                borderRadius: '3px',
                                                                width: '100px',
                                                                aspectRatio: '16/9',
                                                                maxWidth: '200px',
                                                                objectFit: 'cover',
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                            }}
                                                            alt="Image de l'offre"
                                                            src={educationImage}
                                                        />
                                                        <Rating
                                                            name="half-rating-read"
                                                            value={4.3}
                                                            readOnly
                                                            size="small"
                                                            precision={0.5}
                                                        />
                                                        <Typography variant="h5" component="div">
                              4.3 / 5
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={4}
                                                sx={{ margin: '0 0 20px 0' }}
                                            >
                                                <Card sx={{ minWidth: 5 }}>
                                                    <CardContent>
                                                        <Typography
                                                            sx={{ fontSize: 12 }}
                                                            color="text.secondary"
                                                            gutterBottom
                                                        >
                              Sport/Loisir
                                                        </Typography>
                                                        <Box
                                                            component="img"
                                                            sx={{
                                                                borderRadius: '3px',
                                                                width: '100px',
                                                                aspectRatio: '16/9',
                                                                maxWidth: '200px',
                                                                objectFit: 'cover',
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                            }}
                                                            alt="Image de l'offre"
                                                            src={sportImage}
                                                        />
                                                        <Rating
                                                            name="half-rating-read"
                                                            value={3.9}
                                                            readOnly
                                                            size="small"
                                                            precision={0.5}
                                                        />
                                                        <Typography variant="h5" component="div">
                              3.9 / 5
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={12} md={6}>
                                                <Card sx={{ minWidth: 5 }}>
                                                    <CardContent>
                                                        <Typography
                                                            sx={{ fontSize: 12 }}
                                                            color="text.secondary"
                                                            gutterBottom
                                                        >
                              Environnement
                                                        </Typography>
                                                        <Box
                                                            component="img"
                                                            sx={{
                                                                borderRadius: '3px',
                                                                width: '100px',
                                                                aspectRatio: '16/9',
                                                                // If the resulting size is too big, the image will overflow a little
                                                                objectFit: 'cover',
                                                            }}
                                                            alt="Image de l'offre"
                                                            src={environnmentImage}
                                                        />
                                                        <Rating
                                                            name="half-rating-read"
                                                            value={4.3}
                                                            readOnly
                                                            size="small"
                                                            precision={0.5}
                                                        />
                                                        <Typography variant="h5" component="div">
                              4.3 / 5
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6}>
                                                <Card sx={{ minWidth: 5 }}>
                                                    <CardContent>
                                                        <Typography
                                                            sx={{ fontSize: 12 }}
                                                            color="text.secondary"
                                                            gutterBottom
                                                        >
                              Vie Pratique
                                                        </Typography>
                                                        <Box
                                                            component="img"
                                                            sx={{
                                                                borderRadius: '3px',
                                                                width: '100px',
                                                                aspectRatio: '16/9',
                                                                // If the resulting size is too big, the image will overflow a little
                                                                objectFit: 'cover',
                                                            }}
                                                            alt="Image de l'offre"
                                                            src={viePratique}
                                                        />
                                                        <Rating
                                                            name="half-rating-read"
                                                            value={3.9}
                                                            readOnly
                                                            size="small"
                                                            precision={0.5}
                                                        />
                                                        <Typography variant="h5" component="div">
                              3.9 / 5
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12} xl={12}>
                    <Card sx={{ minWidth: 275, padding: '40px 0 8px 0' }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                Les prix moyen au m² des plus grandes villes de France
                            </Typography>
                            <Box
                                display="flex"
                                className="donut"
                                padding="1em"
                                justifyContent="center"
                                alignContent="center"
                                width="100%"
                                maxHeight="30em"
                            >
                                <Bar options={options} data={dataBar} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    xl={12}
                    sx={{ margin: '20px 0 20px 0' }}
                >
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                Évolution des prix de l’immobilier dans la Ville
                            </Typography>
                            <Box
                                display="flex"
                                className="donut"
                                justifyContent="center"
                                alignContent="center"
                                width="100%"
                            >
                                <Line data={dataLine} options={optionsLine} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    xl={12}
                    sx={{ margin: '20px 0 20px 0' }}
                >
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                Prix moyen du m² dans la Ville
                            </Typography>
                            <Grid
                                container
                                alignItems="center"
                                justifyContent="center"
                                sx={{ padding: '70px 0 19px 0' }}
                            >
                                <Grid item lg={4} md={4} sm={4} xs={12} xl={4}>
                                    <Typography variant="body1" component="div" fontWeight="bold">
                    Prix moyen <br /> appartement 4070 €
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    lg={4}
                                    md={4}
                                    sm={4}
                                    xs={12}
                                    xl={4}
                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                >
                                    <Box
                                        component="img"
                                        sx={{
                                            borderRadius: '3px',
                                            width: '350px',
                                            aspectRatio: '16/9',
                                            // If the resulting size is too big, the image will overflow a little
                                            objectFit: 'cover',
                                        }}
                                        alt="Image de l'offre"
                                        src={house}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    lg={4}
                                    md={4}
                                    sm={4}
                                    xs={12}
                                    xl={4}
                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                >
                                    <Typography variant="body1" component="div" fontWeight="bold">
                    Prix moyen <br /> maison 2523 €
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

const dataLine = {
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
            label: 'Prix en m2',
            data: [
                10445, 10639, 10427, 10361, 10514, 10536, 10374, 10194, 9869, 10282,
                9891, 10136,
            ],
            fill: false,
        },
    ],
};

const dataBar = {
    labels: [
        'Paris',
        'Marseille',
        'Lyon',
        'Toulouse',
        'Nice',
        'Nantes',
        'Strasbourg',
        'Montpellier',
        'Bordeaux',
        'Rennes',
        'Le Havre',
        'Reims',
    ],
    datasets: [
        {
            label: 'Prix en m2',
            data: [
                10845, 4721, 6627, 4262, 5933, 4751, 3613, 4385, 3613, 4385, 5636, 5207,
            ],
            fill: false,
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
};

const optionsLine = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
};

export default StatisticsPanel;
