const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const axios = require('axios');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
const EXPRESS_PORT = process.env.PORT || 3000;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

const app = express();
app.engine(
	"handlebars",
	exphbs({
	  defaultLayout: "main"
	})
);

app.set("view engine", "handlebars");

// Routes
// require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

app.listen(EXPRESS_PORT, () => {
	console.log(`Express running at: http://localhost:${EXPRESS_PORT}`);
});