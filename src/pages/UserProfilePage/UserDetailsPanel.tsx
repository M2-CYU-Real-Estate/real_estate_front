import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Paper, Typography } from '@mui/material';
import { User } from '../../types/user';
import { toFrenchDate } from '../../utils/DateUtils';

interface UserDetailsProps {
    user: User;
}

/**
 * Side Panel displaying various statistics about the current user
 */
function UserDetailsPanel({ user }: UserDetailsProps) {
    return (
        <Paper elevation={7} sx={{ margin: '2em', mt: '3em' }}>
            <Box
                width="100%"
                display="flex"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
            >
                {/* Container used for changing the icon size dynamically (using font-size) */}
                <Box
                    color={'primary.main'}
                    fontSize={{ md: '5em', lg: '10em' }}
                    lineHeight="0"
                >
                    <AccountCircleIcon fontSize="inherit" />
                </Box>
                <Typography variant="h5" color="primary.main">
                    {user.name}
                </Typography>
            </Box>
            <Box
                mt="1em"
                p="0.5em"
                display="flex"
                gap="1em"
                flexDirection="column"
            >
                <Typography variant="body1">
                    Inscrit depuis le{' '}
                    {toFrenchDate(new Date(user.creationDate))}
                </Typography>
                <Typography variant="body1" fontStyle="italic">
                    {user.email}
                </Typography>
                <Typography>
                    {user.role == 'ADMIN' && 'Administrateur'}
                    {user.role == 'USER' && 'Utilisateur'}
                </Typography>
            </Box>
        </Paper>
    );
}

export default UserDetailsPanel;
