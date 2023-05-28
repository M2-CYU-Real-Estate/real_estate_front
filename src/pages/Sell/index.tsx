import MainIcon from '@mui/icons-material/House';
import {
    Avatar,
    Box,
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
    Drawer
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import HomeButton from '../../components/HomeButton';
import SidePanel from '../../components/SideImagePanel';
import Header from '../../components/Header';
import EstimatedPrice from './SideNav';
import React from 'react';

const validationSchema = yup.object({
    surface: yup
        .number()
        .min(1, 'La surface doit au moins avoir 1 caractères')
        .required('la surface est attendue'),
    surfaceTerrain: yup
        .number()
        .min(1, 'La surface du terrain  doit au moins avoir 1 caractères'),
    nbPiece: yup
        .number()
        .min(1, 'Le nombre de pièces doit au moins avoir 1 caractères')
        .required('Le nombre de pièce est attendu'),
    nbToillet: yup
        .number()
        .min(1, 'Le nombre de toilletes doit au moins avoir 1 caractères')
        .required('Le nombre de toilletes est attendu'),
    lat: yup
        .string()
        .min(2, 'Il faut au moins 2 caractères pour latitude')
        .matches(/^\d{1,2}\.\d+$/,'Les coordonnées sont incorrecte')
        .required('Un mot de passe est attendu'),
        
    long: yup
        .string()
        .min(2, 'Il faut au moins 2 caractères pour longitude')
        .matches(/^\d{1,2}\.\d+$/,'Les coordonnées sont incorrecte')
        .required('la longitude est attendu'),
   
});

function Sell() {
    const formik = useFormik({
        initialValues: {
            surface: 101,
            surfaceTerrain: 150,
            nbPiece: 3,
            nbToillet: 2,
            lat: 11.22,
            long: 22.77,
            coord: '',
        },
        validationSchema: validationSchema,
        onSubmit: handleSumbit,
    });
    const [isOpen, setOpen] = React.useState(false);
    async function handleSumbit() {
        // TODO handle submit
        // window.alert(JSON.stringify(e, null, 2));
        setOpen(true);
    }

    const handleBlurLatLong = () => {
        const { lat, long } = formik.values;
        if (lat && long) {
            formik.setFieldValue('coord', `${lat},${long}`);
        }
    };

    const handleBlurCoord= () => {
        const { coord } = formik.values;
        if (coord) {
            const [lat, long] = coord.split(',');
            if (lat && long) {
                formik.setFieldValue('lat', lat);
                formik.setFieldValue('long', long);
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
                            Vendre
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
                                        id="surface"
                                        type="number"
                                        label="Surface en m2"
                                        name="surface"
                                        value={formik.values.surface}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.surface &&
                                            Boolean(formik.errors.surface)
                                        }
                                        helperText={
                                            formik.touched.surface &&
                                            formik.errors.surface
                                        }
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="surfaceTerrain"
                                        type="number"
                                        label="Surface du terrain en m2"
                                        name="surfaceTerrain"
                                        value={formik.values.surfaceTerrain}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.surfaceTerrain &&
                                            Boolean(
                                                formik.errors.surfaceTerrain
                                            )
                                        }
                                        helperText={
                                            formik.touched.surfaceTerrain &&
                                            formik.errors.surfaceTerrain
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="nbPiece"
                                        type="number"
                                        label="Nombre de pièces"
                                        name="nbPiece"
                                        value={formik.values.nbPiece}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.nbPiece &&
                                            Boolean(formik.errors.nbPiece)
                                        }
                                        helperText={
                                            formik.touched.nbPiece &&
                                            formik.errors.nbPiece
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="nbToillet"
                                        type="number"
                                        label="Nombre de toilletes"
                                        name="nbToillet"
                                        value={formik.values.nbToillet}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.nbToillet &&
                                            Boolean(formik.errors.nbToillet)
                                        }
                                        helperText={
                                            formik.touched.nbToillet &&
                                            formik.errors.nbToillet
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
                                        id="lat"
                                        type="string"
                                        name="lat"
                                        value={formik.values.lat}
                                        onChange={formik.handleChange}
                                        onBlur={handleBlurLatLong} // Calculate coord on blur
                                        error={
                                            formik.touched.lat &&
                                                    Boolean(formik.errors.lat)
                                        }
                                        helperText={
                                            formik.touched.lat &&
                                                    formik.errors.lat
                                        } />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Longitude"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="long"
                                        type="string"
                                        name="long"
                                        value={formik.values.long}
                                        onChange={formik.handleChange}
                                        onBlur={handleBlurLatLong}
                                        error={
                                            formik.touched.long &&
                                                    Boolean(formik.errors.long)
                                        }
                                        helperText={
                                            formik.touched.long &&
                                                    formik.errors.long
                                        } />
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
                                        error={
                                            formik.touched.coord &&
                                            Boolean(formik.errors.coord)
                                        }
                                        helperText={
                                            formik.touched.coord &&
                                            formik.errors.coord
                                        } />
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
                        <EstimatedPrice />  
                    </Drawer>
                </React.Fragment>
            </Grid>
        </Box>
    );
}

interface FormResponses {
    surface: number;
    surfaceTerrain: number;
    nbPiece: number;
    nbToillet: number;
    lat: string;
    long: string;
    coord:string;
}


export default Sell;
