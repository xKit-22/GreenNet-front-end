import React from 'react';
import { useEffect } from 'react';
import { load } from '@2gis/mapgl';

import './map.scss'

export const Map = () => {
    useEffect(() => {
        let map;
        load().then((mapglAPI) => {
            map = new mapglAPI.Map('map-container', {
                center: [46.020825, 51.53325],
                zoom: 18,
                key: 'a7abf1ac-ec9c-4c4f-a497-0dbd6ff9888b',
            });
        });

        // Удаляем карту при размонтировании компонента
        return () => map && map.destroy();
    }, []);
    return (
        <div className="page">
            <MapWrapper />
        </div>
    )
}

const MapWrapper = React.memo(
    () => {
        return <div id="map-container" style={{ width: '80%', height: '700px' }}></div>;
    },
    () => true,
);