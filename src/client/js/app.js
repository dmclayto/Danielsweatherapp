setTimeout(() =>{
  document.querySelector("body").style.opacity = '1';
},300);


// variables
const button = document.querySelector("#generate");

const temperature = document.querySelector("#temp");
const date = document.querySelector ('#date');
const feelings = document.querySelector("#feelings");
const content = document.querySelector ('#content');
const town = document.querySelector ("#town");

const humidity = document.getElementById("humidity");
const pressure = document.getElementById('pressure');
const time = document.getElementById('time');
const timeZone = document.getElementById('time__zone');
const country = document.getElementById('country');
const max = document.getElementById('max__temp1');
const min = document.getElementById('min__temp1');
const icon = document.getElementById('today__icon');
const description = document.getElementById('description');
const wind = document.getElementById('wind__speed');
const cardHeading = document.getElementById('current__temp');
const clouds = document.getElementById('clouds');
const message = document.getElementById('message');
const zone = document.getElementById('advanced__time__zone');

/*
//Getting Time & date

const days = ['Sunday', 'Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

setInterval(() => {
  const timee =  new Date();
  const month = timee.getMonth();
  const datee = timee.getDate();
  const day = timee.getDay();
  const hour = timee.getHours();
  const hoursIn12HourFormat = hour >= 13 ? hour % 12 : hour
  const minutes = timee.getMinutes();
  const ampm = hour>= 12 ? 'PM' : 'AM';

  time.innerHTML = hoursIn12HourFormat + ':' + minutes + '' + `<span id="am-pm">${ampm}</span>`
  date.innerHTML = days [day] + ', ' + datee + ' ' + months [ month]
}, 1000);

*/


//API Variables for function
const baseURI = "https://api.openweathermap.org/data/2.5/weather?zip=";
const personalAPIKey = '&appid=3946befc249ae6ba9e2a8aca88b53fed';

const zipCode = document.querySelector("#zip");
const units = "&units=metric";

// Adding the Event listener to function to generate button.
button.addEventListener('click', (performAction) =>{

    performAction.preventDefault();

    const information = `${baseURI}${zipCode.value}${personalAPIKey}${units}`;
    getWeather (information)
   
   .then (function(data ) {
      postData('https://myweatherappus.herokuapp.com/post',{temp: Math.round(data.main.temp),temp_max: Math.round(data.main.temp_max),temp_min: Math.round(data.main.temp_min), town: data.name, humidity: data.main.humidity, pressure: data.main.pressure, wind: data.wind.speed, description: data.weather[0].description, icon: data.weather[0].icon, timezone: data.timezone, clouds: data.clouds.all})
       
    //  .then (()=>{
      //    getCoordinates(information)
      
       //   .then ((coord)=>{
      //  getweatherbit ( weatherbitwebCurrent + webLat + coord[1] + webLon + coord[0] + weatherbitAPIKey)
        
        .then ((data)=>{
        postData ('https://myweatherappus.herokuapp.com/postMore', {statecode: data.state_code, timezone: data.timezone})
      
  .then ((coord)=>{
getTime (clockURL + latitude + coord[1] + longitude + coord[0])
  
.then ((data)=>{

postData ('https://myweatherappus.herokuapp.com/postTime',{time: data.time, dayOfWeek: data.dayOfWeek, date: data.date})
      
   
  
     
        .then (()=>{
          updateUI ()
      })

       });

  });
})
})
})
//})
//})
// Get the data from API. 
const getWeather = async (url) =>{
    try {
        const response = await fetch (url);
        const data = await response.json()
           console.log (data);

          return(data);
     // if zip code doesnt exist post this message to console.
    } catch (error){
        console.log (error, "cant find zip code ")
    };
};










//Function to POST data 

const postData = async( url, data = {}) => {

        try{
        const response = await fetch (url,{
            method: 'POST', credentials: "same-origin", headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
});
        const newData = await response.json();
        return newData;
     } catch (error){
        console.log (error, "cant post data");
     } 
}


//updating the app 
const updateUI = async () => {
  const request = await fetch('https://myweatherappus.herokuapp.com/all');
  const request2 = await fetch('https://myweatherappus.herokuapp.com/more');
  const request3 = await fetch('https://myweatherappus.herokuapp.com/time');
  try{
    const allData = await request.json();
    const yo = await request2.json();
    const areaTime = await request3.json();
   

   temperature.innerHTML = `<p>Current : ${allData[0].temp}&#176; C</p>`;
   //town.innerHTML =  `<p> ${allData[1].town} , ${yo.statecode}</p>`;
   town.innerHTML =  `<p> ${allData[1].town} </p>`;
   
   max.innerHTML = `<p> max : ${allData[2].temp_max}&#176; C</p>`;
   min.innerHTML = `<p> min : ${allData[3].temp_min}&#176; C</p>`;
   humidity.innerHTML = `<p><strong>Humidity</strong> : ${allData[4].humidity} %</p>`;
   pressure.innerHTML =  `<p><strong>Pressure</strong> : ${allData[5].pressure} hPa</p>`;
   wind.innerHTML =  `<p><strong>Wind</strong> : ${allData[6].wind} m/s</p>`;
   description.innerHTML =  `<p> ${allData[7].description}</p>`;
  
  icon.innerHTML =  `<p> <img src="http://openweathermap.org/img/wn/${allData[8].icon}@2x.png"</p>`;
 // timeZone.innerHTML =  `<p> ${allData[9].timezone}</p>`;
 
  clouds.innerHTML =  `<p> ${allData[10].clouds} % clouds</p>`;
 cardHeading.innerHTML = `<p>Today</p>`;

 country.innerHTML = `<p>USA</p>`;
 
 message.innerHTML= `<p>Weather for ${allData[1].town}</p>`;
 //zone.innerHTML = `<p>${yo.timezone}</p>`;
 time.innerHTML = `<p> ${areaTime.time}`
 date.innerHTML = `<p> ${areaTime.dayOfWeek}  ${areaTime.date} `
 
 //dynamic styling
icon.style.cssText = `background: rgba(24,24,27,0.6); border-radius: 10px;`;
message.style.cssText = `background: rgb(37, 59, 105); border-radius: 10px; padding: 0.1em 0.1em;`;






  }catch(error){
  
    console.log("error", error);
  }
}



// extra part

// get coordiates for next api
const getCoordinates = async (url) =>{
  try {
      const response = await fetch (url);
      const data = await response.json()
         console.log (data);
const lon = data.coord.lon;
const lat = data.coord.lat;
const coord = [lon , lat];
        return(coord);

  } catch (error){
      console.log (error, "cant find zip code ")
  };
};


/*
const weatherbitAPIKey = "&key=764f8e42e2ae4fd1bc5d46711259417c";
const weatherbitwebCurrent =  "http://api.weatherbit.io/v2.0/forecast/daily?";
const webLat = "lat=";
const webLon = "&lon=";



//Get the data from weatherbit
const getweatherbit = async (url) =>{
   
  try {  const res = await fetch (url);
  const data = await res.json()
     console.log (data)
     
    
      return (data)
  } catch (error){
      console.log (error, "cant find weather data from weatherbit ")
  }
};


*/
//api clock
/*
const clockURL = "https://timeapi.io/api/Time/current/coordinate?"
const latitude = "latitude=";
const longitude = "&longitude=";

const getTime = async (url) =>{
  try {
      const response = await fetch (url);
      const data = await response.json()
         console.log (data);

        return(data);

  } catch (error){
      console.log (error, "cant find time ")
  };
};
*/