const express = require('express');
const router = express.Router();

const { 
    getShortUrls, 
    getUrlRedirect, 
    addShortUrl, 
    deleteShortUrl,
    validateUrl,
    updateClickCount} = require('../controllers/shorturl.controller');

router.get('/redirect', (req, res)=> {
    res.json({
        message: "NOOB!"
    })
})

router.get('/', getShortUrls);
router.post('/', validateUrl, addShortUrl);
router.get('/:id', updateClickCount, getUrlRedirect);
router.delete('/:id', deleteShortUrl);

module.exports = router;