import React from 'react';
import {
    Box,
    Grid,
    Typography,
    Card,
    CardHeader,
    Avatar,
    IconButton,
    CardMedia,
    CardContent,
    Collapse,
} from '@mui/material';
import Header from '../../components/Header';
import profile from '../../assets/images/funnyProfile.jpg';

function About() {
    return (
        <Box
            height="100vh"
            sx={{
                backgroundColor: 'primary.dark',
                color: 'white',
                overflowX: 'hidden',
            }}
        >
            <Header />
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                sx={{ margin: '40px 0 20px 0' }}
            >
                <Typography component="h1" variant="h6" fontWeight="bold">
          Qui sommes-nous ?
                </Typography>
            </Grid>
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                sx={{ margin: '0 0 30px 0' }}
            >
                <Typography component="h1" variant="h4" fontWeight="bold">
          Nous sommes un groupe de quatre étudiants qui travaillent <br /> sur
          un projet de synthèse de Master 2 SID à CYU Paris
                </Typography>
            </Grid>
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                sx={{ margin: '0 0 30px 0' }}
            >
                <Typography variant="body1">
          Le projet concerne la vente de biens immobiliers en France. En
          utilisant des algorithmes d\apprentissage automatique, <br /> nous
          recommandons des biens immobiliers en fonction des préférences des
          clients. Nous prenons en compte le profil du client <br /> ainsi que
          les caractéristiques des biens tels que la surface, le prix, la ville,
          etc., afin de suggérer des options pertinentes. <br /> De plus, nous
          utilisons des intelligences artificielles pour prédire le prix d\un
          bien immobilier en fonction de différents critères fournis <br /> en
          entrée. Les données que nous utilisons sont collectées à partir de
          diverses plateformes immobilières.
                </Typography>
            </Grid>
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                sx={{ margin: '0 0 50px 0' }}
            >
                <Typography component="h1" variant="h4" fontWeight="bold">
          Voici notre équipe
                </Typography>
            </Grid>
            <Grid
                container
                justifyContent="center"
                spacing={1}
                sx={{ marginLeft: '40px' }}
            >
                <Grid item lg={3} md={3} sm={6} xs={12}>
                    <Card sx={{ maxWidth: 200, maxHeight: 300 }}>
                        <CardMedia component="img" image={profile} />
                        <CardContent>
                            <Typography component="h2" variant="h6" fontWeight="bold">
                Aldric VS
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                Etudiant à CY Cergy Paris en Master SIC parcours SID
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                    <Card sx={{ maxWidth: 200, maxHeight: 300 }}>
                        <CardMedia component="img" image={profile} />
                        <CardContent>
                            <Typography component="h2" variant="h6" fontWeight="bold">
                Moi
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                Etudiant à CY Cergy Paris en Master SIC parcours SID
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                    <Card sx={{ maxWidth: 200, maxHeight: 300 }}>
                        <CardMedia component="img" image={profile} />
                        <CardContent>
                            <Typography component="h2" variant="h6" fontWeight="bold">
                Victor MacMiaou
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                Etudiant à CY Cergy Paris en Master SIC parcours SID
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                    <Card sx={{ maxWidth: 200, maxHeight: 300 }}>
                        <CardMedia component="img" image={profile} />
                        <CardContent>
                            <Typography component="h2" variant="h6" fontWeight="bold">
                The Godfather
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                Etudiant à CY Cergy Paris en Master SIC parcours SID
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default About;
