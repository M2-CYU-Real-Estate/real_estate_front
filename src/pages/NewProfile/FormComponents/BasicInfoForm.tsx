import {
    Autocomplete,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    InputAdornment,
    MenuItem,
    Slider,
    Switch,
    TextField,
    Typography,
    createFilterOptions,
} from '@mui/material';
import { useField } from 'formik';
import { EnergyClass, PriceRange } from '../model';
import * as yup from 'yup';
import cities from '../../../assets/data/correspondance_ville_partial.json';

export const basicInfoValidationSchema = yup.object({
    priceRange: yup
        .mixed<PriceRange>()
        .oneOf(
            Object.values(PriceRange),
            'Valeur non reconnue, assurez-vous de choisir parmi les valeurs proposées'
        )
        .required('Le budget est attendu')
        .typeError('Le budget est attendu'),
    houseAreaSqrtM: yup
        .number()
        .required('La surface voulue est attendue')
        .positive('Un nombre valide est attendu')
        .typeError('Un nombre valide est attendu'),
    rooms: yup
        .number()
        .required('Le nombre de pièces voulu est attendu')
        .positive('Un nombre valide est attendu')
        .typeError('Un nombre valide est attendu'),
    bedrooms: yup
        .number()
        .required('Le nombre de chambres voulu est attendu')
        .positive('Un nombre valide est attendu')
        .typeError('Un nombre valide est attendu'),
    bathrooms: yup
        .number()
        .required('Le nombre de salles de bains voulu est attendu')
        .positive('Un nombre valide est attendu')
        .typeError('Un nombre valide est attendu'),
    energyClass: yup
        .mixed<EnergyClass>()
        .required('La classe énergétique est attendue'),
    balcony: yup.boolean(),
    fittedKitchen: yup.boolean(),
    city: yup
        .string()
        // Maybe add a oneOf here ?
        .required('La ville souhaitée est attendue')
        .typeError("Assurez-vous d'écrire un nom de ville valide"),
    cityDistanceKm: yup
        .number()
        .required('La distance acceptable par rapport à la ville est attendue')
        .positive('Un nombre valide est attendu')
        .typeError('Un nombre valide est attendu'),
});

const priceRangeLabels = {
    [PriceRange.LOW]: 'Petit budget (moins de 100 000€)',
    [PriceRange.MEDIUM]: 'Budget moyen (entre 100 000€ et 250 000€)',
    [PriceRange.NORMAL]: 'Budget normal (entre 250 000€ et 500 000€)',
    [PriceRange.RICH]: 'Haut budget (entre 500 000€ et 1 000 000€)',
    [PriceRange.VERY_RICH]: 'Très haut budget (plus de 1 000 000€)',
};

const energyClassMarks = [
    { value: EnergyClass.E, label: 'E' },
    { value: EnergyClass.D, label: 'D' },
    { value: EnergyClass.C, label: 'C' },
    { value: EnergyClass.B, label: 'B' },
    { value: EnergyClass.A, label: 'A' },
];

function BasicInfoForm() {
    const [priceRangeField, priceRangeMeta] = useField('priceRange');
    const [houseAreaField, houseAreaMeta] = useField('houseAreaSqrtM');
    const [roomsField, roomsMeta] = useField('rooms');
    const [bedroomsField, bedroomsMeta] = useField('bedrooms');
    const [bathroomsField, bathroomsMeta] = useField('bathrooms');
    const [energyClassField] = useField('energyClass');
    const [balconyField] = useField('balcony');
    const [fittedKitchenField] = useField('fittedKitchen');
    const [cityField, cityMeta, cityHelpers] = useField('city');
    const [cityDistanceField] = useField('cityDistanceKm');

    return (
        <FormControl
            component="fieldset"
            sx={{
                height: '60vh',
                overflowY: 'auto',
                width: '100%',
                maxWidth: '900px',
                padding: '1em',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
            }}
        >
            {/* Price range */}
            <TextField
                select
                label="Budget"
                variant="outlined"
                {...priceRangeField}
                error={priceRangeMeta.touched && Boolean(priceRangeMeta.error)}
                helperText={priceRangeMeta.touched && priceRangeMeta.error}
            >
                {Object.entries(priceRangeLabels).map(([range, label]) => (
                    <MenuItem key={range} value={range}>
                        {label}
                    </MenuItem>
                ))}
            </TextField>
            {/* Position */}
            <Grid container spacing="2em">
                <Grid item xs={12} md={6}>
                    <Autocomplete
                        filterOptions={createFilterOptions({
                            limit: 15,
                        })}
                        {...cityField}
                        options={cities.map((c) => `${c.nom} (${c.postal})`)}
                        onChange={(e, value) => cityHelpers.setValue(value)}
                        includeInputInList
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                error={
                                    cityMeta.touched && Boolean(cityMeta.error)
                                }
                                helperText={cityMeta.touched && cityMeta.error}
                                label="Ville"
                                variant="outlined"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography gutterBottom>Éloignement acceptable</Typography>
                    {/* Position with slider or input field */}
                    <Grid container spacing="2em" alignItems="center">
                        <Grid item xs={9}>
                            <Slider
                                size="medium"
                                {...cityDistanceField}
                                min={0}
                                max={500}
                                step={10}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Typography>
                                {cityDistanceField.value} km
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing="2em">
                {/* Wanted size and number of rooms */}
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        type="number"
                        InputProps={{
                            inputProps: {
                                min: 5,
                                max: 2000,
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    m²
                                </InputAdornment>
                            ),
                        }}
                        label="Surface idéale"
                        variant="outlined"
                        {...houseAreaField}
                        error={
                            houseAreaMeta.touched &&
                            Boolean(houseAreaMeta.error)
                        }
                        helperText={
                            houseAreaMeta.touched && houseAreaMeta.error
                        }
                    ></TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        type="number"
                        InputProps={{
                            inputProps: {
                                min: 1,
                                max: 500,
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    pièces
                                </InputAdornment>
                            ),
                        }}
                        label="Nombre de pièces"
                        variant="outlined"
                        {...roomsField}
                        error={roomsMeta.touched && Boolean(roomsMeta.error)}
                        helperText={roomsMeta.touched && roomsMeta.error}
                    ></TextField>
                </Grid>
                {/* number of bedrooms / bathrooms */}
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        type="number"
                        InputProps={{
                            inputProps: {
                                min: 1,
                                max: 500,
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    m²
                                </InputAdornment>
                            ),
                        }}
                        label="Nombre de chambres"
                        variant="outlined"
                        {...bedroomsField}
                        error={
                            bedroomsMeta.touched && Boolean(bedroomsMeta.error)
                        }
                        helperText={bedroomsMeta.touched && bedroomsMeta.error}
                    ></TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        type="number"
                        InputProps={{
                            inputProps: {
                                min: 1,
                                max: 500,
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    pièces
                                </InputAdornment>
                            ),
                        }}
                        label="Nombre de salles de bain"
                        variant="outlined"
                        {...bathroomsField}
                        error={
                            bathroomsMeta.touched &&
                            Boolean(bathroomsMeta.error)
                        }
                        helperText={
                            bathroomsMeta.touched && bathroomsMeta.error
                        }
                    ></TextField>
                </Grid>
            </Grid>
            <Grid container spacing="2em">
                {/* Energy class */}
                <Grid item xs={12} md={6}>
                    <Typography gutterBottom>
                        Classe énergétique minimale
                    </Typography>
                    <Slider
                        size="medium"
                        {...energyClassField}
                        min={1}
                        max={energyClassMarks.length}
                        marks={energyClassMarks}
                        step={1}
                    />
                </Grid>
                {/* Balcony and fitted kitchen */}
                <Grid item xs={12} md={6}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch />}
                            label="Balcon"
                            labelPlacement="start"
                            checked={balconyField.value}
                            {...balconyField}
                        />
                        <FormControlLabel
                            control={<Switch />}
                            label="Cuisine équipée"
                            labelPlacement="start"
                            checked={fittedKitchenField.value}
                            {...fittedKitchenField}
                        />
                    </FormGroup>
                </Grid>
            </Grid>
        </FormControl>
    );
}

export default BasicInfoForm;
