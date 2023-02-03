import { createTheme } from '@mui/material';
// import { blue as primaryColor } from "@mui/material/colors"

/**
 * Create the theme for the entire web application using MUI palette.
 * More information : https://mui.com/material-ui/customization/palette/
 */
export default createTheme({
    palette: {
        primary: {
            main: '#0077b6',
        },
        contrastThreshold: 4.5,
    },
});
