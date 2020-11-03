// WEATHER API: https://openweathermap.org/api
    // API Key: 0f848c85d2b3dd23041f7c21a9bd6d0b
    // Current Weather by ZIP code: https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
    // Current weather by City name: https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=0f848c85d2b3dd23041f7c21a9bd6d0b
    // 5 day/3 hour forecast by Zip code: //https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&appid=0f848c85d2b3dd23041f7c21a9bd6d0b
    // UV Index: http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=0f848c85d2b3dd23041f7c21a9bd6d0b

//Hiking API: 
    // API key: 200961813-537b8cc50123339ddfc558c885477477
    //https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=10&key=200961813-537b8cc50123339ddfc558c885477477
    

//Fix CORS error: https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9
    //---------------------------------------------------------------------

$(document).ready(function(){
    

    // Get localStorage values when page first loads
    let getStorage = localStorage.getItem("savedDetails") || "[]";
    let storageParse = JSON.parse(getStorage);
    
    //console.log local storage to check that it is working
    console.log(storageParse[0] + " first check")

    //Run searchCity when element with ID #submitBtn is clicked
    $("#submitBtn").on("click", searchCity);
    //$('#submitPlants').on('click', searchTrail);

    $("#textarea1").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#submitBtn").click();
            $("#textarea1").val('');
        }
    });


    //Define searchCity function
    function searchCity(event) {
        
        //Allow ability to hit enter instead of always needing to click to submit input. HAS NOT WORKED YET
        event.preventDefault();
        
        //Grab value of user input AFTER click even is initiated
        let zipCode = $('#textarea1').val();

        //Define URL for AJAX request
        let currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=0f848c85d2b3dd23041f7c21a9bd6d0b`
        
        //Define array to hold localStorage value
        let searchHistory = [];
        searchHistory.push(zipCode);
        
        //Clear zipCode input field after submitting a zip code
        $('#zipCode').val('');

        //AJAX request for Current Weather using currentWeatherURL variable (ensure HTML file has <script> tag with proper jQuery link)
        $.ajax({
            url: currentWeatherURL,
            method: "GET"
        }).then(function(response) {
            //Test console.log response to ensure AJAX request is successful
            console.log(response);

            //Clear fields before 
            $('#currentCity').empty();
            
            //Define a <section> tag to hold the City name based on zip code captured.
            let cityName = response.name;
            let currentCity = $(`<h4>${cityName}</h4>`);
            $('#currentCity').append(currentCity);

            //Append date next to cityName
            let momentDate = moment().format('L');
            $('#currentCity').append(`<section>(${momentDate})</section>`)

            //Append Weather Icon 
            let currentIcon = response.weather[0].icon;
            $('#currentCity').append(`<img src="http://openweathermap.org/img/wn/${currentIcon}@2x.png">`)

            //Append Temp (Check on how to convert to Fahrenheit)
            let cityTemp = response.main.temp;
            let temp = $(`<section id="temp">Temp: ${cityTemp}</section>`);
            $('#currentTemp').empty();
            $('#currentTemp').append(temp);

            //Append Humidity
            let cityHumidity = response.main.humidity;
            let humidity = $(`<section id="humidity">Humidity: ${cityHumidity}</section>`);
            $('#currentHumid').empty();
            $('#currentHumid').append(humidity);

            //Append Wind Speed
            let cityWindSpeed = response.wind.speed;
            let windSpeed = $(`<section id="windSpeed">Wind Speed: ${cityWindSpeed}</section>`);
            $('#currentWind').empty();
            $('#currentWind').append(windSpeed);

            //Multi-use variables for subsequent AJAX requests
            let latitude = response.coord.lat;
            let longitude = response.coord.lon;

            //AJAX request of UV Index based on data from currentWeatherURL
            let uvURL = `http://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=0f848c85d2b3dd23041f7c21a9bd6d0b`
            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function(response) {
                console.log(response)

                let uvIndex = $('#currentUv');
                let cityUVIndex = response.value;
                uvIndex.text("UV Index: " + cityUVIndex);

                if (cityUVIndex >= 0 && cityUVIndex < 3){
                    uvIndex.css('backgroundColor', 'green');
                } else if (cityUVIndex >= 3 && cityUVIndex < 6){
                    uvIndex.css('backgroundColor', 'yellow');
                } else if (cityUVIndex >= 6 && cityUVIndex < 8){
                    uvIndex.css('backgroundColor', 'orange');
                } else if (cityUVIndex >= 8 && cityUVIndex < 11){
                    uvIndex.css('backgroundColor', 'red');
                } else {
                    uvIndex.css('backgroundColor', 'purple');
                };
            });

            //AJAX request for 5 day forecast
            let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&appid=0f848c85d2b3dd23041f7c21a9bd6d0b`
            $.ajax({
                url: forecastURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                
                //Set forecast dates
                let date1 = $('#date1');
                let date2 = $('#date2');
                let date3 = $('#date3');
                let date4 = $('#date4');
                let date5 = $('#date5');

                //Grab date data from API
                let dateA = response.list[0].dt_txt;
                let dateB = response.list[8].dt_txt;
                let dateC = response.list[16].dt_txt;
                let dateD = response.list[24].dt_txt;
                let dateE = response.list[32].dt_txt;

                //Set date text
                date1.find(".text").text(dateA);
                date2.find(".text").text(dateB);
                date3.find(".text").text(dateC);
                date4.find(".text").text(dateD);
                date5.find(".text").text(dateE);

                //Grab icon data from API
                let iconA = response.list[0].weather[0].icon;
                let iconB = response.list[8].weather[0].icon;
                let iconC = response.list[16].weather[0].icon;
                let iconD = response.list[24].weather[0].icon;
                let iconE = response.list[32].weather[0].icon;

                //Add img of icons
                $('#icon1').attr('src', `http://openweathermap.org/img/wn/${iconA}@2x.png`);
                $('#icon2').attr('src', `http://openweathermap.org/img/wn/${iconB}@2x.png`);
                $('#icon3').attr('src', `http://openweathermap.org/img/wn/${iconC}@2x.png`);
                $('#icon4').attr('src', `http://openweathermap.org/img/wn/${iconD}@2x.png`);
                $('#icon5').attr('src', `http://openweathermap.org/img/wn/${iconE}@2x.png`);
                
                

                //Grab temp data from API
                let tempA = response.list[0].main.temp;
                let tempB = response.list[8].main.temp;
                let tempC = response.list[16].main.temp;
                let tempD = response.list[24].main.temp;
                let tempE = response.list[32].main.temp;

                date1.append(`<section>Temp: ${tempA}</section>`);
                date2.append(`<section>Temp: ${tempB}</section>`);
                date3.append(`<section>Temp: ${tempC}</section>`);
                date4.append(`<section>Temp: ${tempD}</section>`);
                date5.append(`<section>Temp: ${tempE}</section>`);
                
                let humidityA = response.list[0].main.humidity;
                let humidityB = response.list[8].main.humidity;
                let humidityC = response.list[16].main.humidity;
                let humidityD = response.list[24].main.humidity;
                let humidityE = response.list[32].main.humidity;

                date1.append(`<section>Humidity: ${humidityA}</section>`);
                date2.append(`<section>Humidity: ${humidityB}</section>`);
                date3.append(`<section>Humidity: ${humidityC}</section>`);
                date4.append(`<section>Humidity: ${humidityD}</section>`);
                date5.append(`<section>Humidity: ${humidityE}</section>`);
            });

            //AJAX request from for Hiking Trails API
            // getTrailInput()
            // let trailURL = `https://www.hikingproject.com/data/get-trails?lat=${latitude}&lon=${longitude}&maxDistance=10&key=200961813-537b8cc50123339ddfc558c885477477`
            // $.ajax({
            //     url: trailURL,
            //     method: "GET",
            //     error: function(err){
            //         alert(err);
            //     }
            // }).then(function(response) {
            //     console.log(response)
            // });
        });
        
        //Set Local Storage. Must stay withing curly brackets for searchCity function
        localStorage.setItem("savedDetails", JSON.stringify(searchHistory));
        console.log(localStorage);
        console.log(storageParse[0]);   
    };
});
