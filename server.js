const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose'); //https://mongoosejs.com/docs/index.html
const cheerio = require('cheerio');
const axios = require('axios');

const EXPRESS_PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log("Connected to mongoose database.");
	var kittySchema = new mongoose.Schema({
		name: String
	});
	var Kitten = mongoose.model('Kitten', kittySchema);
	var myKitten = new Kitten({ name: 'Holly' });
	console.log("My kitten is named:", myKitten.name); // 'Holly'
	myKitten.save((err, myKitten) => {
		console.log("Saved kitten:", myKitten.name);
	})
});



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