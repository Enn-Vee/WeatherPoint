import React, { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import LatLngObject from '../../interfaces/Coordinates';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeCoordinates } from '../../redux/reducers/coordinatesReducer';
import { toggleIsMap } from '../../redux/reducers/isMapReducer';

function WeatherMap(center: LatLngObject) {

    const [map, setMap] = useState<GoogleMap | null>(null);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY as string
    })
    const dispatch = useAppDispatch();
    const { lat, lng } = useAppSelector(state => state.coordinates)
    const isMap = useAppSelector(state => state.isMap);

    const onLoad = useCallback((map) => {
        setMap(map);
    }, [])

    const onUnmount = useCallback((map) => {
        setMap(null);
    }, [])

    function handleMapClick(e: google.maps.MapMouseEvent): void {
        if (map) {
            map.panTo({ lat: e.latLng.lat(), lng: e.latLng.lng() })
        }
        dispatch(changeCoordinates({ lat: e.latLng.lat(), lng: e.latLng.lng() }))
    }

    return (
        <div id="map" className={`col-md-6 ${isMap ? 'show' : ''}`} style={{ padding: 0, margin: 0 }}>
            {isLoaded ?
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={center}
                    zoom={11}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    options={{ disableDefaultUI: true }}
                    onClick={(e) => {
                        handleMapClick(e);
                    }}
                >
                    <Marker position={{ lat: lat, lng: lng }} />
                </GoogleMap> : null}
                <button className="swap-button" onClick={(e) => {
                        e.preventDefault()
                        dispatch(toggleIsMap())
                    }} style={{position:"absolute", top:"2vh", left:"50%", transform:"translateX(-50%)"}}>Swap</button>
        </div>
    )
}

export default WeatherMap
