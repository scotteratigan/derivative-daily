# derivitave-daily
A full-stack web app featuring scraped articles from NPR.org.

### Utilizes:
- express
- express-handlebars
- mongoose
- cheerio
- axios
- bootstrap / jQuery / fontawesome
- eslint linting to enforce style guidelines (using AirBnB rules)
- morgan to log requests (dev only)
- mocha & chai for unit testing (dev only)

### What it does:
- Scrapes the current headlines from https://www.npr.org/sections/news/
- If each article is not already in the article db, adds it.
- Adds scraping timestamp so newest articles are displayed first.
- Links users to read articles in a new window.
- Allows users to save comments on stories in a notes db.
- Allows users to delete comments.
- Deletes the comment itself as well as the reference to the comment in the articleDB.

### To install yourself:
- Clone the repo
- npm install
- node server (or just nodemon if you have that installed)
- open browser to http://localhost:3000

### Links:
- [View the live app](https://derivative-daily.herokuapp.com/ "derivative-daily on heroku")
- [LinkedIn Page](https://www.linkedin.com/in/scotteratigan/ "Scott E Ratigan on LinkedIn")

