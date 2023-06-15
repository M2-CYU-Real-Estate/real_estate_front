import { TabContext, TabList, TabPanel } from '@mui/lab';
import { AppBar, Box, Paper, Tab } from '@mui/material';
import { useState } from 'react';
import UserFavoritesTabPanel from './_UserFavoritesTabPanel';
import UserStatisticsTabPanel from './_UserStatisticsTabPanel';
import UserProfilesTabPanel from './_UserProfilesTabPanel';
import { useParams, useSearchParams } from 'react-router-dom';

// Some training on types that I will forget soon (permit to check if string is part of type)
const TAB_VALUES = ['favorites', 'profiles'] as const;
type TabTuple = typeof TAB_VALUES;
type TabValue = TabTuple[number];

function isTabValue(s: string | null): s is TabValue {
    if (!s) {
        return false;
    }
    return TAB_VALUES.includes(s as TabValue);
}

function UserTabsPanel() {
    // The navigation between tabs will be handled with query params
    // This will permit to go to the last tab seen when going to the previous page
    const [params, setParams] = useSearchParams('favorites');
    let tab = params.get('tab');

    if (!isTabValue(tab)) {
    // Set to default
        tab = 'favorites';
    }

    const changeTab = (
        e: React.SyntheticEvent<Element, Event>,
        newValue: TabValue
    ) => {
        setParams({ ['tab']: newValue });
    };

    return (
        <Paper elevation={2} sx={{ margin: '2em', mt: '2em', minHeight: '50%' }}>
            <Box
                width="100%"
                display="flex"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
                height="100%"
            >
                <TabContext value={tab}>
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
                            </TabList>
                        </AppBar>
                        <Box
                            display="flex"
                            flexDirection="column"
                            // Remove the height of the "tab list part"
                            height="calc(100% - 3em)"
                        >
                            <TabPanel sx={{ padding: 0, height: '100%' }} value="favorites">
                                <UserFavoritesTabPanel />
                            </TabPanel>
                            <TabPanel sx={{ padding: 0, height: '100%' }} value="profiles">
                                <UserProfilesTabPanel />
                            </TabPanel>
                        </Box>
                    </Box>
                </TabContext>
            </Box>
        </Paper>
    );
}

export default UserTabsPanel;
