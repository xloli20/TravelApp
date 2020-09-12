const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const mockAPIResponse = require('./mockAPI.js')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
app.use(express.static('dist'))


const fetch = require('node-fetch')


app.get('/', function (req, res) {
     res.sendFile('dist/index.html');
       // res.sendFile(path.resolve('src/client/views/index.html'))

})

// designates what port the app will listen to for incoming requests
let port = 8000;
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})

app.get('/api', function (req, res) {
    res.send(mockAPIResponse);
})


let API_KEY = process.env.API_KEY;
let baseURL = `https://api.meaningcloud.com/sentiment-2.1?key=${API_KEY}&of=json&lang=en&model=general&txt=`

app.post('/sentimentAnalysis', async (request, response) => {
    let input = request.body.url;
    let data = await getData(baseURL + input)
    response.json({
        userInput: input,
        apiData: data
    })
})


let getData = async (baseURL) => {
    const request = await fetch(baseURL);
    try {
        const data = await request.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
}