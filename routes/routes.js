const router = require('router');
const express = require('express');

const Url = require('../models/schema');

const app = express();

// Create a new URL

// getting the url
router.get('/', (req, res) => {
    res.send('URL Shortener API is running');
});


router.post('/api/url/shorten', async (req, res) => {
    const { originalUrl } = req.body;

    try {
        let url = await Url
            .findOne({ originalUrl })
            .select('shortUrl');

        if (url) {
            return res.json(url);
        }

        const shortUrl = Math.random().toString(36).substr(2, 7);
        const newUrl = new Url({
            originalUrl,
            shortUrl,
        });
        await newUrl.save();
        res.json(newUrl);
    } catch (error) {
        console.error('Error creating short URL:', error);
        res.status(500).json('Server error');
    }
});
