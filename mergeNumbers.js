const axios = require('axios');

// Function to fetch numbers from a URL
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

// Array of URLs to fetch
const urls = [
  'http://20.244.56.144/numbers/primes',
  'http://20.244.56.144/numbers/fibo',
  'http://20.244.56.144/numbers/odd',
];

// Function to merge and display numbers
async function mergeAndDisplayNumbers() {
  let mergedNumbers = [];

  // Fetch numbers from each URL
  for (const url of urls) {
    const numbers = await fetchNumbersFromUrl(url);
    mergedNumbers = [...mergedNumbers, ...numbers];
  }

  // Remove duplicates and sort in ascending order
  mergedNumbers = Array.from(new Set(mergedNumbers));
  mergedNumbers.sort((a, b) => a - b);

  // Display merged numbers
  console.log('Numbers:', mergedNumbers);
}

// Call the function to merge and display numbers
mergeAndDisplayNumbers();
