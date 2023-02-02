import { Link, Typography } from "@mui/material";
import MainIcon from '@mui/icons-material/House';
import GLOBALS from "../../globals";

function HomeButton() {
    return (
        <Typography variant="h4" color="inherit">
            <Link
                href={GLOBALS.routes.home()}
                style={{ color: "#fff", textDecoration: "none" }}
            >
                <MainIcon /> Smart Real Estate
            </Link>
        </Typography>
    )
};

export default HomeButton;