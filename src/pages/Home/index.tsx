import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Grid, Tab } from '@mui/material';
import React, { useState } from 'react';
import Header from '../../components/Header';
import Map from '../../components/Map';
import LoadingBar from '../../components/loading/LoadingBar';
import HomeContext from './HomeContext';
import LastEntries from './LastEntries';
import RecommendationsPanel from './RecommendationsPanel';

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
                    {/* Provide the context for passing down loading functions */}
                    <HomeContext.Provider
                        value={{
                            enableLoading: enableLoading,
                            disableLoading: disableLoading,
                        }}
                    >
                        <TabsPanel />
                    </HomeContext.Provider>
                </Grid>
            </Grid>
        </Box>
    );
}

function TabsPanel() {
    const [tabValue, setTabValue] = useState<string>('1');

    const changeTab = (
        e: React.SyntheticEvent<Element, Event>,
        newValue: string
    ) => {
        setTabValue(newValue);
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
                        <RecommendationsPanel />
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
