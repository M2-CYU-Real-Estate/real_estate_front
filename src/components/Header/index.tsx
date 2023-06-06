import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import SearchIcon from '@mui/icons-material/Search';
import SellIcon from '@mui/icons-material/Sell';
import {
    AppBar,
    Button,
    CircularProgress,
    Grid,
    Paper,
    Toolbar,
} from '@mui/material';
import { useCurrentUserQuery } from '../../api/user/userApi';
import GLOBALS from '../../globals';
import { User } from '../../types/user';
import HomeButton from '../HomeButton';
import UserMenu from './UserMenu';

export default function Header() {
    const { data: user, isLoading, error } = useCurrentUserQuery();

    // Information about navigtion buttons
    const pages: Array<PageInfo> = createPageInfo();

    return (
        <AppBar
            position="sticky"
            color="primary"
            component={Paper}
            elevation={10}
            sx={{ borderRadius: 0 }}
            square
        >
            <Toolbar>
                <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    style={{ width: '100%' }}
                >
                    <Grid item md={3} justifyContent="left">
                        {/* Home button (link to home page) */}
                        <HomeButton />
                    </Grid>
                    <Grid
                        component="nav"
                        container
                        item
                        md={7}
                        justifyContent="space-evenly"
                    >
                        {/* Navigation list */}
                        {pages.map((p) => (
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
                    <Grid
                        container
                        item
                        md={2}
                        justifyContent={{ md: 'flex-end', xs: 'center' }}
                    >
                        {/* Relative to user */}
                        <UserPart isLoading={isLoading} user={user} />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

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
            key: 'home',
            title: 'Accueil',
            link: GLOBALS.routes.home(),
            icon: <HomeIcon />,
        },
        {
            key: 'sell',
            title: 'Vendre / Acheter',
            link: GLOBALS.routes.sell(),
            icon: <SellIcon />,
        },
        {
            key: 'about',
            title: 'Qui sommes-nous ?',
            link: GLOBALS.routes.about(),
            icon: <InfoIcon />,
        },
    ];
}

function LoginButton() {
    return (
        <Button
            href={GLOBALS.routes.login()}
            color="inherit"
            startIcon={<LoginIcon />}
        >
            Se connecter
        </Button>
    );
}

interface UserPartProps {
    user?: User;
    isLoading: boolean;
}

function UserPart({ user, isLoading }: UserPartProps) {
    if (isLoading) {
        return <CircularProgress color="secondary" />;
    }
    if (user) {
        return <UserMenu user={user} />;
    }
    return <LoginButton />;
}
