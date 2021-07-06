const location = require('../controllers/location')
const bookmarks = require("../controllers/bookmarks");

module.exports = (passport:any) => {
    const express = require('express');
    const router = express.Router();

    router.get('/weather', location.getWeatherData)
    router.get('/timezone', location.getTimezone)
    
    return router;
};