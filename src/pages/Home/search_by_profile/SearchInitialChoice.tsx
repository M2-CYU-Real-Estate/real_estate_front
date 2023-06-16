import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import {
    Avatar,
    Box,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    ListSubheader,
    Typography,
} from '@mui/material';
import { mockProfiles } from '../../../api/mocks/mockProfiles';
import { UserProfile, UserProfiles } from '../../../types/user';
import GLOBALS from '../../../globals';
import { useUserProfilesQuery } from '../../../api/user/userApi';

interface InitialChoiceProps {
    goToResults: () => void;
    setProfileChosen: (profileId: number) => void;
}

function SearchInitialChoice({
    goToResults,
    setProfileChosen,
}: InitialChoiceProps) {
    // const profiles = mockProfiles;
    const { data: profiles, isLoading, isError } = useUserProfilesQuery();

    // When user click on one of the profiles, the state must be changed in order to launch the search
    const onProfileChoice = (profile: UserProfiles) => () => {
        setProfileChosen(profile.id);
        goToResults();
    };

    // TODO: go to profile creation
    const goToProfileCreation = () => {
        window.alert('Go to profile creation !');
    };
    // TODO: go to profile update
    const goToProfileUpdate = (profileId: number) => () => {
        window.alert(`Go to profile update on id ${profileId} !`);
    };

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
                <Box
                    style={{
                        maxHeight: '80%',
                        overflowY: 'auto',
                    }}
                >
                    <List
                        sx={{ width: '100%', maxWidth: '480px' }}
                        subheader={
                            <ListSubheader component="div">Choix du profil</ListSubheader>
                        }
                    >
                        {profiles?.map((profile) => (
                            <ListItem
                                key={profile.id}
                                disablePadding
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        onClick={goToProfileUpdate(profile.id)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemButton onClick={onProfileChoice(profile)}>
                                    <ListItemAvatar>
                                        <Avatar
                                            sx={{
                                                bgcolor: 'primary',
                                                color: 'primary.light',
                                            }}
                                        >
                                            <PersonIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primaryTypographyProps={{
                                            sx: {
                                                wordWrap: 'break-word',
                                            },
                                        }}
                                    >
                                        {profile.name}
                                        {/* If it's the main account, say it ! */}
                                        {profile.isMainProfile && (
                                            <Typography variant="caption" fontStyle="italic">
                                                {' (Principal)'}
                                            </Typography>
                                        )}
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))}
                        {/* Last button for adding a profile */}
                        <ListItem key={-1} disableGutters>
                            <ListItemButton href={GLOBALS.routes.userNewProfile()}>
                                <ListItemAvatar>
                                    <Avatar
                                        sx={{
                                            bgcolor: 'primary.main',
                                            color: 'primary.light',
                                        }}
                                    >
                                        <AddIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText>Créer un nouveau profil</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Box>
        </>
    );
}

export default SearchInitialChoice;
