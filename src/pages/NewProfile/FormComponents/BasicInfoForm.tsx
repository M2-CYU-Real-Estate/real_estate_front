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
import { energyClassLabels, priceRangeLabels } from './textMappings';

const energyClassMarks = [
    { value: EnergyClass.E, label: energyClassLabels[EnergyClass.E] },
    { value: EnergyClass.D, label: energyClassLabels[EnergyClass.D] },
    { value: EnergyClass.C, label: energyClassLabels[EnergyClass.C] },
    { value: EnergyClass.B, label: energyClassLabels[EnergyClass.B] },
    { value: EnergyClass.A, label: energyClassLabels[EnergyClass.A] },
];

export const basicInfoValidationSchema = yup.object({
    name: yup
        .string()
        .required('Ajouter un nom')
        .typeError("Assurez-vous d'écrire un nom de profil"),
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
    const [nameField, nameMeta, nameHelpers] = useField('name');
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
            <Grid container spacing="2em">
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        type="string"
                        label="Nom du profil"
                        variant="outlined"
                        {...nameField}
                        error={nameMeta.touched && Boolean(nameMeta.error)}
                        helperText={nameMeta.touched && nameMeta.error}
                    ></TextField>
                </Grid>
                <Grid item xs={12} md={6}>
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
                </Grid>
            </Grid>

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
                                error={cityMeta.touched && Boolean(cityMeta.error)}
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
                            <Typography>{cityDistanceField.value} km</Typography>
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
                            endAdornment: <InputAdornment position="end">m²</InputAdornment>,
                        }}
                        label="Surface idéale"
                        variant="outlined"
                        {...houseAreaField}
                        error={houseAreaMeta.touched && Boolean(houseAreaMeta.error)}
                        helperText={houseAreaMeta.touched && houseAreaMeta.error}
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
                                <InputAdornment position="end">pièces</InputAdornment>
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
                            endAdornment: <InputAdornment position="end">m²</InputAdornment>,
                        }}
                        label="Nombre de chambres"
                        variant="outlined"
                        {...bedroomsField}
                        error={bedroomsMeta.touched && Boolean(bedroomsMeta.error)}
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
                                <InputAdornment position="end">pièces</InputAdornment>
                            ),
                        }}
                        label="Nombre de salles de bain"
                        variant="outlined"
                        {...bathroomsField}
                        error={bathroomsMeta.touched && Boolean(bathroomsMeta.error)}
                        helperText={bathroomsMeta.touched && bathroomsMeta.error}
                    ></TextField>
                </Grid>
            </Grid>
            <Grid container spacing="2em">
                {/* Energy class */}
                <Grid item xs={12} md={6}>
                    <Typography gutterBottom>Classe énergétique minimale</Typography>
                    <Slider
                        size="medium"
                        {...energyClassField}
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
