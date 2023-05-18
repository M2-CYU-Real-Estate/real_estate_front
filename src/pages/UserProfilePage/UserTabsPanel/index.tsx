import { TabContext, TabList, TabPanel } from '@mui/lab';
import { AppBar, Box, Paper, Tab } from '@mui/material';
import { useState } from 'react';

type TabValues = 'favorites' | 'profiles' | 'statistics';

function UserTabsPanel() {
    const [tabValue, setTabValue] = useState<TabValues>('favorites');

    const changeTab = (
        e: React.SyntheticEvent<Element, Event>,
        newValue: TabValues
    ) => {
        setTabValue(newValue);
    };

    return (
        <Paper
            elevation={2}
            sx={{ margin: '2em', mt: '3em', minHeight: '50%' }}
        >
            <Box
                width="100%"
                display="flex"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
            >
                <TabContext value={tabValue}>
                    <Box height="100%" width="100%">
                        <AppBar
                            position="static"
                            color="primary"
                            sx={{ borderRadius: '3px 3px 0 0' }}
                        >
                            <TabList
                                variant="fullWidth"
                                indicatorColor="secondary"
                                textColor="inherit"
                                onChange={changeTab}
                                aria-label="Onglets"
                                sx={{
                                    width: '100%',
                                    height: '3em',
                                }}
                            >
                                <Tab label="Favoris" value="favorites" />
                                <Tab label="Profils" value="profiles" />
                                <Tab label="Statistiques" value="statistics" />
                            </TabList>
                        </AppBar>
                        <Box
                            display="flex"
                            flexDirection="column"
                            // Remove the height of the "tab list part"
                            height="calc(100% - 3em)"
                        >
                            <TabPanel
                                sx={{ padding: 0, height: '100%' }}
                                value="favorites"
                            >
                                Favorites
                            </TabPanel>
                            <TabPanel
                                sx={{ padding: 0, height: '100%' }}
                                value="profiles"
                            >
                                Profiles
                            </TabPanel>
                            <TabPanel
                                sx={{ padding: 0, height: '100%' }}
                                value="statistics"
                            >
                                Statistiques
                            </TabPanel>
                        </Box>
                    </Box>
                </TabContext>
            </Box>
        </Paper>
    );
}

export default UserTabsPanel;
