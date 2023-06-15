import PropTypes from 'prop-types';
import { useContext, useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { load } from '@2gis/mapgl';

import './map.scss'
import { Map } from './Map'
import { MapContext } from './Map';
import { geocode, getMarkerById } from './mapMethods';
import { getAllMarkers, setSelectedCoordinatesAction, createMarker, deleteMarker } from '../../redux/mapSlice';
import { changeShowAddMarkerDialog, changeMarkerInfoDialogAction } from '../../redux/dialogsSlice';
import { markerTypes } from './markersTypes';
import recyclingIcon from '../../assets/recycling.png'
import batteryIcon from '../../assets/battery.png'
import closeIcon from '../../assets/close.svg'
import paperIcon from '../../assets/paper.png'

let count = 0;
let markersInstansesArray = [];

export const MapPage = () => {
    console.log('mappage render: ', ++count);
    const allMarkers = useSelector(state => state.map.coordinates);
    const selectedCoordinates = useSelector(state => state.map.selectedCoordinates);
    const isShowAddMarkerDialog = useSelector(state => state.dialog.showAddMarkerDialog);
    const isShowMarkerInfoDialog = useSelector(state => state.dialog.showMarkerInfoDialog);
    const dispatch = useDispatch();
    const [mapInstance] = useContext(MapContext);
    const [wasteFilter, setWasteFilter] = useState(true);
    const [paperFilter, setPaperFilter] = useState(true);
    const [batteryFilter, setBatteryFilter] = useState(true);


    const filterMap = (filterName) => {
        switch (filterName) {
            case 'waste':
                markersInstansesArray.forEach(m => {
                    let curM;
                    if (m) curM = allMarkers.find(mark => mark.id == m.userData);
                    if (m && !wasteFilter && curM.type == 'waste-sorting') {
                        m.show();
                    } else if (m && wasteFilter && curM.type == 'waste-sorting') {
                        m.hide();
                    }
                });
                break;

            case 'battery':
                markersInstansesArray.forEach(m => {
                    let curM;
                    if (m) curM = allMarkers.find(mark => mark.id == m.userData);
                    if (m && !batteryFilter && curM.type == 'recycling-battery') {
                        m.show();
                    } else if (m && batteryFilter && curM.type == 'recycling-battery') {
                        m.hide();
                    }
                });
                break;

            case 'paper':
                markersInstansesArray.forEach(m => {
                    let curM;
                    if (m) curM = allMarkers.find(mark => mark.id == m.userData);
                    if (m && !paperFilter && curM.type == 'recycling-paper') {
                        m.show();
                    } else if (m && paperFilter && curM.type == 'recycling-paper') {
                        m.hide();
                    }
                });
                break;

            default:
                break;
        }

    }

    useEffect(() => {
        dispatch(getAllMarkers());
    }, []);

    useEffect(() => {
        debugger
        if (allMarkers?.length > 0) {
            load(mapInstance).then((mapglAPI) => {
                allMarkers?.forEach(markerItem => {
                    let marker;
                    debugger
                    switch (markerItem.type) {
                        case markerTypes.WASTE_SORTING.type:
                            marker = new mapglAPI.Marker(mapInstance, {
                                coordinates: markerItem.coordinates,
                                icon: recyclingIcon,
                                userData: markerItem.id
                            });
                            // debugger
                            break;
                        case markerTypes.RECYCLING_BATTERY.type:
                            marker = new mapglAPI.Marker(mapInstance, {
                                coordinates: markerItem.coordinates,
                                icon: batteryIcon,
                                userData: markerItem.id
                            });

                            break;
                        case markerTypes.RECYCLING_PAPER.type:
                            marker = new mapglAPI.Marker(mapInstance, {
                                coordinates: markerItem.coordinates,
                                icon: paperIcon,
                                userData: markerItem.id
                            });

                            break;

                        default:
                            break;
                    }
                    markersInstansesArray.push(marker);

                    marker?.on('click', (e) => {
                        console.log("lolll", markerItem.id);
                        sessionStorage.setItem('markerId', markerItem.id);
                        dispatch(changeMarkerInfoDialogAction());
                    });

                })

            });
        }
    }, [allMarkers]);

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
            {isShowAddMarkerDialog ? <AddMarkerDialog /> : ""}
            {isShowMarkerInfoDialog ? <MarkerInfo /> : ""}
            <div className="page">
                <div className="filters-container">
                    <h2>Фильтрация</h2>

                    <label htmlFor="">Сортировка мусора</label>
                    <input type="checkbox" defaultChecked={wasteFilter} name="waste" onChange={(e) => {
                        setWasteFilter(!wasteFilter);
                        filterMap(e.target.name);
                        console.log('xo', markersInstansesArray);

                    }}
                    />

                    <label htmlFor="">Прием батареек</label>
                    <input type="checkbox" defaultChecked={batteryFilter} name="battery" onChange={(e) => {
                        setBatteryFilter(!batteryFilter);
                        filterMap(e.target.name);
                    }
                    } />

                    <label htmlFor="">Прием мукулатуры</label>
                    <input type="checkbox" defaultChecked={paperFilter} name="paper" onChange={(e) => {
                        setPaperFilter(!paperFilter);
                        filterMap(e.target.name);
                    }
                    } />
                </div>
                <div className="map-container">
                    <Map />
                    <div className="icons-info">
                        <h2>Обозначения</h2>

                        <div className="icon-item">
                            <img src={recyclingIcon} alt="сортировка мусора" />
                            <p>Сортировка мусора</p>
                        </div>

                        <div className="icon-item">
                            <img src={paperIcon} alt="Прием мумкулатуры" />
                            <p>Прием мумкулатуры</p>
                        </div>

                        <div className="icon-item">
                            <img src={batteryIcon} alt="Прием батареек" />
                            <p>Прием батареек</p>
                        </div>
                    </div>

                </div>
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
            type: markerTypes[markerType].type,
            ownerId: localStorage.getItem('currentUserId')
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
                    <select name="" id="" onChange={e => { setMarkerType(e.target.value) }}>
                        {Object.keys(markerTypes).map(typeItem =>
                            <option value={typeItem}>{markerTypes[typeItem].localization}</option>)}
                    </select>
                    <button onClick={() => toCreateMarker()}>Создать метку</button>
                </div>
            </div>
        </div>
    )
}

const MarkerInfo = () => {
    const dispatch = useDispatch();
    const markerId = sessionStorage.getItem('markerId');
    const [marker, setMarker] = useState({});
    const [address, setAddress] = useState('');

    const currentUserId = localStorage.getItem('currentUserId');

    useEffect(() => {
        getMarkerById(markerId).then(response => {
            setMarker(response);
            geocode(response?.coordinates)
                .then(res => setAddress(res));
        });
    }, []);

    return (
        <div className="dialog">
            <div className="dialog-container">
                <div className="close-button">
                    <img src={closeIcon} alt="закрыть" onClick={() => dispatch(changeMarkerInfoDialogAction())} />
                </div>
                <h2>{marker?.title}</h2>
                <p>{address}</p>
                {
                    (currentUserId === marker?.ownerId) ?
                        <button className='' onClick={() => {
                            dispatch(deleteMarker(marker.id));
                            dispatch(changeMarkerInfoDialogAction());
                            sessionStorage.removeItem('markerId');

                        }}>Удалить метку</button>
                        : ''
                }
            </div>
        </div>
    )
}