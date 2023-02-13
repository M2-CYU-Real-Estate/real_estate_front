import { MapContainer, TileLayer } from 'react-leaflet';
import * as Leaflet from 'leaflet';
import './map.css';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';

const bounds = Leaflet.latLngBounds(
    Leaflet.latLng(42.34461966276717, -4.63100446543711),
    Leaflet.latLng(51.49738015273181, 9.166492986643812)
);

const center = Leaflet.latLng(47.04906, 2.359317);

function Map() {
    return (
        <Box
            display="flex"
            alignItems="stretch"
            flexDirection="column"
            height="100%"
            width="100%"
        >
            {/* TODO implement the menu bar */}
            <div>Filters bar</div>
            {/* The map take the remaining space */}
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
        </Box>
    );
}

/**
 * What to show when the map is not loaded
 */
function PlaceHolder() {
    return (
        <p>
            Carte de la France
            <noscript>
                Javascript doit être activé afin de pouvoir voir la carte
            </noscript>
        </p>
    );
}

export default Map;
