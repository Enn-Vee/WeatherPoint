import { Request, Response, NextFunction } from "express";

const dotenv = require('dotenv');
dotenv.config({path: './.env'});
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport: any = require('passport');

const app = express();
const db = require('./configs/database-configs')
require('./configs/passport-configs.ts');

const whitelist =  ['http://127.0.0.1:3000', 'http://localhost:3000'];
const prodWhitelist = ['https://weatherpoint.dev/', 'https://www.weatherpoint.dev/']
app.use(cors({
    credentials: true, 
    origin: process.env.NODE_ENV ==="production" ? 'https://weatherpoint.dev': "http://localhost:3000"
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge:1000*60*60*24, //Cookie lasts for 1 day.
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(require("./routes/")(passport));

app.listen(process.env.PORT || 4000, (err:Error) =>{
    if(err)
        console.log(err);
    else 
        console.log('Server running on port 4000'+'...')
})