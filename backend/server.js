const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const ShortUrlRouter = require('./routers/shorturl.router')
const app = express();

// .env
require('dotenv').config();

// logger middleware
app.use(morgan('dev'));

// allow cross-origin communication
app.use(cors());

// parsers
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// port
const PORT = process.env.PORT || 5000

// mongodb connection
mongoose.connect(
    process.env.ATLAS_URI,
    {useNewUrlParser: true, useUnifiedTopology: true}
);
const connection = mongoose.connection;
connection.on('error', err=> {
    console.error(err);
})
connection.once('connected', (err, res)=> {
    console.log("Database Connection has been Established!");
    app.listen(PORT, ()=> {
        console.log('Server listening in port', PORT);
    });
})

// routes

app.use('/shorturl', ShortUrlRouter);
