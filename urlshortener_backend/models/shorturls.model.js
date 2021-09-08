const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShortUrlSchema = new Schema({
    fullUrl: {
        type: String,
        required: true,
        trim: true
    },
    shortUrl: {
        type: String,
        required: true,
        trim: true
    },
    clicks: {
        type: Number,
        required: true,
        trim: true
    }
},
    {timestamps: true}
);

const ShortUrlModel = mongoose.model('shorturls', ShortUrlSchema);

module.exports = ShortUrlModel;