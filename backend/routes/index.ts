import {} from 'passport'
/* ROUTES */
module.exports = (passport:any) => {
    const express = require('express');
    const router = express.Router();
    
    //router.use('/user', require('./user.ts')(passport));
    router.use('/auth', require('./auth.ts')(passport))
    router.use('/bookmarks', require('./bookmarks.ts')(passport))
    router.post('/logout', (req:any, res:any) => {
        req.logOut();
        res.send('logged out')
    })
    
    return router
};