export default interface OpenWeatherMap {
    base: string,
    clouds: CloudInfo,
    cond: number,
    coord: Coordinates,
    dt: number,
    id: number,
    main: MainInfo,
    name: string,
    sys: SysInfo,
    timezone: number,
    visibility: number,
    weather: Array<WeatherInfo>,
    countryName?: string,
    wind: WindInfo
}

interface CloudInfo {
    all: number
}

interface Coordinates {
    lat: number,
    lon: number
}

interface MainInfo {
    feels_like: number,
    humidity: number,
    pressure: number,
    temp: number,
    temp_max: number,
    temp_min: number
}

interface SysInfo {
    country: string,
    id: number,
    sunrise: number,
    sunset: number,
    type: number
}

interface WeatherInfo {
    description: string,
    icon: string,
    id: number,
    main: string
}

interface WindInfo {
    deg: number,
    gust: number,
    speed: number
}