require('dotenv').config();

const express = require('express');
const app = express();
const dns = require('dns');
import { isValid, generateShortCode } from 'utils/js/utility'

const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static('/public'));

const urlDatabase = {};

app.post('/api/shorturl', (req, res)=>{
    c
})

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/views/index.html');
});

app.post('/api/shorturl', (req, res) => {
   const originalurl = req.body.url;

   if(!isValid(originalurl)){
       return res.json({error: "invalid url"});
   }
   const shorturl = generateShortCode();
   urlDatabase[shorturl] = originalurl;

   res.json({
       originalurl: originalurl,
       shorturl: shorturl
   });
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
