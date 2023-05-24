import { Box, FormControl } from '@mui/material';
import { useState } from 'react';
import Header from '../../components/Header';
import PresetIdChoice from './FormComponents/PresetIdChoice';
import MultiStepForm, { FormStep } from './MultiStepForm';
import { profiles } from './model';

function NewProfile() {
    const [initialValues, setInitialValues] = useState(
        profiles[0].initialValues
    );

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
                initialValues={{ ...initialValues, presetId: 0 }}
                onSubmit={async (values) => {
                    window.alert(values);
                }}
            >
                {/* https://github.com/Ebazhanov/multi-steps-form-formik-mui/tree/main */}
                <FormStep
                    stepName="Choix du préréglage initial"
                    onSubmit={(v, a) => {
                        // Depending on the chosen radio, we want to reset the initial values
                        const presetId = v.presetId;
                        window.alert(JSON.stringify(v));
                        setInitialValues(profiles[presetId].initialValues);
                    }}
                >
                    <FormControl component="fieldset" sx={{ height: '100%' }}>
                        <PresetIdChoice />
                    </FormControl>
                </FormStep>
                <FormStep stepName="Informations basiques">
                    <div>coucou</div>
                </FormStep>
                <FormStep stepName="Besoins et priorités">
                    <div>besoins</div>
                </FormStep>
            </MultiStepForm>
        </Box>
    );
}

export default NewProfile;
