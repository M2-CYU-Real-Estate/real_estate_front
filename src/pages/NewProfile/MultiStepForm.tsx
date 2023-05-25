import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { Formik, FormikConfig, FormikHelpers, FormikValues } from 'formik';
import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import FormNavigation from './FormNavigation';

// Create a simplified wrapper for substeps
interface FormStepProps {
    stepName: string;
    children: JSX.Element;
    validationSchema?: any | (() => any);
    onSubmit?: (
        values: FormikValues,
        actions: FormikHelpers<FormikValues>
    ) => void;
}

export const FormStep = (props: FormStepProps) => props.children;

interface MultiStepFormProps extends FormikConfig<FormikValues> {
    children: JSX.Element[];
}

function MultiStepForm({
    children,
    initialValues,
    onSubmit,
}: MultiStepFormProps) {
    const [stepNumber, setStepNumber] = useState(0);

    const steps = React.Children.toArray(children) as React.ReactElement[];

    const [snapshot, setSnapshot] = useState(initialValues);

    const currentStep = steps[stepNumber];
    const currentStepProps = currentStep.props as FormStepProps;
    const numberSteps = steps.length;
    const isLastStep = stepNumber === numberSteps - 1;

    const nextStep = (values: FormikValues) => {
        setSnapshot(values);
        setStepNumber(stepNumber + 1);
    };

    const previousStep = (values: FormikValues) => {
        setSnapshot(values);
        setStepNumber(stepNumber - 1);
    };

    const handleSubmit = async (
        values: FormikValues,
        actions: FormikHelpers<FormikValues>
    ) => {
        if (currentStepProps.onSubmit) {
            await currentStepProps.onSubmit(values, actions);
        }

        if (isLastStep) {
            return onSubmit(values, actions);
        } else {
            actions.setTouched({});
            nextStep(values);
        }
    };

    return (
        <Formik
            enableReinitialize={true}
            initialValues={snapshot}
            onSubmit={handleSubmit}
            validationSchema={currentStepProps.validationSchema}
        >
            {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        padding="2em"
                        height="90vh"
                    >
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            flexDirection="column"
                            width="100vw"
                            maxWidth="860px"
                        >
                            <Box marginBottom="0">
                                <Typography
                                    textAlign="center"
                                    variant="h5"
                                    color="primary.main"
                                >
                                    Création du profil
                                </Typography>
                                <Stepper
                                    activeStep={stepNumber}
                                    orientation="horizontal"
                                    alternativeLabel
                                    sx={{
                                        marginBottom: '1em',
                                    }}
                                >
                                    {steps.map((step) => {
                                        const label = step.props.stepName;
                                        return (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        );
                                    })}
                                </Stepper>
                            </Box>
                            <Box>
                                <SwipeableViews index={stepNumber}>
                                    {steps.map((step, index) => (
                                        <Box
                                            key={index}
                                            display="flex"
                                            justifyContent="center"
                                        >
                                            {step}
                                        </Box>
                                    ))}
                                </SwipeableViews>
                            </Box>
                            <FormNavigation
                                isLastStep={isLastStep}
                                hasPrevious={stepNumber > 0}
                                onBackClick={() => previousStep(formik.values)}
                            />
                        </Box>
                    </Box>
                </form>
            )}
        </Formik>
    );
}

export default MultiStepForm;
