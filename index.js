require('dotenv').config();

const express = require('express');
const app = express();
const { isValid, generateShortCode } = require('./utils/js/utility');

const cors = require('cors');
const {urlencoded} = require("body-parser");
app.use(cors({optionsSuccessStatus: 200}));
app.use(urlencoded({ extended: false }));
app.use(express.static('/public'));

const urlDatabase = {};

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/views/index.html');
});

const dns = require('dns');

app.post('/api/shorturl', (req, res) => {
    const original_url = req.body.url;

    if (!isValid(original_url)) {
        return res.json({ error: 'invalid url' });
    }

    try {
        const parsedUrl = new URL(original_url);
        dns.lookup(parsedUrl.hostname, (err, address, family) => {
            if (err || !address) {
                return res.json({ error: 'invalid url' });
            }

            const short_url = generateShortCode();
            urlDatabase[short_url] = original_url;

            res.json({ original_url: original_url, short_url: short_url });
        });
    } catch (error) {
        console.error(error);
        return res.json({ error: 'invalid url' }); // Catch any errors during URL parsing
    }
});

app.get('/api/shorturl/:short_url', (req, res) => {
    const shortCode = req.params.short_url;
    const original_url = urlDatabase[shortCode];

    if (original_url) {
        res.redirect(original_url);
    } else {
        res.status(404).json({ error: 'Short URL not found' });
    }
});

const listener = app.listen(process.env.PORT || 3000, ()=>{
    console.log("Your app is listening on port "+listener.address().port);
});
