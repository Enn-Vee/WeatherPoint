export {};
import {Request,  Response} from 'express'


interface PassportRequest extends Request {
    user?: any;
}

exports.getUser = (req:PassportRequest, res:Response) => {
    res.send(req.user);
}
