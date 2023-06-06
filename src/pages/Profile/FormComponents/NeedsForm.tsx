import { Box, FormControl, Grid, Rating, Typography } from '@mui/material';
import { FieldInputProps, useField } from 'formik';

function NeedsForm() {
    const [securityField] = useField<number>('securityScore');
    const [educationField] = useField<number>('educationScore');
    const [hobbiesField] = useField<number>('hobbiesScore');
    const [environmentField] = useField<number>('environmentScore');
    const [practicalityField] = useField<number>('practicalityScore');

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
            <Box>
                <Typography textAlign="center">
          Cette étape vise à déterminer vos priorités résidentielles :
          recherchez-vous plus des villes écologiques ou celles qui sont plus
          vivantes ?
                </Typography>
                <Typography textAlign="center">
                    {
                        "Il ne sera pas possible d'avoir un bien présent dans une ville parfaite !"
                    }
                </Typography>
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-evenly"
                padding="2em"
                paddingTop="4em"
            >
                <Grid container>
                    <Grid item xs={6}>
                        <QualityRating label="Sécurité" fieldProps={securityField} />
                    </Grid>
                    <Grid item xs={6}>
                        <QualityRating label="Éducation" fieldProps={educationField} />
                    </Grid>
                    <Grid item xs={6}>
                        <QualityRating
                            label="Sports et loisirs"
                            fieldProps={hobbiesField}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <QualityRating
                            label="Environnement"
                            fieldProps={environmentField}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <QualityRating
                            label="Vie pratique"
                            fieldProps={practicalityField}
                        />
                    </Grid>
                </Grid>
            </Box>
        </FormControl>
    );
}

interface QualityRatingProps {
    label: string;
    fieldProps: FieldInputProps<number>;
}

function QualityRating({ label, fieldProps }: QualityRatingProps) {
    return (
        <Box padding="1em">
            <Typography gutterBottom textAlign="center">
                {label}
            </Typography>
            <Box display="flex" justifyContent="center">
                <Rating size="large" {...fieldProps} precision={0.5} />
            </Box>
        </Box>
    );
}

export default NeedsForm;
