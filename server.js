// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies*/
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
// create a server working on a port
const port = 1234;
// call back to start the server
const server = app.listen(port, ()=>{console.log(`Localhost: ${port}`)});

// Get route to return projectData object
app.get('/get', getData);
// Callback function to complete GET '/get'
function getData(req,res){
// return the projectdata    
    res.send(projectData);
}

//Post route to add the incoming data to the projectData object
app.post('/add', postData);
// callback function to POST '/add' 
function postData(req,res){
// Receive data from request body    
    projectData= req.body;
// add the data to projectData opject    
    res.send(projectData)
    }

    