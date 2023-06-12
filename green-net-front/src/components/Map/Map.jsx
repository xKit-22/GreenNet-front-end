import React from 'react';
import { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { load } from '@2gis/mapgl';

import './map.scss'
import { setSelectedCoordinatesAction } from '../../redux/mapSlice';
import { changeShowAddMarkerDialog, changeMarkerInfoDialogAction } from '../../redux/dialogsSlice';

const MAP_CENTER = [46.020825, 51.53325];
let c = 0;

export const Map = () => {
    console.log('map renders: ', ++c);
    const [_, setMapInstance] = useContext(MapContext);
    const dispatch = useDispatch();

    useEffect(() => {
        let map;
        load().then((mapglAPI) => {
            map = new mapglAPI.Map('map-container', {
                center: MAP_CENTER,
                zoom: 18,
                key: 'a7abf1ac-ec9c-4c4f-a497-0dbd6ff9888b',
            });
            setMapInstance(map);

            map.on('click', (e) => {
                if (!e.target) {
                    return;
                }
                dispatch(setSelectedCoordinatesAction(e.lngLat))
                console.log('coordinates - ', e.lngLat);
                dispatch(changeShowAddMarkerDialog());
            });
        });

        // Удаляем карту при размонтировании компонента
        return () => map && map.destroy();
    }, []);

    return <MapWrapper />
}

const MapWrapper =
    () => {
        return <div id="map-container" style={{ width: '80%', height: '700px' }}></div>;
    }

export const MapContext = React.createContext([undefined, () => { }]);
export const MapProvider = (props) => {
    const [mapInstance, setMapInstance] = React.useState();

    return (
        <MapContext.Provider value={[mapInstance, setMapInstance]}>
            {props.children}
        </MapContext.Provider>
    );
};