import { Box } from '@mui/material';
import Header from '../../components/Header';
import MultiStepForm, { FormStep } from './MultiStepForm';

const STEP_NAMES = [
    'Choix du profil de base',
    'Informations basiques',
    'Besoins et priorités',
];

function NewProfile() {
    return (
        <Box
            display="flex"
            alignItems="stretch"
            flexDirection="column"
            height="100vh"
        >
            <Header />
            {/* Display steps */}
            <MultiStepForm
                initialValues={{}}
                onSubmit={async (values) => {
                    window.alert(values);
                }}
            >
                <FormStep stepName="Choix du profil de base">TODO</FormStep>
                <FormStep stepName="Informations basiques"></FormStep>
                <FormStep stepName="Besoins et priorités"></FormStep>
            </MultiStepForm>
        </Box>
    );
}

export default NewProfile;
