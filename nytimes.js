const axios = require('axios'); // for grabbing page to scrape
const cheerio = require('cheerio'); // for scraping

const BASE_SCRAPING_URL = 'https://www.nytimes.com';

axios.get(BASE_SCRAPING_URL).then((response) => {
  // Load the HTML into cheerio and save it to a constiable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  const $ = cheerio.load(response.data);

  // An empty array to save the data that we'll scrape
  const results = [];

  // Select each element in the HTML body from which you want information.
  // NOTE: Cheerio selectors function similarly to jQuery's selectors,
  // but be sure to visit the package's npm page to see how it works
  $('a').each((i, element) => {
    try {
      const link = BASE_SCRAPING_URL + $(element).attr('href');
      const title = $(element).find('h2').text();
      if (link && title) {
        results.push({
          title,
          link,
        });
      }
    } catch (err) {
      console.error("One link didn't have a title...");
    }
  });
  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
});
