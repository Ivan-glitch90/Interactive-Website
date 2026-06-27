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
    let lat = geo.results[0].latitude;
    let long = geo.results[0].longitude;
    weather(lat,long);
    
}

//Fetch request for weather
async function weather(lat,long) { 
    let data = await fetch("https://api.open-meteo.com/v1/forecast?latitude="+lat+"&longitude="+long+"&hourly=temperature_2m,rain&current=temperature_2m,is_day,wind_speed_10m&forecast_days=1&wind_speed_unit=mph&temperature_unit=fahrenheit");
    let at_the_moment = await data.json();
    let emoji = at_the_moment.current.is_day === 1 ? "Have a great day☀️" : "Good night 🌙"; // ternary operator! 😲 // the idea is: day? or night? show an emoji depending of the time.
    let dateObject = new Date(at_the_moment.current.time);
    let display = document.getElementById("weather-result");
    display.innerHTML = `The date and time is: ${dateObject.toLocaleString()}, the temperature is ${at_the_moment.current.temperature_2m}°F, the wind speed is: ${at_the_moment.current.wind_speed_10m} MPH, ${emoji}`;
    //console.log(current);
}