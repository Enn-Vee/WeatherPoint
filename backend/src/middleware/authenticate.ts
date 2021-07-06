import { NextFunction, Request, Response } from "express";

const authenticate = (passport: any) => async (req:Request, res:Response, next:NextFunction) => {
    if(req.isAuthenticated())
        next();
    else 
        res.status(401).send('not logged in')
}

module.exports = authenticate;