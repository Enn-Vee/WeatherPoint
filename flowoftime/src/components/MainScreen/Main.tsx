import React, { useEffect, useState } from 'react'
import WeatherMap from '../WeatherMap/WeatherMap';
import InfoScreen from './InfoScreen';
import Coordinates from '../../interfaces/Coordinates'

function Main() {
    const [center, setCenter] = useState<Coordinates>({ lat: 39.952584, lng: -75.165221 })

    useEffect(() => {
        console.log(process.env.REACT_APP_BACKEND_URL);
        if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
            const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
            };
            setCenter(pos);
        })
    }, [])
    
    return (
    <div className="row map-and-info">
          <InfoScreen />
          <WeatherMap {...center} />
    </div>
    )
}

export default Main
