import InfoIcon from '@mui/icons-material/Info';
import {
    Box,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Tooltip,
    Typography,
} from '@mui/material';
import { useField } from 'formik';
import React from 'react';
import { BaseProfile, profiles } from '../model';

function PresetIdChoice() {
    const [field] = useField('presetId');

    return (
        <RadioGroup
            sx={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
            }}
            defaultValue={0}
            {...field}
        >
            {/* Center the radio elements if thay are small enough */}
            <Box
                display="flex"
                height="100%"
                flexDirection="row"
                justifyContent="center"
                sx={{ overflowY: 'auto' }}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                >
                    <FormLabel sx={{ color: 'primary.main' }}>
                        Préréglages{' '}
                        <Tooltip title="Ce choix permettra de définir des valeurs par défaut dans les champs des prochaines étapes">
                            <InfoIcon />
                        </Tooltip>
                    </FormLabel>
                    {profiles.map((profile, index) => (
                        <ProfileRadio
                            key={index}
                            index={index}
                            profile={profile}
                        />
                    ))}
                </Box>
            </Box>
        </RadioGroup>
    );
}

interface ProfileRadioProps {
    index: number;
    profile: BaseProfile;
}

/**
 * One radio element describing a profile
 */
function ProfileRadio({ profile, index }: ProfileRadioProps): JSX.Element {
    return (
        <Tooltip
            title={
                <>
                    <Typography variant="h5">{profile.title}</Typography>
                    <Typography variant="body1">
                        {profile.description}
                    </Typography>
                </>
            }
            placement="left"
        >
            <FormControlLabel
                value={index}
                control={<Radio />}
                label={profile.title}
            />
        </Tooltip>
    );
}

export default PresetIdChoice;
