import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import * as Leaflet from 'leaflet';
import './map.css';
import { Box, Button } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'react-leaflet-cluster';
import pinIcon from '../../../assets/images/location.svg';
import { ResponsePositions } from '../../../api/estate/estateApi';
import CircularCenteredLoading from '../../loading/CircularCenteredLoading';
import { Link } from 'react-router-dom';
import GLOBALS from '../../../globals';
const customIcon = new Leaflet.Icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: pinIcon,
});

const bounds = Leaflet.latLngBounds(
    Leaflet.latLng(42.34461966276717, -4.63100446543711),
    Leaflet.latLng(51.49738015273181, 9.166492986643812)
);

const center = Leaflet.latLng(47.04906, 2.359317);

interface Position {
    id: number;
    title: string;
    lat: number;
    lon: number;
}

interface MapProps {
    positions?: ResponsePositions[];
}

function Map({ positions }: MapProps) {
    let convertedPositions: Position[] = [];

    console.time('positions');
    if (positions && Array.isArray(positions)) {
        convertedPositions = positions.map((position) => ({
            ...position,
            lat: Number(position.lat),
            lon: Number(position.lon),
        }));

        console.log(convertedPositions);
    }
    console.timeEnd('positions');

    // if (!positions) {
    //     return <CircularCenteredLoading />;
    // }

    return (
        <Box
            display="flex"
            alignItems="stretch"
            flexDirection="column"
            height="100%"
            width="100%"
        >
            {/* The map take the remaining space */}
            <MapContainer
                preferCanvas={true}
                style={{ height: '100%', width: '100%' }}
                center={center}
                minZoom={6}
                maxZoom={18}
                zoom={6}
                scrollWheelZoom={true}
                maxBounds={bounds}
                placeholder={<PlaceHolder />}
            >
                {convertedPositions && (
                    <MarkerClusterGroup chunkedLoading>
                        {convertedPositions.map(
                            (
                                position // <-- Opening parenthesis added after `position`
                            ) => (
                                <Marker
                                    icon={customIcon}
                                    key={position.id}
                                    position={[position.lat, position.lon]}
                                    title={position.title}
                                    eventHandlers={{
                                        click: () => {
                                            window.location.href = GLOBALS.routes.estate(
                                                position.id.toString()
                                            );
                                        },
                                    }}
                                />
                            )
                        )}
                    </MarkerClusterGroup>
                )}

                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
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

interface HeatmapData {
    lat: number;
    lon: number;
    intensity: number;
}

function randomHeatmap(): Array<HeatmapData> {
    /* Note: in OpenJSON, lon is before lat */
    return Array.from({ length: 100 }, () => ({
        lat: randNum(42.34461966276717, 51.49738015273181),
        lon: randNum(-4.63100446543711, 9.166492986643812),
        intensity: randNum(1.0, 100.0),
    }));
}

function randNum(min: number = 0.0, max: number = 1.0): number {
    return Math.random() * (max - min + 1) + min;
}

export default Map;
