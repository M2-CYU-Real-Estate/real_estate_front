import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3';
import * as Leaflet from 'leaflet';
import './map.css';
import { Box } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import { addressPoints } from '../../../api/mocks/realworld';
import MarkerClusterGroup from 'react-leaflet-cluster';

const customIcon = new Leaflet.Icon({
    iconUrl: './location.svg',
    iconSize: new Leaflet.Point(40, 47),
});

const bounds = Leaflet.latLngBounds(
    Leaflet.latLng(42.34461966276717, -4.63100446543711),
    Leaflet.latLng(51.49738015273181, 9.166492986643812)
);

const center = Leaflet.latLng(-41.975762, 172.934298);

function Map() {
  type AdressPoint = Array<[number, number, string]>;

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
              //   maxBounds={bounds}
              placeholder={<PlaceHolder />}
          >
              <MarkerClusterGroup chunkedLoading>
                  {(addressPoints as AdressPoint).map((address, index) => (
                      <Marker
                          icon={customIcon}
                          key={index}
                          position={[address[0], address[1]]}
                          title={address[2]}
                          eventHandlers={{
                              click: (e) => {
                                  window.alert('marker clicked ' + address[2]);
                              },
                          }}
                      ></Marker>
                  ))}
              </MarkerClusterGroup>
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
