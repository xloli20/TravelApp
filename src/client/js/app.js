const dotenv = require('dotenv');
dotenv.config();

/* Global Variables */
const username_GeoNames = process.env.username_GeoNames;
const API_URL_GeoName = `http://api.geonames.org/findNearbyPostalCodesJSON?username=${username_GeoNames}&placename=`;
const API_KEY_Weatherbit = process.env.API_KEY_Weatherbit;
const API_URL_Weatherbit = `https://api.weatherbit.io/v2.0/forecast/daily?key=${API_KEY_Weatherbit}&city=`;
const API_KEY_Pixabay = process.env.API_KEY_Pixabay;
const API_URL_Pixabay = `https://pixabay.com/api/?key=${API_KEY_Pixabay}&q=`;
const port = 8000;

// Create a new date instance dynamically with JS
let d = new Date();
let date = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const performAction = async (e) => {
  e.preventDefault();
  const zipCode = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;

  let wetherdata = await getWeather(API_URL, zipCode, API_KEY);
  let temp = wetherdata.main.temp;
  const data = {
    date,
    temp,
    content,
  }

  await postData(`http://localhost:${port}/POST`, data);

  //Update UI
  generateTableBody(tableUI, data);
}

//return weather json data from the url
const getWeather = async (baseURL, zipcode, apikey) => {
  const res = await fetch(baseURL + zipcode + apikey)
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

  try {
    let newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

//UI
const tableUI = document.querySelector('.table');

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let rowname of data) {
    let th = document.createElement('th');
    let td = document.createTextNode(rowname);
    th.appendChild(td);
    row.appendChild(th);
  }
}

const datahead = [{ date: 'date', temperature: 'temp', feeling: 'content' }];
const keys = Object.keys(datahead[0]);

function generateTableBody(table, data) {
    let row = table.insertRow();
    for (let key in data) {
      let cell = row.insertCell();
      let td = document.createTextNode(data[key]);
      cell.appendChild(td);
    }
  }


// Async GET
const retrieveData = async (url) => {
  const request = await fetch(url);
  try {
    // Transform into JSON
    const allData = await request.json();
    console.log("retrieveData allData:"+allData);
    generateTableBody(tableUI,allData);
  }
  catch (error) {
    console.log("error", error);
  }
};

generateTableHead(tableUI, keys);
document.getElementById('generate').addEventListener('click', performAction);