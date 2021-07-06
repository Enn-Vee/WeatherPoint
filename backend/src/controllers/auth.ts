export {};
import { Request, Response } from "express"

const User = require('../models/User')

interface PassportRequest extends Request {
    user?: any;
}

exports.getUser = (req:PassportRequest, res:Response) => {
    if(req.user === undefined) {
        res.send(null);
        return;
    }
    const query = User.findOne({_id: req.user.id}).select('-firstLogIn -lastLoggedIn -__v');
    query.exec((error:Error, result:Object) => {
        if(error)
            throw error;
        res.send(result)
    })
}
