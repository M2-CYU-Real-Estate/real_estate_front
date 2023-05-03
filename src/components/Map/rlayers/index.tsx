import React, { useState, useCallback } from 'react';
import { fromLonLat } from 'ol/proj';
import { boundingExtent, getCenter } from 'ol/extent';
import { Feature, Collection } from 'ol';
import { Point } from 'ol/geom';
import { Coordinate } from 'ol/coordinate';
import 'ol/ol.css';

import { RMap, ROSM, RControl, RLayerHeatmap } from 'rlayers';
import { Box } from '@mui/material';

// The bounds of the map
const extent = boundingExtent([
    fromLonLat([-5.225434398263605, 51.00599239743946]),
    fromLonLat([8.83096002638684, 42.17229111345318]),
]);

const center = getCenter(extent);

function Map() {
    const [heatmap, setHeatmap] = useState(randomHeatmap());

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
            <RMap
                width="100%"
                height="100%"
                initial={{ center: center, zoom: 1 }}
                // extent={extent}
            >
                {/* Use an OpenStreetMap background */}
                <ROSM />
                <RControl.RZoomSlider />
                <RControl.RScaleLine />
                <RLayerHeatmap
                    blur={20}
                    radius={1}
                    features={heatmap}
                    weight={useCallback(() => randNum(0.0, 100.0), [])}
                />
            </RMap>
        </Box>
    );
}

function randomHeatmap() {
    return randomFeatures();
}

function randomFeatures() {
    /* Note: in OpenJSON, lon is before lat */
    // return Array.from({ length: 100 }, (index) => ({
    //     type: 'feature',
    //     properties: {
    //         id: `index${index}`,
    //         intensity: randNum(1.0, 100.0),
    //     },
    //     geometry: {
    //         type: 'Point',
    //         coordinates: [
    //             randNum(-4.63100446543711, 9.166492986643812),
    //             randNum(42.34461966276717, 51.49738015273181),
    //         ],
    //     },
    // }));
    return Array.from(
        { length: 100 },
        () =>
            new Feature({
                geometry: new Point([
                    randNum(-4.63100446543711, 9.166492986643812),
                    randNum(42.34461966276717, 51.49738015273181),
                ]),
            })
    );
}

function randNum(min: number = 0.0, max: number = 1.0): number {
    return Math.random() * (max - min + 1) + min;
}

export default Map;
