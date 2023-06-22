const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3005;

app.use(cors());

app.get('/scrape-contacts', async (req, res) => {
  try {
    const { query } = req.query;

    const options = {
      method: 'GET',
      url: 'https://website-contacts-scraper.p.rapidapi.com/scrape-contacts',
      params: { query },
      headers: {
        'content-type': 'application/json',
        'Content-Security-Policy': "script-src 'self' 'https://ssl.google-analytics.com';",
        'X-RapidAPI-Key': '6c4153b579msh3b88fb9e42fb3dap1c3822jsn700d8fa34f4a',
        'X-RapidAPI-Host': 'website-contacts-scraper.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);
    const data = response.data;

    if (data.status === 'OK') {
      res.json(data);
    } else {
      res.status(500).json({ error: 'Failed to retrieve contact information.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
