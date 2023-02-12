import { Box, Grid } from '@mui/material';
import { MapContainer, TileLayer } from 'react-leaflet';
import * as Leaflet from 'leaflet';
import Header from '../../components/Header';
import './map.css';

function Home() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Header />
            {/* <main style={{ height: '100%' }}> */}
            {/* TODO add a loading bar that take all width ? */}
            <Grid container component="main" sx={{ height: '100%' }}>
                {/* <LinearProgress /> */}
                <Grid container item xs={12} md={6}>
                    <Map />
                </Grid>
                <Grid
                    container
                    item
                    xs={12}
                    md={6}
                    style={{ backgroundColor: '#000000' }}
                >
                    coucou
                </Grid>
            </Grid>
            {/* </main> */}
        </Box>
    );
}

function Map() {
    const bounds = Leaflet.latLngBounds(
        Leaflet.latLng(42.34461966276717, -4.63100446543711),
        Leaflet.latLng(51.49738015273181, 9.166492986643812)
    );

    const center = Leaflet.latLng(47.04906, 2.359317);

    const PlaceHolder = () => (
        <p>
            Carte de la France
            <noscript>
                Javascript doit être activé afin de pouvoir voir la carte
            </noscript>
        </p>
    );

    return (
        <>
            {/* TODO implement the menu bar */}
            <div>Filters bar</div>
            <MapContainer
                style={{ height: '100%', width: '100%' }}
                center={center}
                minZoom={6}
                maxZoom={18}
                zoom={6}
                scrollWheelZoom={true}
                maxBounds={bounds}
                placeholder={<PlaceHolder />}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </MapContainer>
        </>
    );
}

export default Home;
