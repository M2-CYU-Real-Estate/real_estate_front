import {
    Card,
    CardContent,
    Box,
    Typography,
    FormGroup,
    FormLabel,
    RadioGroup,
    Radio,
    FormControl,
    FormControlLabel,
    InputAdornment,
    TextField,
    Button,
    Grid,
    Drawer,
} from '@mui/material';
import { useContext } from 'react';
import EstateCard from '../../../components/EstateCard';
import HomeContext from '../HomeContext';
import mockEstates from '../../../api/mocks/mockEstates';
import SearchIcon from '@mui/icons-material/Search';
import SideSearch from './SideSearch';
import React from 'react';

function LastEntries() {
    // TODO: api call for fetching estates
    const estates = mockEstates;

    const { enableLoading, disableLoading } = useContext(HomeContext);
    const [isOpen, setOpen] = React.useState(false);

    return (
        <Box
            p={0}
            display="flex"
            flexDirection="column"
            height="100%"
            maxHeight="100%"
        >
            {/* Box with recommendation count & menus (filters, sort) */}
            <Box
                display="flex"
                flexDirection="row"
                justifyItems="stretch"
                justifyContent="center"
                width="100%"
                marginLeft="1em"
            >
                <Card sx={{ width: '100%' }}>
                    <CardContent>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                Type de bien
                            </FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel
                                    value="female"
                                    control={<Radio />}
                                    label="Maison"
                                />
                                <FormControlLabel
                                    value="male"
                                    control={<Radio />}
                                    label="Appartement"
                                />
                            </RadioGroup>
                        </FormControl>

                        <Grid container spacing={2}>
                            <Grid item lg={9}>
                                <TextField
                                    fullWidth
                                    type="string"
                                    InputProps={{
                                        endAdornment: <SearchIcon />,
                                    }}
                                    label="Ville"
                                    variant="outlined"
                                    name="roomsField"
                                    margin="normal"
                                    autoFocus
                                ></TextField>
                            </Grid>
                            <Grid item lg={3}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        mt: 3,
                                        mb: 2,
                                    }}
                                >
                  Rechercher
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Button
                        size="small"
                        style={{ textTransform: 'none' }}
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        <Typography variant="body1" component="div" fontWeight="bold">
              Afficher plus de filtre
                        </Typography>
                    </Button>
                </Card>
            </Box>
            {/* The scrollable items part */}
            <Box
                width="100%"
                height="100%"
                maxHeight="100%"
                p="0.5em"
                paddingTop="2em"
                sx={{ overflowY: 'scroll' }}
            >
                {estates.map((estate) => (
                    <EstateCard key={estate.id} {...estate} />
                ))}
            </Box>
            {/* <TemporaryDrawer /> */}
            <React.Fragment key={'right'}>
                <Drawer anchor={'right'} open={isOpen} onClose={() => setOpen(false)}>
                    <SideSearch />
                </Drawer>
            </React.Fragment>
        </Box>
    );
}

export default LastEntries;
