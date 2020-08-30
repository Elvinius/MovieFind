require('dotenv').config();
const express = require("express");
const app = express();
const request = require("request");


app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
	res.render("landing");
});

app.get("/search", function(req, res) {
	res.render("search");
});

app.get("/results", function(req, res){
	const query = req.query.search; // we use req.query.search to add the search term with the name value search 
	let url = "http://www.omdbapi.com/?apikey=thewdb&s=" + query; 
	request(url, function(error, response,body) {
		if(!error && response.statusCode == 200){
			const data= JSON.parse(body);
			res.render("results", {data:data, query:query});
		}
	});
});

app.listen(process.env.PORT || 3000, function(){
	console.log("Movie app has started");
});