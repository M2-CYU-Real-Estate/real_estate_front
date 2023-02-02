import MainIcon from "@mui/icons-material/House";
import {
    Avatar,
    Box,
    Button,
    FormControlLabel,
    Grid,
    Link,
    Paper,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import HomeButton from "../../components/HomeButton";
import SidePanel from "../../components/SidePanel";
import GLOBALS from "../../globals";

const validationSchema = yup.object({
    email: yup
        .string()
        .email("Une addresse e-mail valide est requise")
        .required("Une addresse e-mail est attendue"),
    password: yup
        .string()
        .min(6, "Un mot de passe d'au moins 6 caractères est attendu")
        .required("Un mot de passe est attendu"),
});

function Login() {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        validationSchema: validationSchema,
        onSubmit: handleSumbit,
    });

    return (
        <Grid container component="main" sx={{ height: "100vh" }}>
            <SidePanel />
            <Grid
                container
                item
                // Each size is made as opposite to the "image" panel
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6} // A small shadow over the background
                square
                alignItems="center"
                justifyContent="center"
                flexDirection="row"
            >
                {/* Main login box */}
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {/* Little icon on top of form */}
                    <Avatar
                        sx={{
                            backgroundColor: "primary.main",
                        }}
                    >
                        <MainIcon fontSize="large" />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Connexion
                    </Typography>
                    {/* The real form */}
                    <Box
                        component="form"
                        noValidate
                        onSubmit={formik.handleSubmit}
                        sx={{
                            mt: 1,
                        }}
                    >
                        {/* Email */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Adresse e-mail"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            autoFocus
                        />
                        {/* Password */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            type="password"
                            label="Mot de passe"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        {/* Remember me */}
                        <FormControlLabel
                            control={
                                <Switch
                                    id="rememberMe"
                                    value="rememberMe"
                                    color="primary"
                                    onChange={formik.handleChange}
                                    checked={formik.values.rememberMe}
                                />
                            }
                            label="Se souvenir de moi"
                        />
                        {/* Submit */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                            }}
                        >
                            Connexion
                        </Button>
                        {/* Forgotten password / Sign up */}
                        <Grid container>
                            <Grid item xs>
                                <Link href={GLOBALS.routes.passwordForgotten()} variant="body2">
                                    Mot de passe oublié
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href={GLOBALS.routes.register()} variant="body2">
                                    Pas de compte ? En créer un.
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/* Website logo (with copyrights, normally) */}
                <Box
                    sx={{ backgroundColor: "primary.main" }}
                    padding={1}
                    component={Paper}
                    elevation={6}
                >
                    <HomeButton />
                </Box>
            </Grid>
        </Grid>
    );
}

interface FormResponses {
    email: string;
    password: string;
    rememberMe: boolean;
}

async function handleSumbit(e: FormResponses) {
    window.alert(JSON.stringify(e, null, 2));
}

export default Login;
