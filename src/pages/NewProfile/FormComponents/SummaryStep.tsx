import { Box, FormControl, Slider, Typography } from '@mui/material';
import { FieldInputProps, useField } from 'formik';

function SummaryStep() {
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
            {/* TODO show summary */}
        </FormControl>
    );
}

export default SummaryStep;
