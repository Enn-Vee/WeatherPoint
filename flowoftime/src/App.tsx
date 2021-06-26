import React, { useEffect, useState } from 'react';
import InfoScreen from './components/MainScreen/InfoScreen';
import WeatherMap from './components/WeatherMap/WeatherMap'
import LatLngObject from './interfaces/Coordinates';
import './App.css'

function App() {

  const [center, setCenter] = useState<LatLngObject>({ lat: 39.952584, lng: -75.165221 })

  useEffect(() => {
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
    <div className="App" style={{ overflow: "hidden" }}>
      <div className="row map-and-info">
          <InfoScreen />
          <WeatherMap {...center} />
      </div>
    </div>
  );
}

export default App;
