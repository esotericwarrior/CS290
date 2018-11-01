/****************************************************************************
* Author: Tristan Santiago                                                  *
* Title: index.js                                                           *
* Date: 5/20/2018                                                           *
* Description: This is a single page web application that uses one URL to   *
* receive both incoming GET and POST requests and can differentiate between *
* the two in order to handle them properly.                                 *
****************************************************************************/
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 4142);

/************************************************************
*               app.get("/"", function(req, res)            *
* This is the function for the get request.                 *
************************************************************/
app.get("/", function(req, res)
{
	var qParams = [];
	for (var p in req.query)
	{
		qParams.push({'name': p, 'value': req.query[p]});   // Push the name, followed by the value into a table.
	}
	var context = {};
	context.dataList = qParams;
	res.render('get', context);                             // Print the filled table to the browser.
});
/************************************************************
*               app.post("/"", function(req, res)           *
* This is the function for the post request.                *
************************************************************/
app.post("/", function(req, res)
{
	var qParams = [];
	for (var p in req.query)
	{
		qParams.push({'name': p, 'value': req.query[p]});   // Push the name, followed by the value into a table.
	}
    var bParams = [];
	for (var b in req.body)
	{
		bParams.push({'name': b, 'value': req.body[b]});    // Push the name, followed by the value into a table.
	}
	var context = {};
	context.queryList = qParams;
    context.bodyList = bParams;
	res.render('post', context);                            // Print the filled table to the browser.
});
/************************************************************
*               app.use(function(req, res)                  *
* This function displays a 404 error message if something   *
* goes wrong.                                               *
************************************************************/
app.use(function(req, res)
{
	res.status(404);                                        // Set status to 404.
	res.render("404");                                      // Print the 404 error message.
});
/************************************************************
*               app.use(function(err, req, res, next)       *
* This function displays a 500 error message if something   *
* goes wrong and is not picked up by the 404 error.         *
************************************************************/
app.use(function(err, req, res, next)
{
	console.log(err.stack);                                 // Prints error message to console for debugging.
	res.status(500);                                        // Set status to 500.
	res.render("500");                                      // Print 500 error message.
});

app.listen(app.get("port"), function()
{
	console.log("Express started on port 4142");            // Print this to the console.
});