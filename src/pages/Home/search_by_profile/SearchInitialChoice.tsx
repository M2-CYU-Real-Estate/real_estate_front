import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    List,
    ListItem,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import { mockProfiles } from '../../../api/mocks/mockProfiles';
import { UserProfile } from '../../../types/user';

interface InitialChoiceProps {
    goToProfileCreation: () => void;
    goToResults: () => void;
    setProfileChosen: (profileId: number) => void;
}

function SearchInitialChoice({
    goToProfileCreation,
    goToResults,
    setProfileChosen,
}: InitialChoiceProps) {
    const [isProfileDialogOpen, setProfileDialogOpen] = useState(false);
    const openDialog = () => setProfileDialogOpen(true);
    const closeDialog = () => setProfileDialogOpen(false);

    return (
        <>
            <Box
                width="100%"
                height="100%"
                mx="4"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <Button
                    variant="contained"
                    sx={{ my: '2em' }}
                    onClick={openDialog}
                >
                    Utiliser un profil créé
                </Button>
                <Button
                    variant="contained"
                    sx={{ my: '2em' }}
                    onClick={goToProfileCreation}
                >
                    {/* TODO: better to redirect to user profile ? */}
                    Créer un nouveau profil
                </Button>
            </Box>
            <ProfileChoiceDialog
                isOpened={isProfileDialogOpen}
                close={closeDialog}
                setProfileChosen={setProfileChosen}
                goToResults={goToResults}
            />
        </>
    );
}

interface ProfileChoiceDialogProps {
    isOpened: boolean;
    close: () => void;
    setProfileChosen: (profileId: number) => void;
    goToResults: () => void;
}

function ProfileChoiceDialog({
    isOpened,
    close,
    setProfileChosen,
    goToResults,
}: ProfileChoiceDialogProps) {
    // TODO api call for this
    const profiles = mockProfiles;

    // First, put the main one on top
    profiles.sort(
        (p1, p2) => Number(p2.isMainProfile) - Number(p1.isMainProfile)
    );

    // When user click on one of the profiles, the state must be changed in order to launch the search
    const onProfileChoice = (profile: UserProfile) => () => {
        setProfileChosen(profile.id);
        close();
        goToResults();
    };

    return (
        <Dialog open={isOpened} onClose={close}>
            <DialogTitle>Choix du profil</DialogTitle>
            <List>
                {profiles.map((profile) => (
                    <ListItem key={profile.id} disableGutters>
                        <ListItemButton onClick={onProfileChoice(profile)}>
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        bgcolor: 'primary.main',
                                        color: 'primary.light',
                                    }}
                                >
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText>
                                {profile.name}
                                {/* If it's the main account, say it ! */}
                                {profile.isMainProfile && (
                                    <Typography
                                        variant="caption"
                                        fontStyle="italic"
                                    >
                                        {' (Principal)'}
                                    </Typography>
                                )}
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

export default SearchInitialChoice;
