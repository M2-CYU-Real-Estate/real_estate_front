import MainIcon from '@mui/icons-material/House';
import {
    Avatar,
    Box,
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
    Drawer,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import HomeButton from '../../components/HomeButton';
import SidePanel from '../../components/SideImagePanel';
import Header from '../../components/Header';
import EstimatedPrice from './SideNav';
import React from 'react';

type PredictedPrice = {
    price: number;
};

import { usePricePredictionMutation } from '../../api/pricePrediction/pricePrediction';

const validationSchema = yup.object({
    houseArea: yup
        .number()
        .min(1, 'La surface doit etre supérieure à 0 ')
        .required('la surface est attendue'),
    terrainArea: yup.number().min(0, 'La surface du terrain  doit être positif'),
    roomCount: yup
        .number()
        .min(0, 'Le nombre de pièces doit être positif')
        .required('Le nombre de pièces est attendu'),
    latitude: yup
        .string()
        .transform((value) => (value ? value.replace(/\s/g, '') : value))
        .min(2, 'Il faut au moins 2 caractères pour la latitude')
        .matches(/^\d{1,2}\.\d+$/, 'Les coordonnées sont incorrectes')
        .required('la latitude est attendue'),

    longitude: yup
        .string()
        .transform((value) => (value ? value.replace(/\s/g, '') : value))
        .min(2, 'Il faut au moins 2 caractères pour longitude')
        .matches(/^\d{1,2}\.\d+$/, 'Les coordonnées sont incorrectes')
        .required('la longitude est attendue'),
});

function Sell() {
    const [isOpen, setOpen] = React.useState(false);
    const [predictedPrice, setPredictedPrice] = React.useState(0);

    const [predict, { isLoading }] = usePricePredictionMutation();

    const formik = useFormik({
        initialValues: {
            houseArea: 50,
            terrainArea: 150,
            roomCount: 3,
            bathroomCount: 0,
            latitude: '43.3475883319',
            longitude: '3.23076754164',
            coord: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            console.log({ values, actions });
            actions.setSubmitting(true);
            setOpen(true);
            // Login and handle the response (not the error, no need)
            predict(values)
                .unwrap()
                .then((response: PredictedPrice) => {
                    console.log(response);
                    setPredictedPrice(response.price);
                })
                .finally(() => actions.setSubmitting(false));
        },
    });

    const handleBlurLatLong = () => {
        const { latitude, longitude } = formik.values;
        if (latitude && longitude) {
            formik.setFieldValue('coord', `${latitude},${longitude}`);
        }
    };

    const handleBlurCoord = () => {
        const { coord } = formik.values;
        if (coord) {
            const [latitude, longitude] = coord.split(',');
            if (latitude && longitude) {
                formik.setFieldValue('latitude', latitude);
                formik.setFieldValue('longitude ', longitude);
            } else {
                console.error('Invalid coordinate format');
            }
        }
    };

    return (
        <Box
            display="flex"
            alignItems="stretch"
            flexDirection="column"
            height="100vh"
        >
            <Header />
            <Grid container component="main" sx={{ height: '100vh' }}>
                <Grid
                    container
                    item
                    // Each size is made as opposite to the "image" panel
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6} // A small shadow over the background
                    square
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="row"
                >
                    {/* Main login box */}
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            sx={{
                                backgroundColor: 'primary.main',
                            }}
                        >
                            <MainIcon fontSize="large" />
                        </Avatar>
                        <Typography component="h1" variant="h5">
              Vendre / Acheter
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={formik.handleSubmit}
                            sx={{
                                mt: 1,
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="houseArea"
                                        type="number"
                                        label="Surface en m2"
                                        name="houseArea"
                                        value={formik.values.houseArea}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.houseArea &&
                      Boolean(formik.errors.houseArea)
                                        }
                                        helperText={
                                            formik.touched.houseArea && formik.errors.houseArea
                                        }
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="terrainArea"
                                        type="number"
                                        label="Surface du terrain en m2"
                                        name="terrainArea"
                                        value={formik.values.terrainArea}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.terrainArea &&
                      Boolean(formik.errors.terrainArea)
                                        }
                                        helperText={
                                            formik.touched.terrainArea && formik.errors.terrainArea
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="roomCount"
                                        type="number"
                                        label="Nombre de pièces"
                                        name="roomCount"
                                        value={formik.values.roomCount}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.roomCount &&
                      Boolean(formik.errors.roomCount)
                                        }
                                        helperText={
                                            formik.touched.roomCount && formik.errors.roomCount
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Latitude"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="latitude"
                                        type="string"
                                        name="latitude"
                                        value={formik.values.latitude}
                                        onChange={formik.handleChange}
                                        onBlur={handleBlurLatLong} // Calculate coord on blur
                                        error={
                                            formik.touched.latitude && Boolean(formik.errors.latitude)
                                        }
                                        helperText={
                                            formik.touched.latitude && formik.errors.latitude
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Longitude"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="longitude"
                                        type="string"
                                        name="longitude"
                                        value={formik.values.longitude}
                                        onChange={formik.handleChange}
                                        onBlur={handleBlurLatLong}
                                        error={
                                            formik.touched.longitude &&
                      Boolean(formik.errors.longitude)
                                        }
                                        helperText={
                                            formik.touched.longitude && formik.errors.longitude
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={9}>
                                    <TextField
                                        label="Coordonnées géographique"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="coord"
                                        type="string"
                                        name="coord"
                                        value={formik.values.coord}
                                        onChange={formik.handleChange}
                                        onBlur={handleBlurCoord}
                                        error={formik.touched.coord && Boolean(formik.errors.coord)}
                                        helperText={formik.touched.coord && formik.errors.coord}
                                    />
                                </Grid>
                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                }}
                            >
                Estimer le prix
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        sx={{ backgroundColor: 'primary.main' }}
                        padding={1}
                        component={Paper}
                        elevation={6}
                    >
                        <HomeButton />
                    </Box>
                </Grid>
                <SidePanel />
                {/* <TemporaryDrawer /> */}
                <React.Fragment key={'right'}>
                    <Drawer
                        anchor={'right'}
                        open={isOpen}
                        onClose={() => setOpen(false)}
                        sx={{
                            opacity: '0.9', // Set the opacity of the drawer (adjust as needed)
                        }}
                    >
                        <EstimatedPrice price={predictedPrice} isLoading={isLoading} />
                    </Drawer>
                </React.Fragment>
            </Grid>
        </Box>
    );
}

interface FormResponses {
    houseArea: number;
    terrainArea: number;
    roomCount: number;
    bathroomCount: number;
    latitude: string;
    longitude: string;
    coord: string;
}

export default Sell;
