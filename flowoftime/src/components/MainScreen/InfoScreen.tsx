import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import axios from 'axios'
import OpenWeatherMap from '../../interfaces/OpenWeatherMap';
import * as Moment from 'moment-timezone'
import { setLanguage, setTimezone } from '../../redux/reducers/infoSettingsReducer';
import Footer from './Footer';
import NavBar from './NavBar';
import './InfoScreen.css'
import './backgrounds.css'
import { addBookmark, getBookmarks } from '../../redux/reducers/userReducer';
import {Fab, Tooltip, Snackbar} from '@material-ui/core/'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import RoomIcon from '@material-ui/icons/Room'
import ClipLoader from 'react-spinners/ClipLoader'

function InfoScreen() {
    const [weatherData, setWeatherData] = useState<OpenWeatherMap | null>(null)
    const [dateTime, setDateTime] = useState<Date>(new Date());
    const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const { lat, lng } = useAppSelector(state => state.coordinates)
    const { timezone, unit, locale, language} = useAppSelector(state => state.infoSettings);
    const user = useAppSelector(state => state.user)
    const isMap = useAppSelector(state => state.isMap)

    const fetchWeatherInfo = async () => {
        let query = {
            lat: lat.toString(),
            lng: lng.toString(),
            unit
        }
        let queryString: string = "?"+ new URLSearchParams(query).toString();
        await axios.get(process.env.REACT_APP_BACKEND_URL+'/location/weather'+queryString)
            .then(res => {
                setWeatherData(res.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    const fetchTimezoneInfo = async () => {
        let query = {
            lat: lat.toString(),
            lng: lng.toString()
        }
        let queryString: string = "?"+ new URLSearchParams(query).toString();
        await axios.get(process.env.REACT_APP_BACKEND_URL+'/location/timezone'+queryString)
        .then(res => {
            dispatch(setTimezone(res.data.zoneName))
        })
        .catch(e => {
            console.log(e)
        })
    }
    /**
     * Fetches weather data
     */
    useEffect(() => {
        
        setIsFetchingData(true);
        fetchWeatherInfo();
        setIsFetchingData(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language, unit])

    /**
     * Fetches timezone.
     */
    useEffect(() => {
        const fetchData = async () => {
            await fetchWeatherInfo();
            await fetchTimezoneInfo();
            setIsFetchingData(false);
        }
        setIsFetchingData(true)
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lat, lng])

    useEffect(() => {
        document.title = `Weather Point | ${weatherData?.name ? weatherData.name : "Unrecognized"}`
    },[weatherData?.name])

    /**
     * Real time clock. Also sets the language to the user's language when the user gives permission
     */
    useEffect(() => {
        if (navigator)
            dispatch(setLanguage(navigator.language))
        if(user)
            dispatch(getBookmarks());
        let timeUpdate = setInterval(() => setDateTime(new Date()), 1000)
        return () => {
            clearInterval(timeUpdate);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /**
     * Converts units
     */
    const unitString = useMemo<string>(() => {
        let ret = '°C'
        if(unit === 'standard')
            ret = 'K'
        if(unit === 'imperial')
            ret = '°F'
        return ret;
    }, [unit])

    /**
     * Returns coordinate string with cardinal directions.
     */
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

    const handleAddBookmark = async (e:React.MouseEvent) => {
        let bookmark = {
            name: weatherData?.name ? weatherData.name : "Unrecognized",
            country: weatherData?.sys.country ? weatherData.sys.country : "Unrecognized",
            latitude: lat,
            longitude: lng
        }
        dispatch(addBookmark(bookmark)).then(() => {
            setSuccess(true);
        })
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSuccess(false);
      };

    return (
        <div id="data" className={`container p-0 text-center col-md-6 background clear position-relative
        ${weatherData?.weather[0].icon.charAt(2) === 'n'? 'night' : ''} ${isMap ? '' : 'show-screen'}`}>
                    <NavBar />
                    {!isFetchingData ? <>
                    <div id="location-data">
                        {/* Time and location */}
                        <div>
                            <div>
                                <h1 id="time">
                                    {dateTime.toLocaleTimeString(locale, {
                                        timeZone: (timezone?.length > 0) ? timezone : Moment.tz.guess(),
                                        hour:"numeric",
                                        minute:"numeric"
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
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="d-flex flex-column mx-3">
                                 {!(weatherData?.name.length === 0) ?
                                    <div className="d-flex align-items-center justify-content-center">
                                        <h3>{weatherData?.name}</h3>
                                        <img className="mb-1 ms-1" src={`https://www.countryflags.io/${weatherData?.sys.country}/flat/24.png`} alt={`Flag of ${weatherData?.sys.country.toUpperCase()}`}></img>
                                    </div> : <h3>Unrecognized</h3>}
                                    <p>{latLongString}</p>
                                </div> 
                            </div>
                            {user ?
                            <Tooltip title="Bookmark" aria-label="bookmark-button" placement="right-start" arrow>
                                <Fab size="small" color="secondary" aria-label="bookmark-button" onClick={(e) => {
                                handleAddBookmark(e);
                                }}>
                                    <RoomIcon />
                                </Fab>
                            </Tooltip>
                             : null}
                        </div>
                        {/* Weather condition image */}
                        <div className="">
                            {weatherData?.weather[0] ? <img id="condition-image" src={require(`../../assets/openweathermap/${weatherData?.weather[0].icon}.svg`).default} height="250px" alt={weatherData?.weather[0].description} ></img> : null}
                        </div>
                        {/* Temperature */} 
                        <div className="d-flex justify-content-center align-items-center mb-3">
                            <h1 className="mx">{weatherData?.main.temp + unitString}</h1>
                        </div>
                        {/* Wind, cloud, and humidity information */}
                        <div className="d-flex align-items-center justify-content-center"> 
                            <div className="mx-5">
                                <i className="fas fa-tint"></i>
                                <i className="fas fa-percent"></i>
                                <p>{weatherData?.main.humidity}%</p>
                            </div>
                            <div className="mx-5">
                                <i className="fas fa-wind"></i>
                                <p>{weatherData?.wind.speed} {unit === 'imperial' ? 'mi/h' : 'm/s'}</p>
                            </div>
                            <div className="mx-5"> 
                                <i className="fas fa-cloud"></i>
                                <p>{weatherData?.clouds.all}%</p>
                            </div>
                        </div>
                    </div>
                    </> : 
                    <div className="flex-grow-1">
                        <div className= "position-absolute" style={{top:"50%", left:"50%", transform:"translate(-50%, -50%)"}}>
                            <ClipLoader size={100} color={weatherData?.weather[0].icon.charAt(2) === 'n' ? "#FFFFFF" : "#000000"}/>
                        </div>
                    </div>}     
                    <Footer />    
                    <Snackbar  anchorOrigin={{vertical:'bottom', horizontal:'left'}} open={success} autoHideDuration={2000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                            Successfully bookmarked location!
                        </Alert>
                    </Snackbar> 
        </div>
    )
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default InfoScreen
