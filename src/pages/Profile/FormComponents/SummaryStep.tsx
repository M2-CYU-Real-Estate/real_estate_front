import { Box, FormControl, Rating, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import { FormValues } from '../model';
import { energyClassLabels, priceRangeLabels } from './textMappings';

function SummaryStep() {
    const { values } = useFormikContext();
    const formValues = values as FormValues;

    const {
        priceRange,
        houseAreaSqrtM,
        rooms,
        bedrooms,
        bathrooms,
        energyClass,
        balcony,
        fittedKitchen,
        city,
        cityDistanceKm,
        securityScore,
        educationScore,
        hobbiesScore,
        environmentScore,
        practicalityScore,
    } = formValues;

    const basicInfos = {
        'Gamme de prix': priceRangeLabels[priceRange],
        'Ville idéale': city,
        'Éloignement acceptable': `${cityDistanceKm}km`,
        'Surface voulue': houseAreaSqrtM,
        'Nombre de pièces': rooms,
        'Nombre de chambres': bedrooms,
        'Nombre de salles de bains': bathrooms,
        'Balcon ?': boolToText(balcony),
        'Cuisine équipée ?': boolToText(fittedKitchen),
        'Classe énergétique minimale': energyClassLabels[energyClass],
    };

    const scores = {
        ' Sécurité': securityScore,
        ' Éducation': educationScore,
        ' Sports et loisirs': hobbiesScore,
        ' Environnement': environmentScore,
        ' Vie pratique': practicalityScore,
    };

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
                justifyContent: 'space-between',
            }}
        >
            <Typography variant="h5" color="primary" textAlign="center">
        Résumé des informations du profil :
            </Typography>
            <Box>
                {Object.entries(basicInfos).map(([label, value]) => (
                    <Box key={label} sx={{ mb: '0.5em' }}>
                        <Typography display="inline" color="primary">
                            {label} :{' '}
                        </Typography>
                        <Typography display="inline">{value}</Typography>
                    </Box>
                ))}
            </Box>
            <Box id="scores" display="flex" justifyContent="center">
                <Box>
                    {Object.entries(scores).map(([label, score]) => (
                        <Box key={label}>
                            <Typography component="legend">{label}</Typography>
                            <Rating value={score} readOnly />
                        </Box>
                    ))}
                </Box>
            </Box>
        </FormControl>
    );
}

function boolToText(b: boolean): string {
    return b ? 'Oui' : 'Non';
}

export default SummaryStep;
