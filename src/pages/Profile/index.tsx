import { Box } from '@mui/material';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import Error404 from '../Error404';
import MultiStepForm, { FormStep } from '../Profile/MultiStepForm';
import BasicInfoForm, {
    basicInfoValidationSchema,
} from '../Profile/FormComponents/BasicInfoForm';

import { profiles } from '../Profile/model';
/**
 * The url parameters to fetch for the page
 */
type ProfileParams = {
    id: string;
};

function Profile() {
    // TODO: fetch the profile, should throw an error if the profile does not belong to the user

    const { id } = useParams<ProfileParams>();

    if (!id) {
        return <Error404 />;
    }
    const defaultPreset = profiles[1].initialValues;

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
                    // TODO api call for register profile !
                    window.alert(
                        `Here are the values registered : ${JSON.stringify(
                            values,
                            null,
                            2
                        )}`
                    );
                }}
            >
                {/* The onSubmit functions are handled only in this component, 
                as the MultiStepForm relies on direct children only */}
                <FormStep
                    stepName="Informations basiques"
                    validationSchema={basicInfoValidationSchema}
                >
                    <BasicInfoForm />
                </FormStep>
            </MultiStepForm>
        </Box>
    );
}

export default Profile;
