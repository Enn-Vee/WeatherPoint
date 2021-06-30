import React, { useState, useCallback, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import LatLngObject from '../../interfaces/Coordinates';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeCoordinates } from '../../redux/reducers/coordinatesReducer';
import { toggleIsMap } from '../../redux/reducers/isMapReducer';
import { Button, FormControlLabel, Switch } from '@material-ui/core'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import "./WeatherMap.css"

function WeatherMap(center: LatLngObject) {

    const [map, setMap] = useState<GoogleMap | null>(null);
    const [showBookmarked, setShowBookmarked] = useState<boolean>(true);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY as string
    })
    const dispatch = useAppDispatch();
    const { lat, lng } = useAppSelector(state => state.coordinates)
    const isMap = useAppSelector(state => state.isMap);
    const user = useAppSelector(state => state.user)

    const onLoad = useCallback((map) => {
        setMap(map);
    }, [])

    const onUnmount = useCallback((map) => {
        setMap(null);
    }, [])

    useEffect(() => {
        if (map) {
            map.panTo({ lat: lat, lng: lng })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lat, lng])

    const handleMapClick = (e: google.maps.MapMouseEvent): void =>{
        dispatch(changeCoordinates({ lat: e.latLng.lat(), lng: e.latLng.lng() }))
    }

    const toggleShowBookmark = () => {
        setShowBookmarked(prev => !prev)
    }

    return (
        <div id="map" className={`col-md-6 ${isMap ? 'show-screen' : ''}`} style={{ padding: 0, margin: 0}}>
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
                    { showBookmarked && user?.bookmarks?.map(bookmark => {
                        return (
                            <Marker position= {{lat: bookmark.latitude, lng: bookmark.longitude}} />
                        );
                    })}
                </GoogleMap> : null}

                <Button id="toggle-button" onClick={(e) => {
                        e.preventDefault()
                        dispatch(toggleIsMap())
                    }}>Back To Main</Button>
                {user ? <FormControlLabel
                    id="bookmark-button"
                    value="end"
                    control={<Switch color="primary" checked={showBookmarked} onChange={toggleShowBookmark} />}
                    label="Show Bookmarked"
                    labelPlacement="end"
                /> : null}
        </div>
    )
}

export default WeatherMap
