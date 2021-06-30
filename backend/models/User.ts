export {};
const mongoose = require('mongoose')
const Bookmark = require('./Bookmark').BookmarkSchema
const findOrCreate = require('mongoose-find-or-create')

const UserSchema = mongoose.Schema({
    provider: {
        type: String,
        required: true
    },
    name: {
        type:String,
        required: true
    },
    googleID: {
        type: String,
        required : false
    },
    facebookID: {
        type: String,
        required : false
    },
    githubID: {
        type: String,
        required : false
    },
    email: {
        type: String,
        required : true
    },
    picture: {
        type: String ,
        required : true
    },
    firstLogIn: {
        type: Date,
        required: true,
        default: Date.now()
    },
    lastLoggedIn: {
        type:Date,
        required: true,
        default: Date.now()
    },
    bookmarks: {
        type: [Bookmark],
        required: false
    }
})

UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', UserSchema)
