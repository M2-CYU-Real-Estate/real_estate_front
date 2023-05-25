import { Box, FormControl } from '@mui/material';
import { useState } from 'react';
import Header from '../../components/Header';
import PresetIdChoice from './FormComponents/PresetIdChoice';
import MultiStepForm, { FormStep } from './MultiStepForm';
import { profiles } from './model';
import BasicInfoForm, {
    basicInfoValidationSchema,
} from './FormComponents/BasicInfoForm';
import NeedsForm from './FormComponents/NeedsForm';

function NewProfile() {
    // const [initialValues, setInitialValues] = useState(
    //     profiles[0].initialValues
    // );

    const defaultPreset = profiles[0].initialValues;

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
                initialValues={defaultPreset}
                onSubmit={async (values) => {
                    window.alert(values);
                }}
            >
                {/* The onSubmit functions are handled only in this component, 
                as the MultiStepForm relies on direct children only */}
                <FormStep
                    stepName="Choix du préréglage initial"
                    onSubmit={(values, actions) => {
                        // Depending on the chosen radio, we want to reset the initial values
                        const presetId = values.presetId;
                        // Reset all values for the ones stored in chosen preset
                        actions.setValues(profiles[presetId].initialValues);
                    }}
                >
                    <PresetIdChoice />
                </FormStep>
                <FormStep
                    stepName="Informations basiques"
                    validationSchema={basicInfoValidationSchema}
                    onSubmit={(values, actions) => {
                        window.alert(JSON.stringify(values));
                    }}
                >
                    <BasicInfoForm />
                </FormStep>
                <FormStep stepName="Besoins et priorités">
                    <NeedsForm />
                </FormStep>
                {/* TODO : summary step */}
            </MultiStepForm>
        </Box>
    );
}

export default NewProfile;
