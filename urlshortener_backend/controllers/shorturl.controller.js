const ShortUrlModel = require('../models/shorturls.model');
const { nanoid } = require('nanoid');
const validator = require('validator');

// route handlers

const getShortUrls = (req, res) => {
    ShortUrlModel.find().sort({createdAt: -1})
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(404).json({ error_message: err.message })
        })
}

const addShortUrl = async (req, res) => {
    const fullUrl = req.body.full_url;
    const shortid = nanoid();

    const shortUrlDoc = new ShortUrlModel({
        fullUrl,
        shortUrl: shortid,
        clicks: 0
    })

    shortUrlDoc.save()
        .then(doc => {
            res.status(201).json({ redirect: '/' });
        })
        .catch(error => {
            res.status(409).json({ error_message: error.message })
        })
    
}

const getUrlRedirect = async (req, res) => {
    const shorturl_id = req.params.id;

    try {
        const shorturl_doc = await ShortUrlModel.findOne({shortUrl: shorturl_id});
        console.log(shorturl_doc.updatedAt);
        // update click count
        res.locals.incrementClickCount(shorturl_doc);
        
        res.status(200).json({ redirect: shorturl_doc.fullUrl })
    }catch(error) {
        res.status(404).json({ error_message: error.message })
    }
}

const deleteShortUrl = async (req, res) => {
    const shorturl_id = req.params.id;
    
    try {
        await ShortUrlModel.deleteOne({shortUrl: shorturl_id});
        res.sendStatus(204);
    }catch(error) {
        res.status(404).json({ error_message: error.message });
    }
}

// custom middlewares

const validateUrl = (req, res, next) => {
    const urlReceived = req.body.full_url;

    if(!validator.isURL(urlReceived)) {
        res.status(422).json({ error_message: 'The URL is not valid.'});
    } else {
        next();
    }
}

const updateClickCount = (req, res, next) => {
    res.locals.incrementClickCount =  async (doc) => {
        if(!doc) {
            res.sendStatus(404);
        } else {
            doc.clicks++;

            try {
                await doc.save();
            }catch(error) {
                res.status(409).send({ error_message: error.message});
            }        
        }
    }
    next();
}
module.exports = {
    getShortUrls,
    addShortUrl,
    getUrlRedirect,
    deleteShortUrl,
    validateUrl,
    updateClickCount
}