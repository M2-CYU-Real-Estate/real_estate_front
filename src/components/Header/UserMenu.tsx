import AccountIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../app/features/authentication/authenticationSlice';
import { useAppDispatch } from '../../app/store';
import GLOBALS from '../../globals';
import { User } from '../../types/user';

export interface UserMenuProps {
    user: User;
}

// User-relative section
function UserMenu({ user }: UserMenuProps) {
    // Handle logout action
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(logout());
        navigate(GLOBALS.routes.home(), { replace: true });
        window.location.reload();
    };

    // Hook for menu management
    const [anchorElement, setAnchor] = React.useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorElement);
    const closeMenu = () => setAnchor(null);
    return (
        <>
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
                <MenuItem onClick={handleLogout}>Deconnection</MenuItem>
            </Menu>
        </>
    );
}

export default UserMenu;
