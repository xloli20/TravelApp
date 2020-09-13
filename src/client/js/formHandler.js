import fetch from "node-fetch";

// for storing data will fetch from the APIs
let projectData = {};

// get the number of days remaing for the trip
function days_between(firstDate, secondDate) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds    
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return diffDays;
}

// this is the main function when user click submit 
export async function handleSubmit() {

    // check what text was put into the form field
    const city = document.getElementById('city').value;
    const todayDate = new Date(document.getElementById('todayDate').value);
    const tripDate = new Date(document.getElementById('tripDate').value);

    console.log("::: Form Submitted :::")

  if (start.length !== 0 && end.length !== 0 && city.length !== 0 && (tripDate - todayDate >= 0)) {
    projectData.remainingDaysToTrip = days_between(todayDate, tripDate);
    // fetching the cordinates of the entered city from Geonames API
    await getCordinates(`http://localhost:8081/cordinates?city=${city}`);
    document.getElementById('form-submit').innerHTML = "Submit";
    updateUI();
  } else {
    alert("Please enter correct values");
  }
}

// fetching the cordinates of the entered city from Geonames API
const getCordinates = async (url) => {
  await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
    .then(res => res.json())
    .then(async res => {
      projectData.city = res.name;
      await getWeather(`http://localhost:8081/weather?lat=${res.lat}&long=${res.lng}`)
    })
    .catch(error => {
      console.log(error)
    })
}

// detching weather of specific cordinates from WeatherBit API
const getWeather = async (url) => {
  await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
    .then(res => res.json())
    .then(async res => {
      projectData.temperature = res.data[0].temp;
      projectData.weatherDesc = res.data[0].weather.description;
      projectData.icon = res.data[0].weather.icon;
      await getPhoto(`http://localhost:8081/photo?q=${projectData.city}`)
    })
    .catch(error => {
      console.log(error)
    })
}

// fetching the city photo from the Pixabay API
const getPhoto = async (url) => {
  await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
    .then(res => res.json())
    .then(res => {
      projectData.img = res.previewURL;
    })
    .catch(error => {
      console.log(error)
    })
}

// populating UI with the data stored in projectData
export const updateUI = () => {
  document.getElementById('cityImg').setAttribute('src', projectData.img);
  document.getElementById('city').innerHTML = projectData.city;
  document.getElementById('temp').innerHTML = projectData.temperature;
  document.getElementById('weatherDesc').innerHTML = projectData.weatherDesc;
  document.getElementById('icon').setAttribute('src', `${projectData.icon}.png`);
  document.getElementById('days').innerHTML = projectData.remainingDaysToTrip;
  document.getElementById('modal-launch').click();
}