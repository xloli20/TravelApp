const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios');

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
app.use(express.static('dist'))

const fetch = require('node-fetch')

app.get('/', function (req, res) {
     res.sendFile('dist/index.html');
     //res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
let port = 8000;
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})


const username_GeoNames = process.env.username_GeoNames;
const API_URL_GeoName = `http://api.geonames.org/findNearbyPostalCodesJSON?username=${username_GeoNames}&placename=`;
const API_KEY_Weatherbit = process.env.API_KEY_Weatherbit;
const API_URL_Weatherbit = `https://api.weatherbit.io/v2.0/forecast/daily?key=${API_KEY_Weatherbit}&city=`;
const API_KEY_Pixabay = process.env.API_KEY_Pixabay;
const API_URL_Pixabay = `https://pixabay.com/api/?key=${API_KEY_Pixabay}&q=`;

app.post('/cordinates', async (request, response) => {
    let input = request.body.city;
    let data = await getData(API_URL_GeoName + input)
    response.json({
        userInput: input,
        apiData: data
    })
})


let getData = async (url) => {
    const request = await fetch(url);
    try {
        const data = await request.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

app.post('/weather', async (request, response) => {
    let input = request.body.city;
    let data = await getData(API_URL_Weatherbit + input)
    response.json({
        userInput: input,
        apiData: data
    })
})


let getData = async (url) => {
    const request = await fetch(url);
    try {
        const data = await request.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

app.post('/photo', async (request, response) => {
    let input = request.body.query;
    let data = await getData(API_URL_Pixabay + input)
    response.json({
        userInput: input,
        apiData: data
    })
})

let getData = async (url) => {
    const request = await fetch(url);
    try {
        const data = await request.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
}