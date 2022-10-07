// use the express library
const express = require('express');

// Add html-entities to avoid XSS cross scripting
const {encode} = require('html-entities');

// create a new server application
const app = express();

// Define the port we will listen on
// (it will attempt to read an environment global)
// first, that is for when this is used on the real
// world wibe web
const port = process.env.PORT || 3000;

// Serve Static Files
app.use(express.static('public'))

// Set the view engine to ejs
app.set('view engine', 'ejs');

// The main page of our website
app.get('/', (req, res) =>{

    // reads the url parameter - http://domain/?name=text
    const name = req.query.name || "World";

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <title>An Example Title</title>
                <link rel="stylesheet" href="app.css">
            </head>
            <body>
                <h1>Hello, ${encode(name)}!</h1>
                <p>HTML is so much better than a plain string!</p>
            </body>
        </html>
    `);
});

// Start listening for network connections
app.listen(port);

// Printout for readability
console.log("Server Started!");