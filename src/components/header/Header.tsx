import React from "react";
import MainIcon from '@mui/icons-material/House';
import SellIcon from '@mui/icons-material/Sell';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import AccountIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import GLOBALS from "../../globals";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from "@mui/material/IconButton";

export default function Header() {

    // TODO fetch from API
    const loggedIn: boolean = true;

    // Information about navigtion buttons
    const pages: Array<PageInfo> = createPageInfo();

    return (
        <AppBar position="sticky" color="primary">
            <Toolbar >
                <Grid container alignItems="center" justifyContent="center" style={{ width: "100%" }}>
                    <Grid item md={4} justifyContent="left">
                        {/* Home button (link to home page) */}
                        <Typography variant="h4" color="inherit">
                            <Link
                                to={GLOBALS.routes.home()}
                                style={{ color: "#fff", textDecoration: "none" }}
                            >
                                <MainIcon /> Smart Real Estate
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid container item md={6} justifyContent="space-evenly">
                        {/* Navigation list */}
                        {pages.map(p => (
                            <Button
                                href={p.link}
                                key={p.key}
                                color="inherit"
                                startIcon={p.icon}
                            >
                                {p.title}
                            </Button>
                        ))}
                    </Grid>
                    <Grid container item md={2} justifyContent="flex-end">
                        {/* Relative to user */}
                        {loggedIn ? UserMenu() : LoginButton()}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
};

// Nav bar button's information
interface PageInfo {
    readonly key: string;
    readonly title: string;
    readonly link: string;
    readonly icon: JSX.Element;
}

function createPageInfo(): Array<PageInfo> {
    return [
        {
            key: "home",
            title: "Accueil",
            link: GLOBALS.routes.home(),
            icon: <HomeIcon />
        },
        {
            key: "search",
            title: "Rechercher",
            link: GLOBALS.routes.search(),
            icon: <SearchIcon />
        },
        {
            key: "sell",
            title: "Vendre",
            link: GLOBALS.routes.sell(),
            icon: <SellIcon />
        },
        {
            key: "about",
            title: "Qui sommes-nous ?",
            link: GLOBALS.routes.about(),
            icon: <InfoIcon />
        }
    ];
}

// User-relative section
function UserMenu(userName: string = "Bernard") {

    // Hook for menu management
    const [anchorElement, setAnchor] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorElement);
    const closeMenu = () => setAnchor(null)
    return (
        <>
            {/* The "open menu" button */}
            <IconButton
                color="inherit"
                id="user-menu-button"
                aria-haspopup="true"
                aria-expanded={isMenuOpen ? "true" : undefined}
                onClick={e => setAnchor(e?.currentTarget)}
                size="large"
            >
                <AccountIcon fontSize="large"/>
            </IconButton>
            {/* The associated menu */}
            <Menu
                anchorEl={anchorElement}
                open={isMenuOpen}
                onClose={closeMenu}
            >
                {userName}
                <MenuItem>
                    Profil
                </MenuItem>
                <MenuItem
                >
                    Deconnection
                </MenuItem>
            </Menu>
        </>
    );
}

function LoginButton() {
    return (
        <Button
            href={GLOBALS.routes.login()}
            color='inherit'
            startIcon={<LoginIcon />}
        >
            Connection
        </Button>
    );
}
