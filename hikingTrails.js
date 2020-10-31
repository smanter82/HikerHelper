//Use Ajax requests from weather API to access latitude and longitude data from initial zip code search.
$(document).ready(function(){

    $("#submitBtn").on("click", searchCity);
    
    
    function searchCity(event) {
        
        event.preventDefault();
        
        //Grab value of user input AFTER click even is initiated
        let zipCode = $('#textarea1').val();

        //Define URL for AJAX request
        let currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=0f848c85d2b3dd23041f7c21a9bd6d0b`    

        $.ajax({
            url: currentWeatherURL,
            method: "GET"
        }).then(function(response) {
            //Test console.log response to ensure AJAX request is successful
            console.log(response);
            
            //Multi-use variables for subsequent AJAX requests
            let latitude = response.coord.lat;
            let longitude = response.coord.lon;

            //Get trail information for area requested in zip code search.
            function getTrailInput() {
            $('#submitBtn').on("click", getTrailInput);
        
            let queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + latitude + "&lon=" + longitude + "&key=200961808-6d569e74377269afd022c8e12b63296c" 
            // let trailImput = $('#trailInput').val();


            $.ajax({
                url:queryURL,
                method: 'GET'
            }).then(function(response){
                // $(body).append(JSON.stringify(response))
                console.log(response)
            }
            })
        }

            // getTrailInput()
        })
        
