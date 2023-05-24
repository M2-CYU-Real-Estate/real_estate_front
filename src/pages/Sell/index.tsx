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
import Autocomplete from '@mui/material/Autocomplete';

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
        .required('Un nom est attendu'),
    surfaceTerrain: yup
        .number()
        .min(1, 'La surface du terrain  doit au moins avoir 1 caractères')
        .required('Une addresse e-mail est attendue'),
    nbPiece: yup
        .number()
        .min(1, 'Le nombre de pièces doit au moins avoir 1 caractères')
        .required('Un mot de passe est attendu'),
    nbToillet: yup
        .number()
        .min(1, 'Le nombre de toilletes doit au moins avoir 1 caractères')
        .required('Un mot de passe est attendu'),

    ville: yup
        .string()
        .min(3, 'La ville doit au moins avoir 3 caractères')
        .required('Un mot de passe est attendu'),
});

function Sell() {
    const formik = useFormik({
        initialValues: {
            surface: 0,
            surfaceTerrain: 0,
            nbPiece: 0,
            nbToillet: 0,
            ville: '',
            codepostal: 0,
        },
        validationSchema: validationSchema,
        onSubmit: handleSumbit,
    });
    const [isOpen, setOpen] = React.useState(false);
    async function handleSumbit(e: FormResponses) {
        // TODO handle submit
        // window.alert(JSON.stringify(e, null, 2));
        setOpen(true);
    }
      
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
                                    <Autocomplete
                                        disablePortal
                                        options={Villes}
                                        renderInput={(params) => 
                                            <TextField
                                                {...params} label="Ville"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="ville"
                                                type="string"
                                                name="ville"
                                                value={formik.values.ville}
                                                onChange={formik.handleChange}
                                                error={
                                                    formik.touched.ville &&
                                                    Boolean(formik.errors.ville)
                                                }
                                                helperText={
                                                    formik.touched.ville &&
                                                    formik.errors.ville
                                                } />}
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
    ville: string;
}

const Villes = [
    {label: '95000 - Cergy'},
    {label: '92000 - Nanterre'},
    {label: '95300 - Pontoise'},
    {label: '93000 - Saint-Denis'}
];

export default Sell;
