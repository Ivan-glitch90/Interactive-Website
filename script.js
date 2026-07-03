/*The plan:
1.) user inputs city.
2.) replace longitude and latitude with a city (a variable); 
    2.1) we achieve this by having a second fetch request from geocode API
3.) we read that city from the text box and send it to the API request.
4.)user click the button.
5.) we display the info! 
*/

const button = document.getElementById("get_it_button"); // waiting for a click
const textbox = document.getElementById("get_it"); //waiting for a city input
button.addEventListener("click",function(){
    const textbox = document.getElementById("get_it").value; //storing the city until the button is clicked.
    coordinates(textbox);//calling coordinates here once the button is pushed and sending the value to coordinates()
}
);


//function to fetch coordinates the city; saving and sending to weather to be used as parameters.
async function coordinates(textbox) {
    let location = await fetch("https://geocoding-api.open-meteo.com/v1/search?name="+textbox+"&count=1&language=en&format=json");
    let geo = await location.json();
    let lat = geo.results[0].latitude;//accessing the object and the array to pull and save the value of latitude and longitud
    let long = geo.results[0].longitude;
    weather(lat,long); //calling weather and sending parameters
    
}

//Fetch request for weather
async function weather(lat, long) { //parameters from coordinates
    let data = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + long + "&hourly=temperature_2m,rain&current=temperature_2m,is_day,wind_speed_10m&forecast_days=1&wind_speed_unit=mph&temperature_unit=fahrenheit");// API allowed me to pick the info that i wanted
    let at_the_moment = await data.json(); //converting data to json format.
    let emoji = at_the_moment.current.is_day === 1 ? "Have a great day ☀️" : "Good night 🌙"; // NEW - ternary operator! 😲 // the idea is: day? or night? show an emoji depending of the time.
    let dateObject = new Date(at_the_moment.current.time); //Example to convert zulu time to normal time. I dont think this is working at the moment need to research more
  //  let display = document.getElementById("weather-result"); //selecting where to send the info - replaced with new version Jul 3rd 2026
    let time = document.getElementById("time");
    let tempa = document.getElementById("temp");
    let sped = document.getElementById("speed");
    let dia = document.getElementById("emoji");
    time.innerHTML = `${dateObject.toLocaleString()}`;
    tempa.innerHTML = `The temperature is ${at_the_moment.current.temperature_2m}°F`;
    sped.innerHTML = `The wind speed is: ${at_the_moment.current.wind_speed_10m} MPH`;
    dia.innerHTML = `${emoji}`;

    //display.innerHTML = `The date and time is: ${dateObject.toLocaleString()}, the temperature is ${at_the_moment.current.temperature_2m}°F, the wind speed is: ${at_the_moment.current.wind_speed_10m} MPH, ${emoji}`;// sending the info //this was before css and just to display the data.
    
    //console.log(current);
}