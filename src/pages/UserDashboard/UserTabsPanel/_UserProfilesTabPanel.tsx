import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
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
    Zoom,
} from '@mui/material';
import { mockProfiles } from '../../../api/mocks/mockProfiles';
import GLOBALS from '../../../globals';

function UserProfilesTabPanel() {
    // TODO: API call
    const profiles = mockProfiles;

    const nbProfiles = profiles.length;

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
                        {profiles.map((profile) => (
                            <ListItem
                                key={profile.id}
                                disablePadding
                                secondaryAction={
                                    // TODO add icon (set as principal)
                                    <>
                                        {/* If the profile is not the main profile, show the button to switch */}
                                        {!profile.isMainProfile && (
                                            <Tooltip
                                                placement="left"
                                                title={`Faire de "${profile.name}" le profil principal`}
                                            >
                                                <IconButton
                                                    edge="start"
                                                    // TODO confirmation popup > API call > reload page
                                                    // onClick={goToProfileUpdate(profile.id)}
                                                >
                                                    <PrincipalIcon />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                        <Tooltip
                                            placement="left"
                                            title={`Supprime le profil "${profile.name}"`}
                                        >
                                            <IconButton
                                                edge="end"
                                                // TODO confirmation popup > API call > reload page
                                                // onClick={goToProfileUpdate(profile.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </>
                                }
                            >
                                <ListItemButton
                                    href={GLOBALS.routes.userProfile(
                                        profile.id.toString()
                                    )}
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
                        {/* Last button for adding a profile */}
                        <ListItem key={-1} disableGutters>
                            <ListItemButton
                            // onClick={goToProfileCreation}
                            >
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
                                <ListItemText>
                                    Créer un nouveau profil
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Box>
        </>
    );
}

export default UserProfilesTabPanel;
