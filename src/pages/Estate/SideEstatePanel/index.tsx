import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BarChartIcon from '@mui/icons-material/BarChart';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import React, { useState } from 'react';
import { Estate } from '../../../types/estate';
import AdvicePanel from './AdvicePanel';
import FundingPanel from './FundingPanel';
import StatisticsPanel from './StatisticsPanel';

function SideEstatePanel(props: { estate: Estate }) {
    const estate = props.estate;
    const [tabValue, setTabValue] = useState<string>('1');

    const changeTab = (
        e: React.SyntheticEvent<Element, Event>,
        newValue: string
    ) => {
        setTabValue(() => newValue);
    };

    return (
        <Box
            sx={{
                marginTop: '1.5em',
                width: '100%',
                height: '100vh',
                overflow: 'auto', // Add this line to make the box scrollable
            }}
        >
            <TabContext value={tabValue}>
                {/* The "tabs" bar */}
                <Box
                    alignItems="right"
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        height: '3.5em',
                    }}
                >
                    <TabList
                        onChange={changeTab}
                        aria-label="Onglets"
                        centered
                        sx={{
                            width: '100%',
                            flexGrow: '1',
                            height: '100%',
                            justifyContent: 'space-arround',
                        }}
                    >
                        {createTabLabel('1', 'Financement', AccountBalanceIcon)}
                        {createTabLabel('2', 'Conseils', SupportAgentIcon)}
                        {createTabLabel('3', 'Statistiques', BarChartIcon)}
                    </TabList>
                </Box>
                {/* Tab panels */}
                <Box
                    display="flex"
                    flexDirection="column"
                    // Remove the height of the "tab list part"
                    height="calc(100% - 3.5em)"
                >
                    <TabPanel sx={{ padding: 0 }} value="1">
                        <FundingPanel estate={estate} />
                    </TabPanel>
                    <TabPanel sx={{ padding: 0 }} value="2">
                        <AdvicePanel estate={estate} />
                    </TabPanel>
                    <TabPanel sx={{ padding: 0 }} value="3">
                        <StatisticsPanel />
                    </TabPanel>
                </Box>
            </TabContext>
        </Box>
    );
}

function createTabLabel(
    value: string,
    label: string,
    TabLabelIcon: React.ComponentType
): JSX.Element {
    return (
        <Tab
            value={value}
            label={label}
            icon={<TabLabelIcon />}
            iconPosition="start"
        />
    );
}

export default SideEstatePanel;
