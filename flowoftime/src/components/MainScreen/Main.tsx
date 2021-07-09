import React, { useEffect } from 'react'
import {useAppDispatch} from '../../redux/hooks';
import WeatherMap from '../WeatherMap/WeatherMap';
import InfoScreen from './InfoScreen';
import { changeCoordinates } from '../../redux/reducers/coordinatesReducer';

function Main() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
                const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
                };
                dispatch(changeCoordinates(pos))
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
    <div className="row map-and-info">
          <InfoScreen />
          <WeatherMap />
    </div>
    )
}

export default Main
