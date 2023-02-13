import React, { useState } from 'react';
import { Box, Grid, Button, Paper, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Header from '../../components/Header';
import LoadingBar from '../../components/LoadingBar';
import Map from '../../components/Map';

function Home() {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [tabValue, setTabValue] = useState<string>('1');

    // const enableLoading = () => setLoading(() => true);
    // const disableLoading = () => setLoading(() => false);
    // const toggleLoading = () => setLoading((loadingState) => !loadingState);

    const items: Array<ItemProps> = [
        {
            key: '1',
            label: 'Item Test 1',
            title: 'Test 1',
            description:
                'Ceci est une description de test un peu nulle mais qui a le mérite de prendre de la place. Assez ? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae viverra arcu, non posuere neque. Sed rhoncus turpis tellus, sed facilisis odio congue vitae. Suspendisse efficitur sagittis posuere. Quisque lacinia vitae augue sit amet faucibus. Maecenas volutpat nulla turpis, nec tempor ex consequat a. Fusce rutrum sollicitudin hendrerit. Sed tristique tincidunt nisl, ut euismod est imperdiet a. Fusce vehicula arcu lacus, sit amet viverra nisl sodales id. Suspendisse fringilla ipsum ac dui aliquet, quis convallis nisi feugiat.',
        },
        {
            key: '2',
            label: 'Item Test 2',
            title: 'Test 2',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae viverra arcu, non posuere neque. Sed rhoncus turpis tellus, sed facilisis odio congue vitae. Suspendisse efficitur sagittis posuere. Quisque lacinia vitae augue sit amet faucibus. Maecenas volutpat nulla turpis, nec tempor ex consequat a. Fusce rutrum sollicitudin hendrerit. Sed tristique tincidunt nisl, ut euismod est imperdiet a. Fusce vehicula arcu lacus, sit amet viverra nisl sodales id. Suspendisse fringilla ipsum ac dui aliquet, quis convallis nisi feugiat.',
        },
    ];

    return (
        <Box
            display="flex"
            alignItems="stretch"
            flexDirection="column"
            height="100vh"
        >
            <Header />
            <LoadingBar isLoading={isLoading} />
            {/* The bottom panel take all the remaining space on grid */}
            <Grid item container component="main" sx={{ height: '100%' }}>
                <Grid container item xs={12} md={6}>
                    <Map />
                </Grid>
                <Grid container item xs={12} md={6}>
                    <TabContext value={tabValue}>
                        <Box
                            sx={{
                                borderBottom: 1,
                                borderColor: 'divider',
                            }}
                        >
                            <TabList
                                onChange={(e, newValue) =>
                                    setTabValue(newValue)
                                }
                                aria-label="Onglets"
                            >
                                {items.map((item) => (
                                    <Tab
                                        label={item.label}
                                        value={item.key}
                                        key={item.key}
                                    />
                                ))}
                            </TabList>
                        </Box>
                        <Box>
                            {items.map((item) => (
                                <TabPanel key={item.key} value={item.key}>
                                    <TestItem {...item} />
                                </TabPanel>
                            ))}
                        </Box>
                    </TabContext>
                </Grid>
            </Grid>
        </Box>
    );
}

interface ItemProps {
    key: string;
    label: string;
    title: string;
    description: string;
}

function TestItem(props: ItemProps) {
    return (
        <Paper>
            <h2>{props.title}</h2>
            <p>{props.description}</p>

            <Button>Check ça !</Button>
        </Paper>
    );
}

export default Home;
