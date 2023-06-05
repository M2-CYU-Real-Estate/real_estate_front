import InfoIcon from '@mui/icons-material/Info';
import {
    Box,
    Grid,
    InputAdornment,
    Slider,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import {
    ArcElement,
    Chart as ChartJS,
    Tooltip as ChartTooltip,
    Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { NumericFormat } from 'react-number-format';
import { textCenterPlugin } from '../../../components/Charts/chartjs-plugins/chartjs_doughnut_plugins';
import { Estate } from '../../../types/estate';
import { splitThousands } from '../../../utils/StringUtils';

ChartJS.register(ArcElement, ChartTooltip, Legend, ChartDataLabels);

// ==== CONSTANTS ====
const notaryFeePercentage = 8;
const averageCreditRate = 2.6;
const defaultContributionPercentage = 20;

const notaryFeeTooltip = `Les frais de notaire varient en fonction des propriétés
 du bien (ancien ou neuf, prix proposé, etc.). 
 Pour simplifier, les frais de notaires sont ici fixés à ${notaryFeePercentage}%`;

// ==== STYLES ====
const formCellStyle = {
    padding: '1em',
};

const textInputStyle = {
    '& .MuiInputBase-input.Mui-disabled': {
        color: 'black',
        WebkitTextFillColor: 'black',
    },
    '& .MuiOutlinedInput-input': {
        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
        },
    },
};

// ==== BASE PROPS ====
const currencyValueFormatBaseProps = {
    customInput: TextField,
    type: 'tel',
    thousandSeparator: ' ',
} as const;

// ==== COMPONENT ====
function FundingPanel(props: { estate: Estate }) {
    const estate = props.estate;

    const theme = useTheme();

    const price = estate.price || 0;
    const notaryFee = Math.round(price * (notaryFeePercentage / 100.0));
    // const [price, setPrice] = useState(estate.price || 0);
    // const [notaryFee, setNotaryFee] = useState(0);
    const [contributionPercentage, setContributionPercentage] = useState(
        defaultContributionPercentage
    );
    const [contribution, setContribution] = useState(
        Math.round(price * (defaultContributionPercentage / 100.0))
    );
    const [loanDuration, setLoanDuration] = useState(10);
    const [creditRate, setCreditRate] = useState(averageCreditRate);

    // To compute when a value is changed
    const [fundingCosts, setFundingCosts] = useState(
        computeCosts(price, notaryFee, contribution, loanDuration, creditRate)
    );

    // Update prices and graphs on value change
    useEffect(() => {
        setContributionPercentage(Math.round((contribution / price) * 100));
        setFundingCosts(
            computeCosts(price, notaryFee, contribution, loanDuration, creditRate)
        );
    }, [contribution, loanDuration, creditRate]);

    return (
        <Box paddingTop="1em">
            <Typography variant="h5" color="primary.dark" marginLeft="1em">
        Estimation du cout mensuel
                <Tooltip title="Simulation non contractuelle. Afin d'avoir une estimation plus précise, il est nécéssaire de faire appel à un expert.">
                    <InfoIcon />
                </Tooltip>
            </Typography>
            {/* Little form for setting price, supplement etc. */}
            <Grid container>
                {/* Price */}
                <Grid item md={12} xs={12} sx={formCellStyle}>
                    <NumericFormat
                        {...currencyValueFormatBaseProps}
                        disabled
                        variant="filled"
                        id="price"
                        name="price"
                        label="Prix du bien"
                        fullWidth
                        value={price}
                        // Add the "€" icon at the beginning
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">€</InputAdornment>
                            ),
                        }}
                        sx={textInputStyle}
                    />
                </Grid>
                {/* Notary Fees */}
                <Grid item md={6} xs={12} sx={formCellStyle}>
                    <NumericFormat
                        {...currencyValueFormatBaseProps}
                        disabled
                        variant="filled"
                        id="notaryFees"
                        name="notaryFees"
                        label="Frais de notaire"
                        fullWidth
                        value={notaryFee}
                        // Add the "€" icon at the beginning
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">€</InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Tooltip title={notaryFeeTooltip}>
                                        <InfoIcon />
                                    </Tooltip>
                                </InputAdornment>
                            ),
                        }}
                        sx={textInputStyle}
                    />
                </Grid>
                {/* Contribution */}
                <Grid item md={6} xs={12} sx={formCellStyle}>
                    {/* '&nbsp;' is needed for adding an extra space */}
                    <NumericFormat
                        {...currencyValueFormatBaseProps}
                        id="contribution"
                        name="contribution"
                        label={`Apport : ${contributionPercentage || 0}%`}
                        fullWidth
                        value={contribution}
                        onChange={(e) =>
                            setContribution(parseMaybeEmptyInt(e.target.value))
                        }
                        // Add the "€" icon at the beginning
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">€</InputAdornment>
                            ),
                        }}
                        sx={textInputStyle}
                    />
                </Grid>
                {/* Loan */}
                <Grid item md={6} xs={12} sx={formCellStyle}>
                    <Box display="flex">
                        <Typography variant="body2" color="GrayText">
              Durée du prêt :&nbsp;
                        </Typography>
                        <Typography variant="body2" color="black">
                            {`${loanDuration} an(s)`}
                        </Typography>
                    </Box>
                    <Slider
                        aria-label="contribution"
                        defaultValue={loanDuration}
                        onChange={(e, v) => setLoanDuration(extractNumber(v))}
                        step={1}
                        min={1}
                        max={40}
                        marks={createSteppedMarks(0, 40, 5)}
                    />
                </Grid>
                {/* Credit rate */}
                <Grid item md={6} xs={12} sx={formCellStyle}>
                    <Box display="flex">
                        <Typography variant="body2" color="GrayText">
              Taux d&apos;intérêt :&nbsp;
                        </Typography>
                        <Typography variant="body2" color="black">
                            {`${creditRate.toFixed(2)} %`}
                        </Typography>
                    </Box>
                    <Slider
                        aria-label="contribution"
                        defaultValue={creditRate}
                        onChange={(e, v) => setCreditRate(extractNumber(v))}
                        step={0.05}
                        min={0.1}
                        max={10}
                        marks={createSteppedMarks(0, 10, 2, '%')}
                    />
                </Grid>
            </Grid>
            {/* All graphs and results */}
            <Box
                display="flex"
                className="donut"
                padding="1em"
                justifyContent="center"
                alignContent="center"
                width="100%"
                maxHeight="25em"
            >
                <Doughnut
                    data={{
                        labels: ['Montant emprunté', 'Coût des intérêts'],
                        datasets: [
                            {
                                label: 'Montant',
                                data: [fundingCosts.borrowedAmount, fundingCosts.interestCost],
                                backgroundColor: [
                                    theme.palette.primary.main,
                                    theme.palette.secondary.light,
                                ],
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true,
                                align: 'center',
                                position: 'top',
                            },
                            doughnutTextCenter: {
                                centerText: `${splitThousands(
                                    fundingCosts.pricePerMonth
                                )}€ par mois`,
                            },
                            datalabels: {
                                formatter: (val) => `${splitThousands(val)}€`,
                                color: theme.palette.primary.contrastText,
                            },
                        },
                    }}
                    plugins={[textCenterPlugin]}
                />
            </Box>
        </Box>
    );
}

interface FundingCosts {
    borrowedAmount: number;
    interestCost: number;
    pricePerMonth: number;
}

function computeCosts(
    price: number,
    notaryFee: number,
    contribution: number,
    loanDuration: number,
    creditRate: number
): FundingCosts {
    const borrowedAmount = price + notaryFee - contribution;
    if (borrowedAmount < 0) {
    // No calculation to do, nothing to pay !
        return {
            borrowedAmount: 0,
            interestCost: 0,
            pricePerMonth: 0,
        };
    }
    // Formulas come from here : https://www.immobilier-danger.com/Calcul-des-interets-d-un-emprunt-1070.html#formule-de-calcul-des-interets-dun-emprunt

    const numberMonths = loanDuration * 12;

    const creditRateRatio = creditRate / 100.0;

    // Compute price per month
    const baseInterest = Math.round((borrowedAmount * creditRateRatio) / 12);
    const decay = 1 - (1 + creditRateRatio / 12) ** -numberMonths;
    const pricePerMonth = Math.round(baseInterest / decay);

    // Compute interest cost
    // No precision loss, we work only with integer-like numbers
    const interestCost = numberMonths * pricePerMonth - borrowedAmount;

    return {
        borrowedAmount: borrowedAmount,
        interestCost: interestCost,
        pricePerMonth: pricePerMonth,
    };
}

function extractNumber(n: number | number[]): number {
    return Array.isArray(n) ? n[0] : n;
}

// If string is empty or invalid, returns 0
function parseMaybeEmptyInt(s: string): number {
    const cleanedString = s.replaceAll(/\s+/g, '');
    return parseInt(cleanedString) || 0;
}

function createSteppedMarks(
    min: number,
    max: number,
    step: number = 5,
    suffix: string = ''
) {
    return Array.from(
    // sequence of length
        { length: (max - min) / step + 1 },
        // for each element, add the right value to the array
        (value, index) => min + index * step
    ).map((value) => ({
    // Convert the array to an array of mark objects
        value: value,
        label: `${value}${suffix}`,
    }));
}

export default FundingPanel;
