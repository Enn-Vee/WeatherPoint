import {Request, Response, NextFunction} from 'express'

const auth = require('../controllers/auth.ts')
const authenticate = require('../middleware/authenticate')
const successLoginUrl = "http://localhost:3000/login/sucess"
const errorLoginUrl = "http://localhost:3000/login/error"

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
        failureRedirect: "http://localhost:4000/auth/google",
        successRedirect: "http://localhost:3000/login/success"
    }))

    return router;
}