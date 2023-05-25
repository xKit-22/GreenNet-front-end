import PropTypes from 'prop-types';
import { useContext, useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { load } from '@2gis/mapgl';

import './map.scss'
import { Map } from './Map'
import { MapContext } from './Map';
import { geocode } from './mapMethods';
import { getAllMarkers, setSelectedCoordinatesAction, createMarker } from '../../redux/mapSlice';
import { changeShowAddMarkerDialog } from '../../redux/dialogsSlice';
import { markerTypes } from './markersTypes';
import recyclingIcon from '../../assets/recycling.png'
import batteryIcon from '../../assets/battery.png'
import closeIcon from '../../assets/close.svg'

let count = 0;
export const MapPage = () => {
    console.log('mappage render: ', ++count);
    const allMarkers = useSelector(state => state.map.coordinates);
    const selectedCoordinates = useSelector(state => state.map.selectedCoordinates);
    const isShowAddMarkerDialog = useSelector(state => state.dialog.showAddMarkerDialog);
    const dispatch = useDispatch();
    const [mapInstance] = useContext(MapContext);
    const [createMarkerMode, setCreateMarkerMode] = useState(false);

    useEffect(() => {
        dispatch(getAllMarkers());
    }, []);

    useEffect(() => {
        if (allMarkers?.length > 0){
            load(mapInstance).then((mapglAPI) => {                
                allMarkers?.forEach(markerItem => {
                    let marker;
                    switch (markerItem.type) {
                        case "waste-sorting":
                            marker = new mapglAPI.Marker(mapInstance, {
                                coordinates: markerItem.coordinates,
                                icon: recyclingIcon
                            });
                            break;
                        case "recycling-battery":
                            marker = new mapglAPI.Marker(mapInstance, {
                                coordinates: markerItem.coordinates,
                                icon: batteryIcon
                            });
                            break;
                        
                        default:
                            break;
                    }
                        
                })          
            });
        }
    }, [allMarkers])


       if (mapInstance) {
        mapInstance.on('click', (e) => {
            if (!e.target) {
                return;
            }
            dispatch(setSelectedCoordinatesAction(e.lngLat))
            console.log('coordinates - ', e.lngLat);
            dispatch(changeShowAddMarkerDialog());
        });
       } 
    
    return (
        <>
            {isShowAddMarkerDialog ? <AddMarkerDialog/> : ""}
            <div className="page">
                <div className="filters-container">
                    <h3>Фильтрация</h3>

                    <label htmlFor="">Сортировка мусора</label>
                    <input type="checkbox" name="" id="" />

                    <label htmlFor="">Прием батареек</label>
                    <input type="checkbox" name="" id="" />
                </div>
                <Map/>
            </div>
        </>
    )
}

const AddMarkerDialog = () => {
    const dispatch = useDispatch();
    const [address, setAddress] = useState('');
    const [markerType, setMarkerType] = useState('WASTE_SORTING');
    const selectedCoordinates = useSelector(state => state.map.selectedCoordinates);

    useEffect(() => {
        geocode(selectedCoordinates)
            .then(res => setAddress(res));
    }, []);

    const toCreateMarker = () => {
        const data = {
            title: markerTypes[markerType].localization,
            coordinates: selectedCoordinates,
            type: markerTypes[markerType].type
        }
        console.log(data);
        dispatch(createMarker(data))
            .then(res => {
                dispatch(getAllMarkers);
                dispatch(changeShowAddMarkerDialog());
            })

    }

    return (
        <div className="dialog">
            <div className="dialog-container">
                <div className="close-button">
                    <img src={closeIcon} alt="закрыть" onClick={() => dispatch(changeShowAddMarkerDialog())} />
                </div>
                <h2>Добавить метку на карту</h2>
                <div className="content">
                    <p>{address}</p>
                    <label htmlFor="">Тип метки</label>
                    <select name="" id="" onChange={e =>{ setMarkerType(e.target.value)}}>
                        {Object.keys(markerTypes).map(typeItem => 
                            <option value={typeItem}>{markerTypes[typeItem].localization}</option>)}
                    </select>
                    <button onClick={() => toCreateMarker()}>Создать метку</button>
                </div>
            </div>
        </div>
    )
}