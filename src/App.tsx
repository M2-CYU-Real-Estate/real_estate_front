import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import theme from "./assets/theme";
import Home from './pages/Home';
import Error404 from "./pages/404";

function App() {



  return (
    <ThemeProvider theme={theme}>
      {/* This resets the default styles of the browser */}
      <CssBaseline />
      <BrowserRouter>
        {/* <Container maxWidth="lg" style={{maxWidth: "100%"}}> */}
          <Routes>
            {/* HOME */}
            <Route path='/' element={<Home />} />
            <Route path='*' element={<Error404 />} />
          </Routes>
        {/* </Container> */}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
