import MainIcon from '@mui/icons-material/House';
import {
    Avatar,
    Box,
    Button,
    Grid,
    Link,
    Paper,
    TextField,
    Typography,
    Alert,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import HomeButton from '../../components/HomeButton';
import SidePanel from '../../components/SideImagePanel';
import GLOBALS from '../../globals';
import { toast } from 'react-toastify';
import {
    useRegisterMutation,
    useLoginMutation,
} from '../../api/authentication/authenticationApi';
import { setUserCredentials } from '../../app/features/authentication/authenticationSlice';
import { useAppDispatch } from '../../app/store';
import { useNavigate } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit';
import { LoadingButton } from '@mui/lab';
import { userApi } from '../../api/user/userApi';

const validationSchema = yup.object({
    username: yup
        .string()
        .min(3, 'Le nom doit au moins avoir 3 caractères')
        .required('Un nom est attendu'),
    email: yup
        .string()
        .email('Une addresse e-mail valide est requise')
        .required('Une addresse e-mail est attendue'),
    password: yup
        .string()
        .min(6, "Un mot de passe d'au moins 6 caractères est attendu")
        .required('Un mot de passe est attendu'),
    passwordConfirm: yup
        .string()
        .min(6, "Un mot de passe d'au moins 6 caractères est attendu")
        .equals(
            [yup.ref('password')],
            'La confirmation doit être similaire au mot de passe'
        )
        .required('Un mot de passe est attendu'),
});

function Register() {
    const [register, { isLoading, error }] = useRegisterMutation();
    const [login, { isLoading: isloadinglogin, error: errorLogin }] =
    useLoginMutation();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            console.log({ values, actions });
            actions.setSubmitting(true);
            // Login and handle the response (not the error, no need)
            register(values)
                .unwrap()
                .then(() => login(values).unwrap())
                .then((response) => {
                    dispatch(
                        setUserCredentials({
                            ...response,
                            rememberMe: false,
                        })
                    );
                    toast.success(`Bienvenue, ${response.user.name} !`, {
                        position: 'bottom-center',
                    });
                    navigate(GLOBALS.routes.home());
                })
                .catch(() => toast.error('Une erreur est survenue !'))
                .finally(() => actions.setSubmitting(false));
        },
    });

    // TODO : 3 steps registration :
    // 1. email
    // 2. password + password confirm
    // 3. (optional) user profile

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
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
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        sx={{
                            backgroundColor: 'primary.main',
                        }}
                    >
                        <MainIcon fontSize="large" />
                    </Avatar>
                    <Typography component="h1" variant="h5">
            Inscription
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={formik.handleSubmit}
                        sx={{
                            mt: 1,
                        }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Nom"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                            autoFocus
                        />
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
                        />
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="passwordConfirm"
                            type="password"
                            label="Confirmation du mot de passe"
                            name="passwordConfirm"
                            value={formik.values.passwordConfirm}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.passwordConfirm &&
                Boolean(formik.errors.passwordConfirm)
                            }
                            helperText={
                                formik.touched.passwordConfirm && formik.errors.passwordConfirm
                            }
                        />
                        <LoadingButton
                            loading={isLoading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                            }}
                        >
              Inscription
                        </LoadingButton>
                        {/* Login url */}
                        <Grid container>
                            <Grid item>
                                <Link href={GLOBALS.routes.login()} variant="body2">
                  Déjà un compte ? Se connecter.
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                    {/* Error message (if exists) */}
                    {error && (
                        <Box width="100%" marginTop="0.5em">
                            <Alert severity="error">{createErrorMessage(error)}</Alert>
                        </Box>
                    )}
                </Box>
                <Box
                    sx={{ backgroundColor: 'primary.main' }}
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
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

// async function handleSumbit(e: FormResponses) {
//     // TODO handle submit
//     window.alert(JSON.stringify(e, null, 2));
// }

function createErrorMessage(
    error: FetchBaseQueryError | SerializedError | undefined
): string {
    if (error === undefined || 'stack' in error) {
        return 'Une erreur inconnue a eu lieu';
    }
    if ('status' in error && typeof error.status === 'string') {
        return 'Impossible de communiquer avec le serveur';
    }
    return "L'identifiant ou le mot de passe est invalide";
}

export default Register;
