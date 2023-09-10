const express = require('express');
const axios = require('axios');

const app = express();
const port = 8008;

async function fetchNumbersFromUrl(url) {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const data = response.data;
      return data.numbers || [];
    }
  } catch (error) {
    // Handle errors or ignore them
  }
  return [];
}

app.get('/numbers', async (req, res) => {
  const urls = req.query.url || [];
  let mergedNumbers = [];

  for (const url of urls) {
    const numbers = await fetchNumbersFromUrl(url);
    mergedNumbers = [...mergedNumbers, ...numbers];
  }

  mergedNumbers = Array.from(new Set(mergedNumbers)); // Remove duplicates
  mergedNumbers.sort((a, b) => a - b); // Sort in ascending order

  res.json({ numbers: mergedNumbers });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/numbers`);
});
