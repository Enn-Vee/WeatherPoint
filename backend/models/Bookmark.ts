export {}
const mongoose = require('mongoose');

const BookmarkSchema = mongoose.Schema({
    name: String,
    country: String,
    notes: {
        type: String,
        required: false
    },
    latitude: Number,
    longitude: Number
})


exports.BookmarkModel = mongoose.model('Bookmark', BookmarkSchema)
exports.BookmarkSchema = BookmarkSchema;
