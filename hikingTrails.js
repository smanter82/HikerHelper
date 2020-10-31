function getTrailInput() {

let queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + latInput + "&lon=" + lonInput + "&key=200961808-6d569e74377269afd022c8e12b63296c" 
// let trailImput = $('#trailInput').val();


$.ajax({
    url:queryURL,
    method: 'GET'
}).then(function(response){
    // $(body).append(JSON.stringify(response))
    console.log(response)
})
}

getTrailInput()

