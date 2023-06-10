import {
    Box,
    MenuItem,
    TextField,
    Grid,
    Autocomplete,
    createFilterOptions,
    Typography,
    Slider,
    InputAdornment,
    FormControlLabel,
    FormGroup,
    Switch,
    Button,
    Rating,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { EnergyClass, PriceRange } from '../../api/mocks/mockProfiles';
import { useParams } from 'react-router-dom';
import {
    energyClassLabels,
    priceRangeLabels,
} from '../NewProfile/FormComponents/textMappings';
import cities from '../../assets/data/correspondance_ville_partial.json';
import Error404 from '../Error404';
import { mockProfiles } from '../../api/mocks/mockProfiles';

const energyClassMarks = [
    { value: EnergyClass.E, label: energyClassLabels[EnergyClass.E] },
    { value: EnergyClass.D, label: energyClassLabels[EnergyClass.D] },
    { value: EnergyClass.C, label: energyClassLabels[EnergyClass.C] },
    { value: EnergyClass.B, label: energyClassLabels[EnergyClass.B] },
    { value: EnergyClass.A, label: energyClassLabels[EnergyClass.A] },
];

type ProfileParams = {
    id: string;
};

export const basicInfoValidationSchema = yup.object({
    priceRangeField: yup
        .mixed<PriceRange>()
        .oneOf(
            Object.values(PriceRange),
            'Valeur non reconnue, assurez-vous de choisir parmi les valeurs proposées'
        )
        .required('Le budget est attendu')
        .typeError('Le budget est attendu'),
    houseAreaField: yup
        .number()
        .required('La surface voulue est attendue')
        .positive('Un nombre valide est attendu')
        .typeError('Un nombre valide est attendu'),
    roomsField: yup
        .number()
        .required('Le nombre de pièces voulu est attendu')
        .positive('Un nombre valide est attendu')
        .typeError('Un nombre valide est attendu'),
    bedroomsField: yup
        .number()
        .required('Le nombre de chambres voulu est attendu')
        .positive('Un nombre valide est attendu')
        .typeError('Un nombre valide est attendu'),
    bathroomsField: yup
        .number()
        .required('Le nombre de salles de bains voulu est attendu')
        .positive('Un nombre valide est attendu')
        .typeError('Un nombre valide est attendu'),
    energyClassField: yup
        .mixed<EnergyClass>()
        .required('La classe énergétique est attendue'),
    balconyField: yup.boolean(),
    fittedKitchenField: yup.boolean(),
    cityField: yup
        .string()
        .required('La ville souhaitée est attendue')
        .typeError("Assurez-vous d'écrire un nom de ville valide"),
    cityDistanceField: yup
        .number()
        .required('La distance acceptable par rapport à la ville est attendue')
        .positive('Un nombre valide est attendu')
        .typeError('Un nombre valide est attendu'),
});

function UpdateProfile() {
    // TODO: fetch the profile, should throw an error if the profile does not belong to the user

    const { id } = useParams<ProfileParams>();

    if (!id) {
        return <Error404 />;
    }
    const profileNum = Number(id) - 1;
    const nomUser = mockProfiles[profileNum].name;
    const Profile = mockProfiles[profileNum].caracteristics;

    const formik = useFormik({
        initialValues: {
            priceRangeField: Profile.priceRange,
            cityField: Profile.city,
            cityDistanceField: Profile.cityDistanceKm,
            houseAreaField: Profile.houseAreaSqrtM,
            bedroomsField: Profile.bedrooms,
            bathroomsField: Profile.bathrooms,
            roomsField: Profile.rooms,
            energyClassField: Profile.energyClass,
            balconyField: Profile.balcony,
            fittedKitchenField: Profile.fittedKitchen,
            securityField: Profile.securityScore,
            educationField: Profile.educationScore,
            hobbiesField: Profile.hobbiesScore,
            environmentField: Profile.environmentScore,
            practicalityField: Profile.practicalityScore,
        },
        validationSchema: basicInfoValidationSchema,
        onSubmit: handleSubmit,
    });

    async function handleSubmit(e: FormResponses) {
    // TODO handle submit
        window.alert(JSON.stringify(e, null, 2));
    // setOpen(true);
    }

    return (
        <Box paddingLeft="2em" paddingRight="2em">
            <Box
                component="form"
                noValidate
                onSubmit={formik.handleSubmit}
                sx={{
                    mt: 1,
                }}
            >
                <Typography textAlign="center" variant="h5" color="primary.main">
                    {nomUser}
                </Typography>
                <Grid container spacing={2} sx={{ margin: '0 0 20px 0' }}>
                    <Grid item lg={6}>
                        <TextField
                            select
                            margin="normal"
                            fullWidth
                            label="Budget"
                            variant="outlined"
                            name="priceRangeField"
                            value={formik.values.priceRangeField}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.priceRangeField &&
                Boolean(formik.errors.priceRangeField)
                            }
                            helperText={
                                formik.touched.priceRangeField && formik.errors.priceRangeField
                            }
                            autoFocus
                        >
                            {Object.entries(priceRangeLabels).map(([range, label]) => (
                                <MenuItem key={range} value={range}>
                                    {label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item lg={6}>
                        <Autocomplete
                            filterOptions={createFilterOptions({
                                limit: 15,
                            })}
                            options={cities.map((c) => `${c.nom} (${c.postal})`)}
                            includeInputInList
                            value={formik.values.cityField}
                            onChange={(e, value) => formik.setFieldValue('cityField', value)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    margin="normal"
                                    fullWidth
                                    name="cityField"
                                    label="Ville"
                                    variant="outlined"
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.cityField && Boolean(formik.errors.cityField)
                                    }
                                    helperText={
                                        formik.touched.cityField && formik.errors.cityField
                                    }
                                    autoFocus
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ margin: '0 0 20px 0' }}>
                    <Grid item lg={4}>
                        <TextField
                            fullWidth
                            type="number"
                            InputProps={{
                                inputProps: {
                                    min: 5,
                                    max: 2000,
                                },
                                endAdornment: (
                                    <InputAdornment position="end">m²</InputAdornment>
                                ),
                            }}
                            label="Surface idéale"
                            variant="outlined"
                            name="houseAreaField"
                            margin="normal"
                            value={formik.values.houseAreaField}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.houseAreaField &&
                Boolean(formik.errors.houseAreaField)
                            }
                            helperText={
                                formik.touched.houseAreaField && formik.errors.houseAreaField
                            }
                            autoFocus
                        ></TextField>
                    </Grid>
                    <Grid item lg={4}>
                        <TextField
                            fullWidth
                            type="number"
                            InputProps={{
                                inputProps: {
                                    min: 5,
                                    max: 2000,
                                },
                                endAdornment: (
                                    <InputAdornment position="end">m²</InputAdornment>
                                ),
                            }}
                            label="Nombre de chambres"
                            variant="outlined"
                            name="bedroomsField"
                            margin="normal"
                            value={formik.values.bedroomsField}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.bedroomsField &&
                Boolean(formik.errors.bedroomsField)
                            }
                            helperText={
                                formik.touched.bedroomsField && formik.errors.bedroomsField
                            }
                            autoFocus
                        ></TextField>
                    </Grid>
                    <Grid item lg={4}>
                        <Typography gutterBottom>Éloignement acceptable</Typography>
                        <Grid container spacing="2em" alignItems="center">
                            <Grid item lg={4}>
                                <Slider
                                    size="medium"
                                    name="cityDistanceField"
                                    min={0}
                                    max={500}
                                    step={10}
                                    value={formik.values.cityDistanceField}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item lg={3}>
                                <Typography> {formik.values.cityDistanceField} km</Typography>
                            </Grid>
                            <Grid item lg={3}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={formik.values.balconyField}
                                                onChange={formik.handleChange}
                                                name="balconyField"
                                            />
                                        }
                                        label="Balcon"
                                        labelPlacement="start"
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ margin: '0 0 20px 0' }}>
                    <Grid item lg={4}>
                        <TextField
                            fullWidth
                            type="number"
                            InputProps={{
                                inputProps: {
                                    min: 1,
                                    max: 500,
                                },
                                endAdornment: (
                                    <InputAdornment position="end">pièces</InputAdornment>
                                ),
                            }}
                            label="Nombre de salles de bain"
                            variant="outlined"
                            name="bathroomsField"
                            margin="normal"
                            value={formik.values.bathroomsField}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.bathroomsField &&
                Boolean(formik.errors.bathroomsField)
                            }
                            helperText={
                                formik.touched.bathroomsField && formik.errors.bathroomsField
                            }
                            autoFocus
                        ></TextField>
                    </Grid>
                    <Grid item lg={4}>
                        <TextField
                            fullWidth
                            type="number"
                            InputProps={{
                                inputProps: {
                                    min: 1,
                                    max: 500,
                                },
                                endAdornment: (
                                    <InputAdornment position="end">pièces</InputAdornment>
                                ),
                            }}
                            label="Nombre de pièces"
                            variant="outlined"
                            name="roomsField"
                            margin="normal"
                            value={formik.values.roomsField}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.roomsField && Boolean(formik.errors.roomsField)
                            }
                            helperText={formik.touched.roomsField && formik.errors.roomsField}
                            autoFocus
                        ></TextField>
                    </Grid>
                    <Grid item lg={4}>
                        <Typography gutterBottom>Classe énergétique minimale</Typography>
                        <Grid container spacing="2em" alignItems="center">
                            <Grid item lg={7}>
                                <Slider
                                    size="medium"
                                    name="energyClassField"
                                    min={1}
                                    max={energyClassMarks.length}
                                    marks={energyClassMarks}
                                    step={1}
                                    sx={{
                                        '& .MuiSlider-track': {
                                            backgroundImage: 'linear-gradient(.25turn, #f00, #0f0)',
                                        },
                                        '& .MuiSlider-rail': {
                                            backgroundImage: 'linear-gradient(.25turn, #f00, #0f0)',
                                        },
                                    }}
                                    value={formik.values.energyClassField}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item lg={4}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Switch />}
                                        checked={formik.values.fittedKitchenField}
                                        onChange={formik.handleChange}
                                        name="fittedKitchenField"
                                        label="Cuisine équipée"
                                        labelPlacement="start"
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ margin: '0 0 20px 0' }}>
                    <Grid item lg={2.5}>
                        <Typography component="legend">Sécurité</Typography>
                        <Rating
                            name="securityField"
                            value={formik.values.securityField}
                            precision={0.5}
                        />
                    </Grid>
                    <Grid item lg={2.5}>
                        <Typography component="legend">Éducation</Typography>
                        <Rating
                            name="educationField"
                            value={formik.values.educationField}
                            onChange={formik.handleChange}
                            precision={0.5}
                        />
                    </Grid>
                    <Grid item lg={2.5}>
                        <Typography component="legend">Sports et loisirs</Typography>
                        <Rating
                            name="hobbiesField"
                            value={formik.values.hobbiesField}
                            onChange={formik.handleChange}
                            precision={0.5}
                        />
                    </Grid>
                    <Grid item lg={2.5}>
                        <Typography component="legend">Environnement</Typography>
                        <Rating
                            name="environmentField"
                            value={formik.values.environmentField}
                            onChange={formik.handleChange}
                            precision={0.5}
                        />
                    </Grid>
                    <Grid item lg={2}>
                        <Typography component="legend">Vie pratique</Typography>
                        <Rating
                            name="practicalityField"
                            value={formik.values.practicalityField}
                            onChange={formik.handleChange}
                            precision={0.5}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid
                        item
                        xl={12}
                        container
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                            }}
                        >
              Mettre à jour
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

interface FormResponses {
    priceRangeField: string;
    cityField: string;
    cityDistanceField: number;
    houseAreaField: number;
    bedroomsField: number;
    bathroomsField: number;
    roomsField: number;
    energyClassField: number;
    balconyField: boolean;
    fittedKitchenField: boolean;
    securityField: number;
    educationField: number;
    hobbiesField: number;
    environmentField: number;
    practicalityField: number;
}

export default UpdateProfile;
