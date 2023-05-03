import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3';
import * as Leaflet from 'leaflet';
import './map.css';
import { Box } from '@mui/material';

const bounds = Leaflet.latLngBounds(
    Leaflet.latLng(42.34461966276717, -4.63100446543711),
    Leaflet.latLng(51.49738015273181, 9.166492986643812)
);

const center = Leaflet.latLng(47.04906, 2.359317);

function Map() {
    const [heatmap, setHeatmap] = useState<Array<HeatmapData>>(randomHeatmap());

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         console.log('Update map');
    //         setHeatmap(() => randomHeatmap());
    //     }, 1000);
    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, []);

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
                {/* TODO create a wrapper for various heatmap formats */}
                <HeatmapLayer
                    points={heatmap}
                    longitudeExtractor={(m: HeatmapData) => m.lon}
                    latitudeExtractor={(m: HeatmapData) => m.lat}
                    intensityExtractor={(m: HeatmapData) => m.intensity}
                    radius={10}
                    max={100}
                    minOpacity={1}
                    useLocalExtrema={true}
                />
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
