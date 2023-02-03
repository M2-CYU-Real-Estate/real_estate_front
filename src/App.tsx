import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import theme from './assets/theme';
import Home from './pages/Home';
import Error404 from './pages/404';
import GLOBALS from './globals';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
    return (
        <ThemeProvider theme={theme}>
            {/* This resets the default styles of the browser */}
            <CssBaseline />
            <BrowserRouter>
                {/* <Container maxWidth="lg" style={{maxWidth: "100%"}}> */}
                <Routes>
                    {/* HOME */}
                    <Route path={GLOBALS.routes.home()} element={<Home />} />

                    {/* LOGIN / REGISTER */}
                    <Route path={GLOBALS.routes.login()} element={<Login />} />
                    <Route
                        path={GLOBALS.routes.register()}
                        element={<Register />}
                    />

                    {/* 404 Error (if no route can match) */}
                    <Route path="*" element={<Error404 />} />
                </Routes>
                {/* </Container> */}
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
