import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import theme from './assets/theme';
import Home from './pages/Home';
import Error404 from './pages/Error404';
import GLOBALS from './globals';
import Login from './pages/Login';
import Register from './pages/Register';
import EstatePage from './pages/Estate';
// Setup the toast notifications to be available on all pages
// see https://blog.logrocket.com/using-react-toastify-style-toast-messages/
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserDashboard from './pages/UserDashboard';
import Profile from './pages/Profile';
import Sell from './pages/Sell';
import About from './pages/About';
import NewProfile from './pages/NewProfile';

function App() {
    return (
        <ThemeProvider theme={theme}>
            {/* Setup the toast notifications */}
            <ToastContainer />
            {/* This resets the default styles of the browser */}
            <CssBaseline />
            <BrowserRouter>
                {/* <Container maxWidth="lg" style={{maxWidth: "100%"}}> */}
                <Routes>
                    {/* HOME */}
                    <Route path={GLOBALS.routes.home()} element={<Home />} />

                    {/* ESTATES */}
                    <Route path={GLOBALS.routes.estate(':id')} element={<EstatePage />} />
                    {/* <Route path={GLOBALS.routes.estate(':id')} element={<Estate />} /> */}

                    {/* SELL */}
                    <Route path={GLOBALS.routes.sell()} element={<Sell />} />

                    {/* About */}
                    <Route path={GLOBALS.routes.about()} element={<About />} />

                    {/* LOGIN / REGISTER */}
                    <Route path={GLOBALS.routes.login()} element={<Login />} />
                    <Route path={GLOBALS.routes.register()} element={<Register />} />

                    {/* USER ROUTES */}
                    <Route
                        path={GLOBALS.routes.userDashboard()}
                        element={<UserDashboard />}
                    />
                    <Route
                        path={GLOBALS.routes.userNewProfile()}
                        element={<NewProfile />}
                    />
                    <Route
                        path={GLOBALS.routes.userProfile(':id')}
                        element={<Profile />}
                    />

                    {/* ADMIN ROUTES */}

                    {/* 404 Error (if no route can match) */}
                    <Route path="*" element={<Error404 />} />
                </Routes>
                {/* </Container> */}
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
