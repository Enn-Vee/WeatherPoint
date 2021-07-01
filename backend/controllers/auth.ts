export {};
const User = require('../models/User')

interface PassportRequest extends Request {
    user?: any;
}

exports.getUser = (req:any, res:any) => {
    const query = User.findOne({_id: req.user.id}).select('-firstLogIn -lastLoggedIn -__v');
    query.exec((error:Error, result:Object) => {
        if(error)
            throw error;
        res.send(result)
    })
}
