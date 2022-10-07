// use the express library
const express = require('express');

// Add html-entities to avoid XSS cross scripting
const {encode} = require('html-entities');

// Add Cookie-parser
const cookieParser = require('cookie-parser');

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

// Instantiate App
app.use(cookieParser());

// Add visitorId
let nextVisitorId = 1;

// The main page of our website
app.get('/', (req, res) =>{
    // console.log(req.headers.cookie);
    console.log(req.cookies);

    // Set/Get Visitor Id Cookie
    let visitorId;
    if(req.cookies.visitorId == undefined){
        visitorId = nextVisitorId++;
        res.cookie('visitorId', visitorId);
    }
    else{
        visitorId = req.cookies.visitorId;
    }

    // Set Visited TimeStamp and Get Last Visit Time
    let lastVisited;
    if(req.cookies.visited){
        timediff = Math.round((Date.now().toString()-req.cookies.visited)/(1000));
        lastVisited = "It has been "+timediff+" seconds since your last visit.";
    }
    else{
        lastVisited = "you have never visited";
    }
    res.cookie('visited', Date.now().toString());   
    
    // Render EJS Template with Variables
    res.render('welcome', {
        name: encode(req.query.name) || "World",
        datestring: new Date().toLocaleString(),
        visitorId: visitorId,
        lastVisited: lastVisited,
    });

    // // reads the url parameter - http://domain/?name=text
    // const name = req.query.name || "World";
    // res.send(`
    //     <!DOCTYPE html>
    //     <html lang="en">
    //         <head>
    //             <meta charset="UTF-8" />
    //             <title>An Example Title</title>
    //             <link rel="stylesheet" href="app.css">
    //         </head>
    //         <body>
    //             <h1>Hello, ${encode(name)}!</h1>
    //             <p>HTML is so much better than a plain string!</p>
    //         </body>
    //     </html>
    // `);
});

// Start listening for network connections
app.listen(port);

// Printout for readability
console.log("Server Started!");