import {Request, Response, NextFunction} from 'express'

const auth = require('../controllers/auth.ts')
const authenticate = require('../middleware/authenticate')

interface PassportRequest extends Request {
    user?: any;
}

module.exports = (passport: any) => {
    const express = require('express');
    const router = express.Router();
    
    router.get('/user', authenticate(passport), auth.getUser);
    router.get('/google', passport.authenticate("google", {scope: ["profile", "email"]}))
    router.get('/google/callback', passport.authenticate("google",{
        failureMessage: "Cannot login to Google",
        failureRedirect: (process.env.NODE_ENV === "production" ? "https://api.weatherpoint.dev" : "http://localhost:4000") + "/auth/google",
        successRedirect: (process.env.NODE_ENV === "production" ? "https://weatherpoint.dev" : "http://localhost:3000")+"/login/success"
    }))

    return router;
}