export {}
const mongoose = require('mongoose');

const BookmarkSchema = mongoose.Schema({
    name: String,
    latitude: Number,
    longitude: Number
})


exports.BookmarkModel = mongoose.model('Bookmark', BookmarkSchema)
exports.BookmarkSchema = BookmarkSchema;
