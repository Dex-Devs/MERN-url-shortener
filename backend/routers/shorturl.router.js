const express = require('express');
const router = express.Router();

const { 
    getShortUrls, 
    redirectShortUrl, 
    addShortUrl, 
    deleteShortUrl} = require('../controllers/shorturl.controller');

router.get('/redirect', (req, res)=> {
    res.json({
        message: "NOOB!"
    })
})
router.get('/', getShortUrls);
router.post('/', addShortUrl);
router.get('/:id', redirectShortUrl);
// router.delete('/:id', deleteShortUrl());

module.exports = router;