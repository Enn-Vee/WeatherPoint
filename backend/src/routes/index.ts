import { Request, Response } from 'express'
/* ROUTES */
module.exports = (passport:any) => {
    const express = require('express');
    const router = express.Router();
    
    router.use('/auth', require('./auth.ts')(passport))
    router.use('/bookmarks', require('./bookmarks.ts')(passport))
    router.use('/location/', require('./location.ts')(passport))
    router.post('/logout', (req:Request, res:Response) => {
        req.logOut();
        res.send('logged out')
    })
    
    return router;
};