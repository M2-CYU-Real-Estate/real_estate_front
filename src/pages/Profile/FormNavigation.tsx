import { Box, Button } from '@mui/material';
import { FormikValues } from 'formik';

interface FormNavigationProps {
    hasPrevious: boolean;
    onBackClick: (values: FormikValues) => void;
    isLastStep: boolean;
}

function FormNavigation({
    hasPrevious,
    onBackClick,
    isLastStep,
}: FormNavigationProps) {
    return (
        <Box display="flex" justifyContent="space-between" mt="1em">
            {hasPrevious && (
                <Button variant="contained" onClick={onBackClick}>
          Retour
                </Button>
            )}
            <Button
                type="submit"
                variant="contained"
                sx={{
                    marginLeft: 'auto',
                }}
            >
                {isLastStep ? 'Valider' : 'Suivant'}
            </Button>
        </Box>
    );
}

export default FormNavigation;
