const ShortUrlModel = require('../models/shorturls.model');
const { nanoid } = require('nanoid');

// route handlers
const getShortUrls = (req, res) => {
    ShortUrlModel.find().sort({createdAt: -1})
        .then(docs => {
            res.json(docs);
        })
        .catch(err=> {
            console.error(err);
        })
}

const addShortUrl = (req, res) => {
    const fullUrl = req.body.full_url;
    const shortid = nanoid();

    const shortUrlDoc = new ShortUrlModel({
        fullUrl,
        shortUrl: shortid,
        clicks: 0
    })

    shortUrlDoc.save()
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            console.error(err);
            res.json({
                message: 'error found'
            })
        })
    
}

const redirectShortUrl = async (req, res)=> {
    const shorturl_id = req.params.id;

    try {
        const shorturl_doc = await ShortUrlModel.findOne({shortUrl: shorturl_id});
        
        res.json(shorturl_doc);
    }catch(err) {
        console.error(err);
    }
        
}

module.exports = {
    getShortUrls,
    addShortUrl,
    redirectShortUrl
}