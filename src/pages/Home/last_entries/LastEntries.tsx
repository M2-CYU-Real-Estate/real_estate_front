import { useState } from 'react';
import { useEstatesPageQuery } from '../../../api/estate/estateApi';
import EstatePageContent from '../EstatePageContent';
import {
    Card,
    CardContent,
    Box,
    Typography,
    FormLabel,
    RadioGroup,
    Radio,
    FormControl,
    FormControlLabel,
    TextField,
    Button,
    Grid,
    Drawer,
    Autocomplete,
    createFilterOptions,
} from '@mui/material';
import EstateCard from '../../../components/EstateCard';
import mockEstates from '../../../api/mocks/mockEstates';
import cities from '../../../assets/data/correspondance_ville_partial.json';
import SideSearch from './SideSearch';
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { EstatePageParams } from '../../../api/estate/estateInterface';
import { EstateType } from '../../../types/estate';

export const basicInfoValidationSchema = yup.object({
    ville: yup.string().required('La ville voulue est attendue'),
    maison: yup.boolean(),
    appartement: yup.boolean(),
});

function LastEntries() {
    const [page, setPage] = useState<number>(0);
    const [search, setSearch] = useState<EstatePageParams | null>(null);

    const {
        data: estatePage,
        isFetching,
        isError,
    } = useEstatesPageQuery({ ...search, page: page });

    // TODO: api call for fetching estates
    const [isOpen, setOpen] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            typeBien: undefined,
            ville: '',
        },
        validationSchema: basicInfoValidationSchema,
        onSubmit: handleSubmit,
    });

    async function handleSubmit(e: FormResponses) {
    // TODO handle submit
    // window.alert(JSON.stringify(e, null, 2));
        const pcArr = e.ville?.match(/(\d{5})/);
        setSearch({
            city: pcArr ? pcArr[0] : '75001',
            type: e.typeBien,
        });
    // setOpen(true);
    }

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
                component="form"
                noValidate
                onSubmit={formik.handleSubmit}
                sx={{
                    mt: 1,
                }}
            >
                <Box p="0.5em">
                    <Card sx={{ width: '100%' }}>
                        <CardContent>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">
                  Type de bien
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="typeBien"
                                >
                                    <FormControlLabel
                                        label="Maison"
                                        control={
                                            <Radio onChange={formik.handleChange} value="HOUSE" />
                                        }
                                    />
                                    <FormControlLabel
                                        label="Appartement"
                                        control={
                                            <Radio onChange={formik.handleChange} value="APARTMENT" />
                                        }
                                    />
                                </RadioGroup>
                            </FormControl>

                            <Grid container spacing={2}>
                                <Grid item lg={9}>
                                    <Autocomplete
                                        filterOptions={createFilterOptions({
                                            limit: 15,
                                        })}
                                        options={cities.map((c) => `${c.nom} (${c.postal})`)}
                                        includeInputInList
                                        value={formik.values.ville}
                                        onChange={(e, value) =>
                                            formik.setFieldValue('ville', value)
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                margin="normal"
                                                fullWidth
                                                name="ville"
                                                label="Ville"
                                                variant="outlined"
                                                onChange={formik.handleChange}
                                                error={
                                                    formik.touched.ville && Boolean(formik.errors.ville)
                                                }
                                                helperText={formik.touched.ville && formik.errors.ville}
                                                autoFocus
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item lg={3}>
                                    <Button
                                        type="submit"
                                        fullWidth
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
                Afficher plus de filtres
                            </Typography>
                        </Button>
                    </Card>
                </Box>
                {/* The scrollable items part */}
                {/* <Box
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
                </Box> */}
            </Box>
            {/* The scrollable items part */}
            <EstatePageContent
                estates={estatePage?.content}
                isLoading={isFetching}
                isError={isError}
                paginated
                count={estatePage?.pageCount}
                currentPage={page}
                setCurrentPage={setPage}
            />
            {/* <TemporaryDrawer /> */}
            <React.Fragment key={'right'}>
                <Drawer anchor={'right'} open={isOpen} onClose={() => setOpen(false)}>
                    <SideSearch />
                </Drawer>
            </React.Fragment>
        </Box>
    );
}

interface FormResponses {
    typeBien?: EstateType;
    ville: string;
}
export default LastEntries;
