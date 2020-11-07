//Code for weather app reflects previous HW assignment for class https://github.com/EddiePhi/Weather-Dashboard
  //Adjustments made accordingly to match what app requires.

// WEATHER API: https://openweathermap.org/api
  // API Key: 0f848c85d2b3dd23041f7c21a9bd6d0b
  // Current Weather by ZIP code: https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
  // 5 day/3 hour forecast by Zip code: //https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&appid=0f848c85d2b3dd23041f7c21a9bd6d0b
  // UV Index: http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=0f848c85d2b3dd23041f7c21a9bd6d0b

//Hiking API:
  // API key: 200961813-537b8cc50123339ddfc558c885477477
  //https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=10&key=200961813-537b8cc50123339ddfc558c885477477

//Fix CORS error: https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9
//---------------------------------------------------------------------

$(document).ready(function () {
  //Get localStorage values when page first loads
  let getStorage = localStorage.getItem("savedDetails") || "[]";
  let storageParse = JSON.parse(getStorage);

  //Console.log local storage to check that it is working
  console.log(storageParse[0] + " first check");

  //Run searchCity when element with ID #submitBtn is clicked
  $("#submitBtn").on("click", searchCity);

  //Function allows event listener to be added to enter key and NOT enter in a new line
  $("#textarea1").keyup(function (event) {
    // https://stackoverflow.com/questions/155188/trigger-a-button-click-with-javascript-on-the-enter-key-in-a-text-box
    // https://stackoverflow.com/questions/18779322/disable-new-line-in-textarea-when-pressed-enter
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      $("#submitBtn").click();
    }
  });

   //Populate search results from value stored in local storage when page is first loaded.
   previousSearch();

  function previousSearch() {

    //Grab value from local storage
    let zipCode = storageParse[0];

    //Define URL for AJAX request
    let currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=0f848c85d2b3dd23041f7c21a9bd6d0b`;

    //Define array to hold localStorage value
    let searchHistory = [];
    searchHistory.push(zipCode);

    //Clear zipCode input field after submitting a zip code
    $("#zipCode").val("");

    //AJAX request for Current Weather using currentWeatherURL variable (ensure HTML file has <script> tag with proper jQuery link)
    $.ajax({
      url: currentWeatherURL,
      method: "GET",
    }).then(function (response) {
      //Test console.log response to ensure AJAX request is successful
      console.log(response);

      //Clear fields before new search request data populates to prevent repetitive info
      $("#currentCity").empty();

      //Define an <h4> tag to hold the city name based on zip code captured.
      let cityName = response.name;
      let currentCity = $(`<h4>${cityName}</h4>`);
      $("#currentCity").append(currentCity);

      //Append date after cityName variable
      let momentDate = moment().format("L");
      $("#currentCity").append(`<section>(${momentDate})</section>`);

      //Append Weather Icon after momentDate
      let currentIcon = response.weather[0].icon;
      $("#currentCity").append(`<img src="http://openweathermap.org/img/wn/${currentIcon}@2x.png">`);

      //Append Temperature after Weather Icon
      let cityTemp = response.main.temp;
      //Conversion from Kelvin to Fahrenheit: https://www.rapidtables.com/convert/temperature/how-kelvin-to-fahrenheit.html
      let tempF = Math.round(((cityTemp - 273.15) * 9/5 + 32)*100)/100
      let temp = $(`<section id="temp">Temp: ${tempF}°F</section>`);
      $("#currentTemp").empty();
      $("#currentTemp").append(temp);

      //Append Humidity after Temperature
      let cityHumidity = response.main.humidity;
      let humidity = $(`<section id="humidity">Humidity: ${cityHumidity}%</section>`);
      $("#currentHumid").empty();
      $("#currentHumid").append(humidity);

      //Append Wind Speed after Humidty
      let cityWindSpeed = response.wind.speed;
      let windSpeed = $(`<section id="windSpeed">Wind Speed: ${cityWindSpeed} mph</section>`);
      $("#currentWind").empty();
      $("#currentWind").append(windSpeed);

      //Multi-use variables for subsequent AJAX requests
      let latitude = response.coord.lat;
      let longitude = response.coord.lon;

      //AJAX request of UV Index based on data from currentWeatherURL
      let uvURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=0f848c85d2b3dd23041f7c21a9bd6d0b`;
      $.ajax({
        url: uvURL,
        method: "GET",
      }).then(function (response) {
        console.log(response);

        let uvIndex = $("#currentUv");
        let cityUVIndex = response.value;
        //Change text of UV Index
        uvIndex.text("UV Index: " + cityUVIndex);

        //If/Else conditional to determine background color of UV Index Element
        if (cityUVIndex >= 0 && cityUVIndex < 3) {
          uvIndex.css("backgroundColor", "green");
        } else if (cityUVIndex >= 3 && cityUVIndex < 6) {
          uvIndex.css("backgroundColor", "yellow");
        } else if (cityUVIndex >= 6 && cityUVIndex < 8) {
          uvIndex.css("backgroundColor", "orange");
        } else if (cityUVIndex >= 8 && cityUVIndex < 11) {
          uvIndex.css("backgroundColor", "red");
        } else {
          uvIndex.css("backgroundColor", "purple");
        }
      });

      //AJAX request for 5 day forecast
      let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&appid=0f848c85d2b3dd23041f7c21a9bd6d0b`;
      $.ajax({
        url: forecastURL,
        method: "GET",
      }).then(function (response) {
        console.log(response);

        //Set forecast dates
        let date1 = $("#date1");
        let date2 = $("#date2");
        let date3 = $("#date3");
        let date4 = $("#date4");
        let date5 = $("#date5");

        //Clear fields before new search request data populates to prevent repetitive info
        date1.empty();
        date2.empty();
        date3.empty();
        date4.empty();
        date5.empty();

        //Grab date data from Forecast API
        let dateA = response.list[0].dt_txt;
        let dateB = response.list[8].dt_txt;
        let dateC = response.list[16].dt_txt;
        let dateD = response.list[24].dt_txt;
        let dateE = response.list[32].dt_txt;

        //Create <div> elements to append date text
        date1.append(`<div class="text">${dateA}</div>`);
        date2.append(`<div class="text">${dateB}</div>`);
        date3.append(`<div class="text">${dateC}</div>`);
        date4.append(`<div class="text">${dateD}</div>`);
        date5.append(`<div class="text">${dateE}</div>`);

        //Grab icon data from Forecast API
        let iconA = response.list[0].weather[0].icon;
        let iconB = response.list[8].weather[0].icon;
        let iconC = response.list[16].weather[0].icon;
        let iconD = response.list[24].weather[0].icon;
        let iconE = response.list[32].weather[0].icon;

        //Append <img> elements for icons after the date
        date1.append(`<img id="icon" alt="weather-icon" src="http://openweathermap.org/img/wn/${iconA}@2x.png"/>`);
        date2.append(`<img id="icon" alt="weather-icon" src="http://openweathermap.org/img/wn/${iconB}@2x.png"/>`);
        date3.append(`<img id="icon" alt="weather-icon" src="http://openweathermap.org/img/wn/${iconC}@2x.png"/>`);
        date4.append(`<img id="icon" alt="weather-icon" src="http://openweathermap.org/img/wn/${iconD}@2x.png"/>`);
        date5.append(`<img id="icon" alt="weather-icon" src="http://openweathermap.org/img/wn/${iconE}@2x.png"/>`);

        //Grab temp data from Forecast API and convert to Fahrenheit
        //Kelvin to Fahrenheit conversion reminder: Math.round(((K - 273.15) * 9/5 + 32)*100)/100 = F
        let tempA = response.list[0].main.temp;
        let tempAF = Math.round(((tempA - 273.15) * 9/5 + 32)*100)/100;
        let tempB = response.list[8].main.temp;
        let tempBF = Math.round(((tempB - 273.15) * 9/5 + 32)*100)/100;
        let tempC = response.list[16].main.temp;
        let tempCF = Math.round(((tempC - 273.15) * 9/5 + 32)*100)/100;
        let tempD = response.list[24].main.temp;
        let tempDF = Math.round(((tempD - 273.15) * 9/5 + 32)*100)/100;
        let tempE = response.list[32].main.temp;
        let tempEF = Math.round(((tempE - 273.15) * 9/5 + 32)*100)/100;

        //Append temp data after icon
        date1.append(`<section>Temp: ${tempAF}°F</section>`);
        date2.append(`<section>Temp: ${tempBF}°F</section>`);
        date3.append(`<section>Temp: ${tempCF}°F</section>`);
        date4.append(`<section>Temp: ${tempDF}°F</section>`);
        date5.append(`<section>Temp: ${tempEF}°F</section>`);

        //Grab humidity data from Forecast API
        let humidityA = response.list[0].main.humidity;
        let humidityB = response.list[8].main.humidity;
        let humidityC = response.list[16].main.humidity;
        let humidityD = response.list[24].main.humidity;
        let humidityE = response.list[32].main.humidity;

        //Append humidity data after temp
        date1.append(`<section>Humidity: ${humidityA}%</section>`);
        date2.append(`<section>Humidity: ${humidityB}%</section>`);
        date3.append(`<section>Humidity: ${humidityC}%</section>`);
        date4.append(`<section>Humidity: ${humidityD}%</section>`);
        date5.append(`<section>Humidity: ${humidityE}%</section>`);
      });
    });
  };

  //Define searchCity function
  function searchCity(event) {

    //Grab value of user input AFTER click even is initiated
    let zipCode = $("#textarea1").val();


    //Define URL for AJAX request
    let currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=0f848c85d2b3dd23041f7c21a9bd6d0b`;

    //Define array to hold localStorage value
    let searchHistory = [];
    searchHistory.push(zipCode);

    //Clear zipCode input field after submitting a zip code
    $("#zipCode").val("");

    //AJAX request for Current Weather using currentWeatherURL variable (ensure HTML file has <script> tag with proper jQuery link)
    $.ajax({
      url: currentWeatherURL,
      method: "GET",
    }).then(function (response) {
      //Test console.log response to ensure AJAX request is successful
      console.log(response);

      //Clear fields before new search request data populates to prevent repetitive info
      $("#currentCity").empty();

      //Define an <h4> tag to hold the city name based on zip code captured.
      let cityName = response.name;
      let currentCity = $(`<h4>${cityName}</h4>`);
      $("#currentCity").append(currentCity);

      //Append date after cityName variable
      let momentDate = moment().format("L");
      $("#currentCity").append(`<section>(${momentDate})</section>`);

      //Append Weather Icon after momentDate
      let currentIcon = response.weather[0].icon;
      $("#currentCity").append(`<img src="http://openweathermap.org/img/wn/${currentIcon}@2x.png">`);

      //Append Temperature after Weather Icon
      let cityTemp = response.main.temp;
      //Conversion from Kelvin to Fahrenheit: https://www.rapidtables.com/convert/temperature/how-kelvin-to-fahrenheit.html
      let tempF = Math.round(((cityTemp - 273.15) * 9/5 + 32)*100)/100
      let temp = $(`<section id="temp">Temp: ${tempF}°F</section>`);
      $("#currentTemp").empty();
      $("#currentTemp").append(temp);

      //Append Humidity after Temperature
      let cityHumidity = response.main.humidity;
      let humidity = $(`<section id="humidity">Humidity: ${cityHumidity}%</section>`);
      $("#currentHumid").empty();
      $("#currentHumid").append(humidity);

      //Append Wind Speed after Humidty
      let cityWindSpeed = response.wind.speed;
      let windSpeed = $(`<section id="windSpeed">Wind Speed: ${cityWindSpeed} mph</section>`);
      $("#currentWind").empty();
      $("#currentWind").append(windSpeed);

      //Multi-use variables for subsequent AJAX requests
      let latitude = response.coord.lat;
      let longitude = response.coord.lon;

      //AJAX request of UV Index based on data from currentWeatherURL
      let uvURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=0f848c85d2b3dd23041f7c21a9bd6d0b`;
      $.ajax({
        url: uvURL,
        method: "GET",
      }).then(function (response) {
        console.log(response);

        let uvIndex = $("#currentUv");
        let cityUVIndex = response.value;
        //Change text of UV Index
        uvIndex.text("UV Index: " + cityUVIndex);

        //If/Else conditional to determine background color of UV Index Element
        if (cityUVIndex >= 0 && cityUVIndex < 3) {
          uvIndex.css("backgroundColor", "green");
        } else if (cityUVIndex >= 3 && cityUVIndex < 6) {
          uvIndex.css("backgroundColor", "yellow");
        } else if (cityUVIndex >= 6 && cityUVIndex < 8) {
          uvIndex.css("backgroundColor", "orange");
        } else if (cityUVIndex >= 8 && cityUVIndex < 11) {
          uvIndex.css("backgroundColor", "red");
        } else {
          uvIndex.css("backgroundColor", "purple");
        }
      });

      //AJAX request for 5 day forecast
      let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&appid=0f848c85d2b3dd23041f7c21a9bd6d0b`;
      $.ajax({
        url: forecastURL,
        method: "GET",
      }).then(function (response) {
        console.log(response);

        //Set forecast dates
        let date1 = $("#date1");
        let date2 = $("#date2");
        let date3 = $("#date3");
        let date4 = $("#date4");
        let date5 = $("#date5");

        //Clear fields before new search request data populates to prevent repetitive info
        date1.empty();
        date2.empty();
        date3.empty();
        date4.empty();
        date5.empty();

        //Grab date data from Forecast API
        let dateA = response.list[0].dt_txt;
        let dateB = response.list[8].dt_txt;
        let dateC = response.list[16].dt_txt;
        let dateD = response.list[24].dt_txt;
        let dateE = response.list[32].dt_txt;

        //Create <div> elements to append date text
        date1.append(`<div class="text">${dateA}</div>`);
        date2.append(`<div class="text">${dateB}</div>`);
        date3.append(`<div class="text">${dateC}</div>`);
        date4.append(`<div class="text">${dateD}</div>`);
        date5.append(`<div class="text">${dateE}</div>`);

        //Grab icon data from Forecast API
        let iconA = response.list[0].weather[0].icon;
        let iconB = response.list[8].weather[0].icon;
        let iconC = response.list[16].weather[0].icon;
        let iconD = response.list[24].weather[0].icon;
        let iconE = response.list[32].weather[0].icon;

        //Append <img> elements for icons after the date
        date1.append(`<img id="icon" alt="weather-icon" src="http://openweathermap.org/img/wn/${iconA}@2x.png"/>`);
        date2.append(`<img id="icon" alt="weather-icon" src="http://openweathermap.org/img/wn/${iconB}@2x.png"/>`);
        date3.append(`<img id="icon" alt="weather-icon" src="http://openweathermap.org/img/wn/${iconC}@2x.png"/>`);
        date4.append(`<img id="icon" alt="weather-icon" src="http://openweathermap.org/img/wn/${iconD}@2x.png"/>`);
        date5.append(`<img id="icon" alt="weather-icon" src="http://openweathermap.org/img/wn/${iconE}@2x.png"/>`);

        //Grab temp data from Forecast API and convert to Fahrenheit
        //Kelvin to Fahrenheit conversion reminder: Math.round(((K - 273.15) * 9/5 + 32)*100)/100 = F
        let tempA = response.list[0].main.temp;
        let tempAF = Math.round(((tempA - 273.15) * 9/5 + 32)*100)/100;
        let tempB = response.list[8].main.temp;
        let tempBF = Math.round(((tempB - 273.15) * 9/5 + 32)*100)/100;
        let tempC = response.list[16].main.temp;
        let tempCF = Math.round(((tempC - 273.15) * 9/5 + 32)*100)/100;
        let tempD = response.list[24].main.temp;
        let tempDF = Math.round(((tempD - 273.15) * 9/5 + 32)*100)/100;
        let tempE = response.list[32].main.temp;
        let tempEF = Math.round(((tempE - 273.15) * 9/5 + 32)*100)/100;

        //Append temp data after icon
        date1.append(`<section>Temp: ${tempAF}°F</section>`);
        date2.append(`<section>Temp: ${tempBF}°F</section>`);
        date3.append(`<section>Temp: ${tempCF}°F</section>`);
        date4.append(`<section>Temp: ${tempDF}°F</section>`);
        date5.append(`<section>Temp: ${tempEF}°F</section>`);

        //Grab humidity data from Forecast API
        let humidityA = response.list[0].main.humidity;
        let humidityB = response.list[8].main.humidity;
        let humidityC = response.list[16].main.humidity;
        let humidityD = response.list[24].main.humidity;
        let humidityE = response.list[32].main.humidity;

        //Append humidity data after temp
        date1.append(`<section>Humidity: ${humidityA}%</section>`);
        date2.append(`<section>Humidity: ${humidityB}%</section>`);
        date3.append(`<section>Humidity: ${humidityC}%</section>`);
        date4.append(`<section>Humidity: ${humidityD}%</section>`);
        date5.append(`<section>Humidity: ${humidityE}%</section>`);
      });
    });

    //Set Local Storage. Must stay withing curly brackets for searchCity function
    localStorage.setItem("savedDetails", JSON.stringify(searchHistory));
    console.log(localStorage);
    console.log(storageParse[0]);
  }
});
