import AccountIcon from '@mui/icons-material/AccountCircle';
import { CircularProgress } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../../app/features/authentication/authenticationSlice';
import { persistor, useAppDispatch } from '../../app/store';
import GLOBALS from '../../globals';
import { User } from '../../types/user';
import { delay } from '../../utils/TimeUtils';

export interface UserMenuProps {
    user: User;
}

// User-relative section
function UserMenu({ user }: UserMenuProps) {
    // Hook for menu management
    const [anchorElement, setAnchor] = React.useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorElement);
    const closeMenu = () => setAnchor(null);

    // Handle logout action
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isLogoutPending, setLogoutPending] = useState(false);

    const handleLogout = () => {
        closeMenu();
        dispatch(logout());
        navigate(GLOBALS.routes.home(), { replace: true });
        // Set a little timeout for handling logout event
        toast.success('Déconnecté avec succès, redirection...', {
            position: 'bottom-center',
        });

        // Add a small foreground loading for user experience
        setLogoutPending(true);
        delay(1000)
            // To be sure that redux-persist correctly store the change, flush it
            .then(persistor.flush)
            .then(() => {
                setLogoutPending(false);
                navigate(0);
            });
    };

    return (
        <>
            <Backdrop open={isLogoutPending}>
                <CircularProgress />
            </Backdrop>
            {/* The "open menu" button */}
            <IconButton
                color="inherit"
                id="user-menu-button"
                aria-haspopup="true"
                aria-expanded={isMenuOpen ? 'true' : undefined}
                onClick={(e) => setAnchor(e?.currentTarget)}
                size="large"
            >
                <AccountIcon fontSize="large" />
            </IconButton>
            {/* The associated menu */}
            <Menu
                anchorEl={anchorElement}
                open={isMenuOpen}
                onClose={closeMenu}
            >
                {user.name}
                <MenuItem
                    LinkComponent={Link}
                    href={GLOBALS.routes.userProfile(user.id)}
                >
                    Profil
                </MenuItem>
                {/* If admin, we want an extra menu */}
                {user.role === 'ADMIN' && (
                    <MenuItem
                        LinkComponent={Link}
                        href={GLOBALS.routes.adminDashboard()}
                    >
                        Tableau de bord
                    </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>Deconnexion</MenuItem>
            </Menu>
        </>
    );
}

export default UserMenu;
