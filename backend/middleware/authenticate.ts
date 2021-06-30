import { NextFunction } from "express";

const authenticate = (passport: any) => async (req:any, res:any, next:NextFunction) => {
    if(req.isAuthenticated())
        next();
    else 
        res.status(401).send('not logged in')
}

module.exports = authenticate;