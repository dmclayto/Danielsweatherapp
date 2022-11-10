// Setup empty JS object to act as endpoint for all routes
 let projectData = {};
 let weatherbitData ={};
 let timeData = {};

// Require Express  to run server and routes
const express = require ('express');

// Start up an instance of app
const app = express ();

// Dependencies
const bodyParser = require ('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

// Cors for cross origin allowance
const cors = require ('cors');
const { request } = require('http');

app.use(cors ());

// Initialize the main project folder
app.use(express.static('website'));



// Setup Server

let port = process.env.PORT;
if (port == null || port == "") {
 port = 8089;
}
app.listen(port);

// Callback to debug

    console.log (port,"the server is running");
    console.log (`running on localhost: ${port}`);


//  GET '/all' 
app.get ('/all', (request, response) => {
  response.send(projectData)
 
});

app.get ('/more', (request, response) => {
  response.send(weatherbitData)
 
});

app.get ('/time', (request, response) => {
  response.send(timeData)
 
});

  



//POST route for open weather map

app.post('/post', addApi);

function addApi(request, response) {
  console.log("server side data:", request.body);
  let newEntry = [
    {temp: request.body.temp}, {town: request.body.town},{temp_max: request.body.temp_max},{temp_min: request.body.temp_min}, {humidity: request.body.humidity}, {pressure: request.body.pressure}, {wind: request.body.wind}, {description: request.body.description}, {icon: request.body.icon}, {timezone: request.body.timezone}, {clouds: request.body.clouds}];

   

projectData = newEntry;
  console.log(projectData);
  response.send(projectData);
}

   

//post route for weather bit
app.post('/postMore', (request, response)=>{

  
  
  let newEntry = request.body;
    weatherbitData["statecode"] = newEntry.statecode;
    weatherbitData ["timezone"] = newEntry.timezone
  console.log(weatherbitData);
  response.send(weatherbitData);
}
);

//post route for time data

app.post('/postTime', (request, response)=>{
  let newEntry = request.body;
  timeData ["time"] = newEntry.time;
 timeData ["dayOfWeek"] = newEntry.dayOfWeek;
 timeData ["date"] = newEntry.date;
  
  
   
  console.log(timeData);
  response.send(timeData);
}
);
