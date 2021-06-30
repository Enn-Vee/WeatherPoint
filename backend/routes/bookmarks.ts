export{}
const bookmarks = require("../controllers/bookmarks");
const authenticate = require("../middleware/authenticate")

module.exports = (passport: any) => {
    const express = require('express');
    const router = express.Router();
    
    router.get('/', authenticate(passport), bookmarks.getBookmarksByID);
    router.post('/', authenticate(passport),bookmarks.addBookmarkToID);
    router.delete('/', authenticate(passport), bookmarks.deleteBookmarkFromID);

    return router;
}