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
import SummaryStep from './FormComponents/SummaryStep';
import { useCreateProfileMutation } from '../../api/user/userApi';
import { toast } from 'react-toastify';
import GLOBALS from '../../globals';
import { useNavigate } from 'react-router-dom';

function NewProfile() {
    const defaultPreset = profiles[0].initialValues;
    const [createProfile, { isLoading, error }] = useCreateProfileMutation();
    const navigate = useNavigate();

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
                    const valuesParam = {
                        minEnergyClass: values.energyClass,
                        budgetClass: values.priceRange,
                        acceptableDistance: values.cityDistanceKm,
                        postalCode: values.city.match(/(\d{5})/)[0],
                        name: values.name,
                        houseArea: values.houseAreaSqrtM,
                        rooms: values.rooms,
                        bedrooms: values.bedrooms,
                        balcony: values.balcony,
                        fittedKitchen: values.fittedKitchen,
                        bathrooms: values.bathrooms,
                        scoreSecurity: values.securityScore,
                        scoreEducation: values.educationScore,
                        scoreHobbies: values.hobbiesScore,
                        scoreEnvironment: values.environmentScore,
                        scorePracticality: values.practicalityScore,
                    };
                    // TODO api call for register profile !
                    createProfile(valuesParam)
                        .unwrap()
                        .then(() => {
                            toast.success(`Vous avez créé un nouveau profil !`, {
                                position: 'bottom-center',
                            });
                            navigate(GLOBALS.routes.userDashboard('profiles'));
                        });
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
                >
                    <BasicInfoForm />
                </FormStep>
                <FormStep stepName="Besoins et priorités">
                    <NeedsForm />
                </FormStep>
                <FormStep stepName="Résumé">
                    <SummaryStep />
                </FormStep>
            </MultiStepForm>
        </Box>
    );
}

export default NewProfile;
