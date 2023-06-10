import {
    Avatar,
    Box,
    Divider,
    Grid,
    List,
    ListItem,
    Typography,
    Slider,
    FormLabel,
    RadioGroup,
    Radio,
    FormControl,
    FormControlLabel,
    InputAdornment,
    TextField,
    Switch,
    FormGroup,
    Button,
    Autocomplete,
    createFilterOptions,
} from '@mui/material';
import { useFormik } from 'formik';
import {
    energyClassLabels,
    priceRangeLabels,
} from '../../NewProfile/FormComponents/textMappings';

import { EnergyClass } from '../../../api/mocks/mockProfiles';
import cities from '../../../assets/data/correspondance_ville_partial.json';
import * as yup from 'yup';
import { none } from 'ol/centerconstraint';

const energyClassMarks = [
    { value: EnergyClass.E, label: energyClassLabels[EnergyClass.E] },
    { value: EnergyClass.D, label: energyClassLabels[EnergyClass.D] },
    { value: EnergyClass.C, label: energyClassLabels[EnergyClass.C] },
    { value: EnergyClass.B, label: energyClassLabels[EnergyClass.B] },
    { value: EnergyClass.A, label: energyClassLabels[EnergyClass.A] },
];

export const basicInfoValidationSchema = yup.object({
    ville: yup.string().required('La ville voulue est attendue'),
    maison: yup.boolean(),
    appartement: yup.boolean(),
    prixMin: yup
        .number()
        .required('Le prixMin voulue est attendue')
        .positive('Un nombre valide est attendu')
        .typeError('Un nombre valide est attendu'),
    prixMax: yup
        .number()
        .required('Le prixMax voulue est attendue')
        .positive('Un nombre valide est attendu')
        .typeError('Un nombre valide est attendu'),
    surfaceMin: yup
        .number()
        .required('La surfaceMin voulu est attendu')
        .positive('Un nombre valide est attendu')
        .typeError('Un nombre valide est attendu'),
    surfaceMax: yup
        .number()
        .required('La surfaceMax voulu est attendu')
        .positive('Un nombre valide est attendu')
        .typeError('Un nombre valide est attendu'),
    nbPieces: yup
        .number()
        .required('Le nombre de pieces voulu est attendu')
        .positive('Un nombre valide est attendu')
        .typeError('Un nombre valide est attendu'),
    nbSalleBain: yup
        .number()
        .required('Le nombre de salle de bains voulu est attendu')
        .positive('Un nombre valide est attendu')
        .typeError('Un nombre valide est attendu'),
    kitchen: yup.boolean(),
    balcon: yup.boolean(),
    ascenseur: yup.boolean(),
    garage: yup.boolean(),
    energyClass: yup
        .mixed<EnergyClass>()
        .required('La classe énergétique est attendue'),
});
function SideSearch() {
    const formik = useFormik({
        initialValues: {
            ville: '',
            typeBien: 1,
            prixMin: 0,
            prixMax: 0,
            surfaceMax: 0,
            surfaceMin: 0,
            nbPieces: 0,
            nbSalleBain: 0,
            kitchen: false,
            balcon: true,
            ascenseur: false,
            garage: true,
            energyClass: 2,
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
        <Box
            sx={{
                width: '30vw',
                maxWidth: '560px',
                height: '100vw',
            }}
        >
            <Box
                component="form"
                noValidate
                onSubmit={formik.handleSubmit}
                sx={{
                    mt: 1,
                }}
            >
                <List>
                    <ListItem>
                        <Grid container sx={{ margin: '10px 0 0 0' }}>
                            <Grid item lg={9}>
                                <Typography component="h1" variant="h6" fontWeight="bold">
                  Tous les filtres
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                lg={3}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'right',
                                    justifyContent: 'right',
                                }}
                            ></Grid>
                        </Grid>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Grid container sx={{ margin: '20px 0 0 0' }}>
                            <Grid item lg={12}>
                                <FormLabel id="demo-radio-buttons-group-label">
                  Nom de la Ville
                                </FormLabel>
                                <Autocomplete
                                    filterOptions={createFilterOptions({
                                        limit: 15,
                                    })}
                                    options={cities.map((c) => `${c.nom} (${c.postal})`)}
                                    includeInputInList
                                    value={formik.values.ville}
                                    onChange={(e, value) => formik.setFieldValue('ville', value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            margin="normal"
                                            fullWidth
                                            name="ville"
                                            label="Ville"
                                            variant="outlined"
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.ville && Boolean(formik.errors.ville)
                                            }
                                            helperText={formik.touched.ville && formik.errors.ville}
                                            autoFocus
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Grid container>
                            <Grid item lg={12}>
                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">
                    Type de bien
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="typeBien"
                                    >
                                        <FormControlLabel
                                            label="Maison"
                                            control={
                                                <Radio onChange={formik.handleChange} value={2} />
                                            }
                                        />
                                        <FormControlLabel
                                            label="Appartement"
                                            control={
                                                <Radio onChange={formik.handleChange} value={1} />
                                            }
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Grid container spacing={2}>
                            <Grid item lg={6}>
                                <FormLabel id="demo-radio-buttons-group-label">
                                    {' '}
                  Prix Minimum
                                </FormLabel>
                                <TextField
                                    fullWidth
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            min: 1,
                                            max: 500,
                                        },
                                        endAdornment: (
                                            <InputAdornment position="end">€</InputAdornment>
                                        ),
                                    }}
                                    value={formik.values.prixMin}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.prixMin && Boolean(formik.errors.prixMin)
                                    }
                                    helperText={formik.touched.prixMin && formik.errors.prixMin}
                                    variant="outlined"
                                    name="prixMin"
                                    margin="normal"
                                    autoFocus
                                ></TextField>
                            </Grid>
                            <Grid item lg={6}>
                                <FormLabel id="demo-radio-buttons-group-label">
                                    {' '}
                  Prix Maximum
                                </FormLabel>
                                <TextField
                                    fullWidth
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            min: 1,
                                            max: 500,
                                        },
                                        endAdornment: (
                                            <InputAdornment position="end">€</InputAdornment>
                                        ),
                                    }}
                                    value={formik.values.prixMax}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.prixMax && Boolean(formik.errors.prixMax)
                                    }
                                    helperText={formik.touched.prixMax && formik.errors.prixMax}
                                    variant="outlined"
                                    name="prixMax"
                                    margin="normal"
                                    autoFocus
                                ></TextField>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Grid container spacing={2}>
                            <Grid item lg={6}>
                                <FormLabel id="demo-radio-buttons-group-label">
                  Surface Minimum
                                </FormLabel>
                                <TextField
                                    fullWidth
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            min: 1,
                                            max: 500,
                                        },
                                        endAdornment: (
                                            <InputAdornment position="end">m²</InputAdornment>
                                        ),
                                    }}
                                    value={formik.values.surfaceMin}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.surfaceMin &&
                    Boolean(formik.errors.surfaceMin)
                                    }
                                    helperText={
                                        formik.touched.surfaceMin && formik.errors.surfaceMin
                                    }
                                    variant="outlined"
                                    name="surfaceMin"
                                    margin="normal"
                                    autoFocus
                                ></TextField>
                            </Grid>
                            <Grid item lg={6}>
                                <FormLabel id="demo-radio-buttons-group-label">
                                    {' '}
                  Surface Maximum
                                </FormLabel>
                                <TextField
                                    fullWidth
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            min: 1,
                                            max: 500,
                                        },
                                        endAdornment: (
                                            <InputAdornment position="end">m²</InputAdornment>
                                        ),
                                    }}
                                    value={formik.values.surfaceMax}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.surfaceMax &&
                    Boolean(formik.errors.surfaceMax)
                                    }
                                    helperText={
                                        formik.touched.surfaceMax && formik.errors.surfaceMax
                                    }
                                    variant="outlined"
                                    name="surfaceMax"
                                    margin="normal"
                                    autoFocus
                                ></TextField>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Grid container spacing={2}>
                            <Grid item lg={6}>
                                <FormLabel id="demo-radio-buttons-group-label">
                                    {' '}
                  Nombre de pieces
                                </FormLabel>
                                <TextField
                                    fullWidth
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            min: 1,
                                            max: 500,
                                        },
                                    }}
                                    value={formik.values.nbPieces}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.nbPieces && Boolean(formik.errors.nbPieces)
                                    }
                                    helperText={formik.touched.nbPieces && formik.errors.nbPieces}
                                    variant="outlined"
                                    name="nbPieces"
                                    margin="normal"
                                    autoFocus
                                ></TextField>
                            </Grid>
                            <Grid item lg={6}>
                                <FormLabel id="demo-radio-buttons-group-label">
                                    {' '}
                  Salle de bains
                                </FormLabel>
                                <TextField
                                    fullWidth
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            min: 1,
                                            max: 500,
                                        },
                                    }}
                                    value={formik.values.nbSalleBain}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.nbSalleBain &&
                    Boolean(formik.errors.nbSalleBain)
                                    }
                                    helperText={
                                        formik.touched.nbSalleBain && formik.errors.nbSalleBain
                                    }
                                    variant="outlined"
                                    name="nbSalleBain"
                                    margin="normal"
                                    autoFocus
                                ></TextField>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Grid container>
                            <Grid item lg={12}>
                                <FormLabel id="demo-radio-buttons-group-label">
                  Accommodations
                                </FormLabel>
                                <FormGroup row>
                                    <FormControlLabel
                                        label="Cuisine équipée"
                                        control={
                                            <Switch
                                                checked={formik.values.kitchen}
                                                onChange={formik.handleChange}
                                                name="kitchen"
                                            />
                                        }
                                        labelPlacement="start"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={formik.values.balcon}
                                                onChange={formik.handleChange}
                                                name="balcon"
                                            />
                                        }
                                        label="Balcon"
                                        labelPlacement="start"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={formik.values.ascenseur}
                                                onChange={formik.handleChange}
                                                name="ascendeur"
                                            />
                                        }
                                        label="Asecenseur"
                                        labelPlacement="start"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={formik.values.garage}
                                                onChange={formik.handleChange}
                                                name="garage"
                                            />
                                        }
                                        label="Garage"
                                        labelPlacement="start"
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Grid container>
                            <Grid item lg={10}>
                                <FormLabel id="demo-radio-buttons-group-label">
                  Classe energy
                                </FormLabel>
                                <Slider
                                    size="medium"
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
                                    name="energyClass"
                                    value={formik.values.energyClass}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                        </Grid>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Grid container spacing={7}>
                            <Grid item lg={6}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        mt: 3,
                                        mb: 2,
                                        backgroundColor: 'grey',
                                    }}
                                >
                  Effacer Tout
                                </Button>
                            </Grid>
                            <Grid item lg={6}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        mt: 3,
                                        mb: 2,
                                    }}
                                >
                  Rechercher
                                </Button>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
}

interface FormResponses {
    ville: string;
    typeBien: number;
    prixMin: number;
    prixMax: number;
    surfaceMin: number;
    surfaceMax: number;
    nbPieces: number;
    nbSalleBain: number;
    kitchen: boolean;
    balcon: boolean;
    ascenseur: boolean;
    garage: boolean;
    energyClass: number;
}
export default SideSearch;
