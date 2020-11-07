//Map Widget Input added from https://www.trailforks.com/widgets/config/region_map/?rid=3156 allows the extra piece above the map to be displayed and functionality to the trail website 
var script = document.createElement("script"); 
        script.setAttribute("src", "https://es.pinkbike.org/ttl-86400/sprt/j/trailforks/widget.js"); document.getElementsByTagName("head")[0].appendChild(script); 
        var widgetCheck = false;


// Code worked on to find trail list items from Hiking API to put onto the map
//Global variable 
// let lastTrail = [] 
// //lastTrail.find <--Look this up.
// Click event listener to target the trail button from the API
// $(document).on("click", ".trailButton", function(){
//   // lastTrail.find(function($(this).text(),[i], arr),thisValue)
//   // array.find(function(currentValue, index, arr),thisValue)
// })

// A for loop to run through the trail location's latitude and longitudes to develop the map trail
// // function renderMap() {
// //   for (let i = 0; i < response.trails.length; i++) {
// //   let lat = response.trails[i].latitude;
// //   let lon = response.trails[i].longitude;
// //   console.log(lat)
// //   // TRAILFORKS WIDGET START
// //   // Trail map embedded from https://www.trailforks.com/widgets/config/region_map/?rid=3156
// //   $("#renderedMap").append(`
// //   <div class="TrailforksRegionInfo" 
// //   data-w="600px" 
// //   data-h="150px" 
// //   data-rid="3156" 
// //   data-counts="1" 
// //   data-stats="1">
// // </div>
// // <div class="TrailforksWidgetMap" 
// //   data-w="600px" 
// //   data-h="400px" 
// //   data-rid="3156" 
// //   data-activitytype="1" 
// //   data-maptype="trailforks" 
// //   data-trailstyle="difficulty" 
// //   data-controls="1" 
// //   data-list="0" 
// //   data-dml="1" 
// //   data-layers="labels,poi,polygon,directory,region" 
// //   data-z="" 
// //   data-lat=${lat} 
// //   data-lon=${lon}
// //   data-hideunsanctioned="0">
// // </div>`)
// // // TRAILFORKS WIDGET END
// // }

// // };


// Code added to void the NO-CORS allowance 
// // added code from https://www.moxio.com/blog/12/how-to-make-a-cross-domain-request-in-javascript-using-cors
// // let http_request;
// // http_request = new XMLHTTPRequest();
// // http_request.onreadystatechange = function () { /* .. */ };
// // http_request.open("POST", "https://www.trailforks.com/widgets/region_map/");
// // http_request.withCredentials = true;
// // http_request.setRequestHeader("Content-Type", "application/json");
// // http_request.send({ 'request': "authentication token" });


// Ajax request below to call the map url and find the latitude and longitude from the hiking API - this code would have been added to the hiking trails JS had the map functionality worked the way we had planned
// // let webURL = 'https://www.trailforks.com/widgets/region_map/'

// // $.ajax({
// //   url: webURL,
// //   method: "GET",
// // }).then(function (response) {
// //   console.log(response);
// //   console.log(response.maps[0].name);
// //   lastTrail = response.maps
// //   for (let i = 0; i < response.trails.length; i++) {
// //     let trailLocation = response.trails[i].location;
// //     let lat = response.trails[i].latitude;
// //     let lon = response.trails[i].longitude;

// //     console.log(response.maps[i].name);
// //     $("#mapResults").append(`<div class="TrailforksRegionInfo" 
// //     data-w="600px" 
// //     data-h="150px" 
// //     data-rid="3156" 
// //     data-counts="1" 
// //     data-stats="1">
// //   </div>
// //   <div class="TrailforksWidgetMap" 
// //     data-w="600px" 
// //     data-h="400px" 
// //     data-rid="3156" 
// //     data-activitytype="1" 
// //     data-maptype="trailforks" 
// //     data-trailstyle="difficulty" 
// //     data-controls="1" 
// //     data-list="0" 
// //     data-dml="1" 
// //     data-layers="labels,poi,polygon,directory,region" 
// //     data-z="" 
// //     data-lat=${lat} 
// //     data-lon=${lon}
// //     data-hideunsanctioned="0">
// //   </div>`);
// //   }

// // });
