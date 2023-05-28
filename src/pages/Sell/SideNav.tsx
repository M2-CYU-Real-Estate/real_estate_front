import { Avatar, Box, Grid, Typography } from "@mui/material";
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import InfoIcon from '@mui/icons-material/Info';
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { Colors } from 'chart.js';

Chart.register(CategoryScale);
Chart.register(Colors);

function EstimatedPrice() {

    return (
      
        <Box
            sx={{
                width: '25vw',
                maxWidth: '560px',
                height: '100vh',
                backgroundColor: 'primary.dark',
                '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: 1,
                },
            }}
        >
            <Grid container alignItems="center" justifyContent="center" sx={{ margin: '60px 0 0 0' }}>
                <Grid item>
                    <Avatar
                        sx={{
                            backgroundColor: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <EuroSymbolIcon fontSize="large" />
                    </Avatar>
                </Grid>
                <Grid item>
                    <Typography component="h1" variant="h6" fontWeight="bold" sx={{ color: 'white' }}>
                                Estimation du Prix
                    </Typography>
                </Grid>
            </Grid>
            <Grid container alignItems="center" justifyContent="center"  sx={{ margin: '20px 0 0 0' }}>
                <Grid item>
                    <Typography component="h1" variant="body1" sx={{ color: 'white' }}>
                     Le prix total est de: 
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography component="h1" variant="h6" fontWeight="bold" sx={{ color: 'white' }}>
                     300 000 €
                    </Typography>
                </Grid>
            </Grid>

            <Grid container alignItems="center" justifyContent="center" sx={{ margin: '20px 0 0 0' }}>
                <Grid item>
                    <Typography component="h1" variant="body1" sx={{ color: 'white' }}>
                    Prix du bien au m²:
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography component="h1" variant="h6" fontWeight="bold" sx={{ color: 'white' }}>
                     300 €
                    </Typography>
                </Grid>
            </Grid>

            <Grid container alignItems="center" justifyContent="center" sx={{ margin: '40px 0 0 0' }}>
                <Grid item>
                    <Avatar
                        sx={{
                            backgroundColor: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <InfoIcon fontSize="large" />
                    </Avatar>
                </Grid>
                <Grid item>
                    <Typography component="h1" variant="h6" fontWeight="bold" sx={{ color: 'white' }}>
                        Comment ça marche?
                    </Typography>
                </Grid>
               
            </Grid>
            <Grid container alignItems="center" justifyContent="center" sx={{ margin: '20px 0 0 20px' }}>
                <Grid item alignItems="center" justifyContent="center">
                    <Typography variant="body1" sx={{ color:'white' }}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad sit dolores aliquid sapiente aspernatur autem, corporis sed, natus perspiciatis, tempora asperiores fugiat error deleniti fuga. Fuga dignissimos voluptas velit tempora?
                    </Typography>
                </Grid>
            </Grid>

            <Grid container alignItems="center" justifyContent="center" sx={{ margin: '40px 0 0 0' }}>
               
                <Grid item>
                    <Typography component="h1" variant="h6" fontWeight="bold" sx={{ color: 'white' }}>
                       Evolution du prix dans votre région
                    </Typography>
                </Grid>

                <Grid item>
                    <Line data={data} options={chartOptions}/>
                </Grid>
               
            </Grid>

          
        
        </Box>

    );

}

const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Au","Sept","Oct", "Nov", "Dec"],
    datasets: [
        {
            label: '',
            data: [100, 500, 85, 90, 76, 300, 66, 44, 199, 299, 499, 500],
            fill: false,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "white",
            color:"white",
            elements: {
                point: {
                    backgroundColor: 'white', // Specify the color of the values here
                },
                line: {
                    borderColor: 'white' // Specify the color of the line here
                }
            },
            lineTension: 0.2,
            pointBorderColor: '#111',
            pointBorderWidth: 2,
        }
    ]
};

const chartOptions = {
    plugins: {
        datalabels: {
            color: "whitesmoke"
        }
   
    },
    scales: {
        y: {
            ticks: {
                color: 'white'
            }
        },
        x: {
            ticks: {
                color: 'white'
            }
        }
    },
    legend: {
        labels: {
            color: 'white' // Specify the legend color here
        }
    },
    tooltips: {
        displayColors: false,
        titleFontSize: 16,
        bodyFontSize: 14,
        xPadding: 10,
        yPadding: 10,
    }
};
export default EstimatedPrice;
