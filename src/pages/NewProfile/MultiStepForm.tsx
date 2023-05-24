import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { FormikConfig, FormikHelpers, FormikValues, useFormik } from 'formik';
import React, { useState } from 'react';
import FormNavigation from './FormNavigation';

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
        if (currentStep.props.onSubmit) {
            await currentStep.props.onSubmit;
        }

        if (isLastStep) {
            return onSubmit(values, actions);
        } else {
            actions.setTouched({});
            nextStep(values);
        }
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: snapshot,
        validationSchema: currentStep.props.validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box display="flex" justifyContent="center" padding="1em">
                <Box
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                >
                    <Typography>Création du profil</Typography>
                    <Stepper
                        activeStep={stepNumber}
                        orientation="horizontal"
                        alternativeLabel
                    >
                        {steps.map((currentStep) => {
                            const label = currentStep.props.stepName;
                            return (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {currentStep}
                    <FormNavigation
                        isLastStep={isLastStep}
                        hasPrevious={stepNumber > 0}
                        onBackClick={() => previousStep(formik.values)}
                    />
                </Box>
            </Box>
        </form>
    );
}

export default MultiStepForm;
export const FormStep = ({ stepName = '', children }: any) => children;
