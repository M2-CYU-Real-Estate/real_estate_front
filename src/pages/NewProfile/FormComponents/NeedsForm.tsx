import { Box, FormControl, Slider, Typography } from '@mui/material';
import { FieldInputProps, useField } from 'formik';

const gradientStyle = {
    '& .MuiSlider-track': {
        backgroundImage: 'linear-gradient(.25turn, #f00, #0f0)',
    },
    '& .MuiSlider-rail': {
        backgroundImage: 'linear-gradient(.25turn, #f00, #0f0)',
    },
};

const marks = Array.from({ length: 5 }).map((v, i) => ({
    value: i + 1,
    label: (i + 1).toString(),
}));

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
                    recherchez-vous plus des villes écologiques ou celles qui
                    sont plus vivantes ?
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
            >
                <QualitySlider label="Sécurité" fieldProps={securityField} />
                <QualitySlider label="Éducation" fieldProps={educationField} />
                <QualitySlider
                    label="Sports et loisirs"
                    fieldProps={hobbiesField}
                />
                <QualitySlider
                    label="Environnement"
                    fieldProps={environmentField}
                />
                <QualitySlider
                    label="Vie pratique"
                    fieldProps={practicalityField}
                />
            </Box>
        </FormControl>
    );
}

interface QualitySliderProps {
    label: string;
    fieldProps: FieldInputProps<number>;
}

function QualitySlider({ label, fieldProps }: QualitySliderProps) {
    return (
        <Box padding="1em">
            <Typography gutterBottom>{label}</Typography>
            <Slider
                size="medium"
                {...fieldProps}
                min={1}
                max={5}
                marks={marks}
                step={1}
                sx={{ ...gradientStyle }}
            />
        </Box>
    );
}

export default NeedsForm;
