import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import PrincipalIcon from '@mui/icons-material/SwitchAccount';
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
    Tooltip,
    Typography,
} from '@mui/material';
import { mockProfiles } from '../../../api/mocks/mockProfiles';
import GLOBALS from '../../../globals';
import ConfirmDialog from '../../../components/Dialogs/ConfirmDialog';
import { useState } from 'react';
import {
    useDeleteProfileMutation,
    useUserProfilesQuery,
} from '../../../api/user/userApi';
import { toast } from 'react-toastify';

interface SelectedProfile {
    id: number;
    name: string;
}

function UserProfilesTabPanel() {
    // Permits to display on dialogs the selected profile
    const [selectedProfile, setSelectedProfile] = useState<SelectedProfile>({
        id: -1,
        name: '.',
    });
    // maybe select by id, or a state object....
    const [isPrincipalDialogOpen, setPrincipalDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // TODO: complete "on principal switch" function
    const switchPrincipal = () => {
        window.alert(`Switch to profile ${selectedProfile}`);
    };

    // TODO: API call
    // const profiles = mockProfiles;

    const { data: userProfiles, isLoading, isError } = useUserProfilesQuery();

    const nbProfiles = userProfiles?.length;

    const [deleteYourProfile] = useDeleteProfileMutation();
    // TODO: complete "on delete" function
    const deleteProfile = () => {
        deleteYourProfile(selectedProfile.id).then(() => {
            toast.success(`Vous avez ce profil!`, {
                position: 'bottom-center',
            });
        });
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
                <Box width="100%" maxHeight="80vh" sx={{ overflowY: 'auto' }}>
                    <List
                        sx={{ width: '100%' }}
                        subheader={
                            <ListSubheader component="p">
                                {nbProfiles} profils disponibles
                            </ListSubheader>
                        }
                    >
                        {userProfiles?.map((profile) => (
                            <ListItem
                                key={profile.id}
                                disablePadding
                                secondaryAction={
                                    <>
                                        {/* If the profile is not the main profile, show the button to switch */}
                                        {!profile.isMainProfile && (
                                            <>
                                                <Tooltip
                                                    placement="left"
                                                    title={`Faire de "${profile.name}" le profil principal`}
                                                >
                                                    <IconButton
                                                        edge="start"
                                                        // TODO confirmation popup > API call > reload page
                                                        onClick={() => {
                                                            setPrincipalDialogOpen(true);
                                                            setSelectedProfile(profile);
                                                        }}
                                                    >
                                                        <PrincipalIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip
                                                    placement="left"
                                                    title={`Supprime le profil "${profile.name}"`}
                                                >
                                                    <IconButton
                                                        edge="end"
                                                        // TODO confirmation popup > API call > reload page
                                                        onClick={() => {
                                                            setDeleteDialogOpen(true);
                                                            setSelectedProfile(profile);
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </>
                                        )}
                                    </>
                                }
                            >
                                <ListItemButton
                                    href={GLOBALS.routes.userProfile(profile.id.toString())}
                                >
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
                                                marginRight: '3em',
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
            {/* DIALOGS */}
            {/* TODO add both dialogs (set principal & delete) */}
            <ConfirmDialog
                title="Choisir comme profil principal ?"
                isOpen={isPrincipalDialogOpen}
                setOpen={setPrincipalDialogOpen}
                onConfirm={switchPrincipal}
            >
                <p>
                    {`Voulez-vous vraiment choisir le profil "${selectedProfile.name}" comme profil principal ?`}
                </p>
            </ConfirmDialog>
            <ConfirmDialog
                title="Supprimer le profil"
                isOpen={isDeleteDialogOpen}
                setOpen={setDeleteDialogOpen}
                onConfirm={deleteProfile}
            >
                <p>
                    {`Voulez-vous vraiment supprimer le profil "${selectedProfile.name}" ? Cette action sera définitive.`}
                </p>
            </ConfirmDialog>
        </>
    );
}

export default UserProfilesTabPanel;
