import { Request, Response } from "express";

let axios = require('axios');

exports.getWeatherData = (req: Request, res: Response) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.lng}&unit=${req.query.unit}&appid=${process.env.OPENWEATHERMAP_API_KEY}`)
    .then((result:any) => {
        res.send(result.data);
    })
    .catch((e:Error) => {
        console.log(e);
    })
}

exports.getTimezone = (req:Request, res: Response) => {
    axios.get(`https://api.timezonedb.com/v2.1/get-time-zone?by=position&lat=${req.query.lat}&lng=${req.query.lng}&format=json&key=${process.env.TIMEZONEDB_API_KEY}`)
    .then((result:any) => {
        res.send(result.data)
    })
    .catch((e:Error) => {
        console.log(e)
    })
}