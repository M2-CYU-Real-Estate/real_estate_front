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
                            <ListSubheader component="div">
                                {nbProfiles} profils disponibles
                            </ListSubheader>
                        }
                    >
                        {profiles.map((profile) => (
                            <ListItem
                                key={profile.id}
                                disablePadding
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        // onClick={goToProfileUpdate(profile.id)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemButton
                                // onClick={onProfileChoice(profile)}
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
