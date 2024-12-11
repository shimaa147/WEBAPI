var inputSearch=document.getElementById("search");
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

async function fetchWeatherData(query) {
   query= query||'cairo';
   var response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=a1bab43e4c0d4c8f95a160532241012&q=${query}&days=3`);
   if(response.ok && response.status==200)//returns true if the response returned successfully
   {
      var weatherData = await response.json();
      console.log(weatherData);
   
      displayCurrent( weatherData.location,  weatherData.current);
       displayForecast( weatherData.forecast.forecastday);
}}
inputSearch.addEventListener("keyup", e => {
      fetchWeatherData(e.target.value);
});


function displayCurrent(location, current) {
   if (current!= null) {
       var e = new Date(current.last_updated.replace(" ", "T"));
       let cartona = `<div class="today forecast">  
              <div class="forecast-header"  id="today">  
              <div class="day">${days[e.getDay()]}</div> 
                <div class=" date">${e.getDate() + monthNames[e.getMonth()]}</div> 
              </div>
              <div class="forecast-content" id="current">  
                <div class="location">${location.name}</div> 
                <div class="degree">  
                      <div class="num">${current.temp_c}<sup>o</sup>C</div>
                      <div class="forecast-icon">    
                          <img src="https:${current.condition.icon}" alt="" width=90> 
                      </div>   
                </div>
              <div class="custom m-t-5">${current.condition.text}</div>
              <div class="d-flex align-items-center justify-content-center ">
                <span class="d-flex  align-items-center justify-content-center"><img class="imgspan" src="./images/icon-umberella@2x.png" alt=""> 20%</span>
                <span class="d-flex align-items-center justify-content-center mx-5"> <img class="imgspan" src="./images/icon-wind@2x.png "alt="">18km/h</span>
                <span class="d-flex align-items-center justify-content-center" ><img class="imgspan" src="./images/icon-compass@2x.png" alt="">  East</span>    
              </div>
              </div>
       </div>`
       
       
       document.getElementById("forecast").innerHTML = cartona;
   }
}
function displayForecast(forecastday) {
   let str= "";
   for (let i = 1; i< forecastday.length; i++){
       str += `<div class="forecast">
              <div class="forecast-header">
                        <div class="day text-center">${days[new Date(forecastday[i].date.replace(" ", "T")).getDay()]}</div>  
                             </div>   <div class="forecast-content">  
                                       <div class="forecast-icon">         
                                              <img src="https:${forecastday[i].day.condition.icon}" alt="" width=48>   
                                                      </div>\n        
                                                          <div class="degree">${forecastday[i].day.maxtemp_c}<sup>o</sup>C</div>   
                                                                 <small>${forecastday[i].day.mintemp_c}<sup>o</sup></small>     
                                                                        <div class="custom">${forecastday[i].day.condition.text}</div>  
                                                                             </div>       </div>`;
}
   document.getElementById("forecast").innerHTML += str;
}
fetchWeatherData();
