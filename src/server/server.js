// Setup empty JS object to act as endpoint for all routes
projectData = {
};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));


// Setup Server
const port = 8000;
app.listen(port, () =>
    console.log(`server running : open http://localhost:${port}`)
);

//GET
app.get('/GET', (req, res) =>
    res.send(projectData));
console.log("get projectData:" + JSON.stringify(projectData));

//POST
app.post('/POST', (req, res) => {
    const body = req.body;
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.content = req.body.content;

    console.log("post projectData:" + JSON.stringify(projectData));
    res.status(200).json(projectData);
}
);