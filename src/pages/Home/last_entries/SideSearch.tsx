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
} from '@mui/material';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import InfoIcon from '@mui/icons-material/Info';
import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { Colors } from 'chart.js';
import CloseIcon from '@mui/icons-material/Close';
import {
    energyClassLabels,
    priceRangeLabels,
} from '../../NewProfile/FormComponents/textMappings';

import { EnergyClass } from '../../../api/mocks/mockProfiles';
import HomeIcon from '@mui/icons-material/Home';

const energyClassMarks = [
    { value: EnergyClass.E, label: energyClassLabels[EnergyClass.E] },
    { value: EnergyClass.D, label: energyClassLabels[EnergyClass.D] },
    { value: EnergyClass.C, label: energyClassLabels[EnergyClass.C] },
    { value: EnergyClass.B, label: energyClassLabels[EnergyClass.B] },
    { value: EnergyClass.A, label: energyClassLabels[EnergyClass.A] },
];
function SideSearch() {
    return (
        <Box
            sx={{
                width: '30vw',
                maxWidth: '560px',
                height: '100vw',
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
                            <TextField
                                fullWidth
                                type="string"
                                variant="outlined"
                                name="roomsField"
                                margin="normal"
                                InputProps={{
                                    endAdornment: <HomeIcon />,
                                }}
                                autoFocus
                            ></TextField>
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
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel
                                        value="female"
                                        control={<Radio />}
                                        label="Maison"
                                    />
                                    <FormControlLabel
                                        value="male"
                                        control={<Radio />}
                                        label="Appartement"
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
                                variant="outlined"
                                name="bathroomsField"
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
                                variant="outlined"
                                name="bathroomsField"
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
                                variant="outlined"
                                name="bathroomsField"
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
                                variant="outlined"
                                name="bathroomsField"
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
                                variant="outlined"
                                name="bathroomsField"
                                margin="normal"
                                autoFocus
                            ></TextField>
                        </Grid>
                        <Grid item lg={6}>
                            <FormLabel id="demo-radio-buttons-group-label">
                                {' '}
                Nombre de salle de bains
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
                                variant="outlined"
                                name="bathroomsField"
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
                                    control={<Switch name="balconyField" />}
                                    label="Cuisine équipée"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    control={<Switch name="balconyField" />}
                                    label="Balcon"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    control={<Switch name="balconyField" />}
                                    label="Asecenseur"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    control={<Switch name="balconyField" />}
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
export default SideSearch;
