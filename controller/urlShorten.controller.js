import Url from "../models/schema.js"
import shortid from "shortid";


// logic for shortening the URL
export const shortenUrl = async (req, res) => {
    const { originalUrl } = req.body;

    // Validate the URL
    const urlRegex = /^(http|https):\/\/[^ "]+$/;
    if (!urlRegex.test(originalUrl)) {
        return res.status(400).json({ error: 'Invalid URL format' });
    }

    try {
        // Check if the URL already exists in the database
        let existingUrl = await Url.findOne({ originalUrl });
        if (existingUrl) {
            return res.status(200).json({ shortUrl: `http://localhost:8000/${existingUrl.shortUrl}` });
        }

        // Generate a unique short URL
        const shortUrl = shortid.generate();

        // Save the new URL in the database
        const newUrl = new Url({
            originalUrl,
            shortUrl,
        });

        await newUrl.save();

        // Return the shortened URL
        return res.status(201).json({ shortUrl: `http://localhost:8000/${shortUrl}` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error while shortening URL' });
    }

};

// logic for getting the original URL
export const getUrl = async (req, res) => {
    const shortUrl = req?.query?.shortUrl;
    try {
        // Find the original URL by the short URL
        const url = await Url.findOne({ shortUrl });

        if (!url) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        url.clickCount += 1;
        await url.save();

        // Redirect the user to the original URL
        return res.redirect(url.originalUrl);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error while retrieving URL' });
    }
};