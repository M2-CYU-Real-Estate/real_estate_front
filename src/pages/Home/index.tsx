import React, { useState } from 'react';
import { Box, Grid, Button, Paper, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Header from '../../components/Header';
import LoadingBar from '../../components/LoadingBar';
import Map from '../../components/Map';
import RecommendationsPanel from './RecommendationsPanel';
import LastEntries from './LastEntries';

function Home() {
    const [isLoading, setLoading] = useState<boolean>(false);

    const enableLoading = () => setLoading(true);
    const disableLoading = () => setLoading(false);

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
            <Grid
                container
                component="main"
                height="calc(100% - 69px)"
                display="flex"
            >
                <Grid item xs={12} md={6} height="100%">
                    <Map />
                </Grid>
                <Grid item xs={12} md={6} height="100%">
                    <TabsPanel
                        startLoading={enableLoading}
                        endLoading={disableLoading}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

interface TabsProps {
    startLoading: () => void;
    endLoading: () => void;
}

function TabsPanel({ startLoading, endLoading }: TabsProps) {
    const [tabValue, setTabValue] = useState<string>('1');

    const changeTab = (
        e: React.SyntheticEvent<Element, Event>,
        newValue: string
    ) => {
        // TODO only for testing purposes, this is intended to be removed
        startLoading();
        setTimeout(() => {
            endLoading();
            setTabValue(newValue);
        }, 10);
    };

    return (
        <TabContext value={tabValue}>
            <Box
                className="coucou"
                display="flex"
                alignItems="stretch"
                flexDirection="column"
                height="100%"
                width="100%"
            >
                {/* The "tabs" bar */}
                <Box
                    alignItems="right"
                    sx={{
                        height: '3em',
                        borderBottom: 1,
                        borderColor: 'divider',
                    }}
                >
                    <TabList
                        onChange={changeTab}
                        aria-label="Onglets"
                        sx={{ width: '100%', height: '3em' }}
                    >
                        <Tab
                            label="Recommendations"
                            value="1"
                            sx={{ marginLeft: 'auto' }}
                        />
                        <Tab label="Dernières annonces" value="2" />
                    </TabList>
                </Box>
                {/* Each tab panel is really here */}
                <Box
                    display="flex"
                    flexDirection="column"
                    // Remove the height of the "tab list part"
                    height="calc(100% - 3em)"
                >
                    <TabPanel sx={{ padding: 0, height: '100%' }} value="1">
                        <RecommendationsPanel
                            enableLoading={startLoading}
                            disableLoading={endLoading}
                        />
                    </TabPanel>
                    <TabPanel sx={{ padding: 0, height: '100%' }} value="2">
                        <LastEntries />
                    </TabPanel>
                </Box>
            </Box>
        </TabContext>
    );
}

export default Home;
