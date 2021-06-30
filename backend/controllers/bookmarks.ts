export {}
import {Request, Response} from 'express'

interface PassportRequest extends Request {
    user?: any;
}

const User = require('../models/User')

exports.getBookmarksByID = (req: PassportRequest, res: Response) => {
    const query = User.findOne({_id: req.user._id}).select("bookmarks")
    query.exec((error:any, result:any) => {
        if(error)
            throw error;
        res.send(result.bookmarks)
    })
}

exports.addBookmarkToID = (req: PassportRequest, res: Response) => {
    const query = User.findOneAndUpdate({_id: req.user._id}, {$push: {bookmarks: req.body}}, {new: true}).select('bookmarks');
    query.exec((error:Error, result:any) => {
        if(error)
            throw error;
        res.send(result.bookmarks)
    })
}

exports.deleteBookmarkFromID = (req: PassportRequest, res: Response) => {
    const query = User.findOneAndUpdate({_id: req.user._id}, {$pull: {bookmarks: req.body}}, {new: true}).select('bookmarks');
    query.exec((error:Error, result: any) => {
        if(error)
            throw error;
        res.send(result.bookmarks)
    })
}