import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import axios from 'axios'
import OpenWeatherMap from '../../interfaces/OpenWeatherMap';
import * as Moment from 'moment-timezone'
import { toggleIsMap } from '../../redux/reducers/isMapReducer';
import { setLanguage, setTimezone } from '../../redux/reducers/infoSettingsReducer';
import Footer from './Footer';
import NavBar from './NavBar';
import './InfoScreen.css'
import './backgrounds.css'



function InfoScreen() {
    const [weatherData, setWeatherData] = useState<OpenWeatherMap | null>(null)
    const [dateTime, setDateTime] = useState<Date>(new Date());
    const [isFetchingData, setIsFetchingData] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const { lat, lng } = useAppSelector(state => state.coordinates)
    const { timezone, unit, locale, language} = useAppSelector(state => state.infoSettings);
    const isMap = useAppSelector(state => state.isMap)

    useEffect(() => {
        const fetchWeatherInfo = async () => {
            await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&lang=${language}&units=${unit}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`)
                .then(res => {
                    console.log(res.data)
                    setWeatherData(res.data);
                })
                .catch(e => {
                    console.log(e);
                })
        }
        setIsFetchingData(true);
        fetchWeatherInfo();
        setIsFetchingData(false);
    }, [language, lat, lng, unit])

    useEffect(() => {
        const fetchTimezoneInfo = async() => {
            await axios.get(`https://api.timezonedb.com/v2.1/get-time-zone?by=position&lat=${lat}&lng=${lng}&format=json&key=${process.env.REACT_APP_TIMEZONEDB_API_KEY}`)
            .then(res => {
                dispatch(setTimezone(res.data.zoneName))
                console.log(res)
            })
            .catch(e => {
                console.log(e)
            })
        }
        fetchTimezoneInfo();
    }, [lat, lng])
    
    useEffect(() => {
        if (navigator)
            dispatch(setLanguage(navigator.language))
        let timeUpdate = setInterval(() => setDateTime(new Date()), 1000)
        return () => {
            clearInterval(timeUpdate);
        }
    }, [])

    const unitString = useMemo<string>(() => {
        let ret = '°C'
        if(unit === 'standard')
            ret = 'K'
        if(unit === 'imperial')
            ret = '°F'
        return ret;
    }, [unit])

    const latLongString = useMemo<string>(() => {
        let latitude:number = lat;
        let longitude:number = lng;
        let xDirection: string = 'E'
        let yDirection: string = 'N'

        if(latitude < 0) {
            latitude *= -1;
            yDirection = 'S'
        }
        if(longitude < 0) {
            longitude *= -1;
            xDirection = 'W'
        }
        return `${latitude.toFixed(3)}° ${yDirection}, ${longitude.toFixed(3)}° ${xDirection}`
    },[lat, lng]);


    return (
        <>
            {!isFetchingData ?
                <div className={`p-0 text-center col-md-6 background clear position-relative ${isMap ? '' : 'show'}`}>
                    <NavBar />
                    <div style={{position:"relative", paddingTop: "30px", paddingBottom:"26px"}}>
                        <div className="my-5">
                            <h1 id="time">
                                {dateTime.toLocaleTimeString(locale, {
                                    timeZone: (timezone?.length > 0) ? timezone : Moment.tz.guess()
                                })}
                            </h1>
                            <p id="day-date">
                                {dateTime.toLocaleDateString(locale, {
                                    timeZone: (timezone?.length > 0) ? timezone : Moment.tz.guess(),
                                    weekday: 'long',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                        {!(weatherData?.name.length === 0) ? 
                        <div>
                            <h3  style={{display:"inline"}}>{weatherData?.name}</h3> 
                            <img src={`https://www.countryflags.io/${weatherData?.sys.country}/flat/24.png`} alt={`Flag of ${weatherData?.sys.country.toUpperCase()}`}></img>
                        </div>: <h3>Unrecognized</h3>}
                        <p>{latLongString}</p>
                        <div className="">
                            {weatherData?.weather[0] ? <img src={require(`../../assets/openweathermap/${weatherData?.weather[0].icon}.svg`).default} height="250px" alt={weatherData?.weather[0].description} style={{margin:"-20px 0 0 0"}}></img> : null}
                        </div>
                        <div className="d-flex justify-content-center align-items-center mb-3">
                            <h1 className="mx">{weatherData?.main.temp + unitString}</h1>
                            <p>{weatherData?.main.feels_like + unitString}</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <div className="mx-5">
                                <i className="fas fa-tint"></i>
                                <i className="fas fa-percent"></i>
                                <p>{weatherData?.main.humidity}%</p>
                            </div>
                            <div className="mx-5">
                                <i className="fas fa-wind"></i>
                                <p>{weatherData?.wind.speed} {unit === 'imperial' ? 'miles/hr' : 'mi/h'}</p>
                            </div>
                            <div className="mx-5"> 
                                <i className="fas fa-cloud"></i>
                                <p>{weatherData?.clouds.all}%</p>
                            </div>

                        </div>
                        <button className="swap-button" onClick={(e) => {
                        e.preventDefault()
                        dispatch(toggleIsMap())
                    }}>To Map</button>
                    </div>
                    <Footer />
                    
                </div> : null}
        </>
    )
}

export default InfoScreen
