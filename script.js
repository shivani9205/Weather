async function getWeather(){
    alert("Button Clicked");
    
    const city = document.getElementById("city").value;

    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    const apiKey = "e77da69fd4a7e8362255ff606b69510e";

    const url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    document.getElementById("weatherResult").innerHTML =
    "<p>Loading...</p>";

    try{
        const response = await fetch(url);
         
        const data = await response.json();

        if (data.cod == "404") {
        document.getElementById("weatherResult").innerHTML =
        "<p>❌ City not found!</p>";
        return;
}
       if (data.weather[0].main === "Clear") {
    document.body.style.background = "#87CEEB"; // Sky Blue
}
        else if (data.weather[0].main === "Clouds") {
    document.body.style.background = "#D3D3D3"; // Light Gray
}
      else if (data.weather[0].main === "Rain") {
    document.body.style.background = "#708090"; // Slate Gray
}
      else if (data.weather[0].main === "Thunderstorm") {
    document.body.style.background = "#4B0082"; // Dark Purple
}
     else if (data.weather[0].main === "Snow") {
    document.body.style.background = "#F0F8FF"; // Snow White
}



        const today = new Date();


        const icon = data.weather[0].icon;

        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        console.log(data);

        document.getElementById("weatherResult").innerHTML = `
        <h2>${data.name}</h2>
        <p>${today.toLocaleString()}</p>

        <img src="https://openweathermap.org/img/wn/${icon}@2x.png">

        <p>Temperature:${data.main.temp} °C</p>
        <p>Min Temp: ${data.main.temp_min} °C</p>
        <p>Max Temp: ${data.main.temp_max} °C</p>
        <p>Weather: ${data.weather[0].main}</p>
        <p>Description: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Feels Like: ${data.main.feels_like} °C</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <p>Pressure: ${data.main.pressure} hPa</p>`;
    }
    catch(error){
        console.log(error);
    }
}
document.getElementById("city").addEventListener("keydown", function(event) {
    // if (event.key === "Enter" || event.key === "Search") {
    if (event.keyCode === 13){
        getWeather();
    }
});