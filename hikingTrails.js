$("#submitBtn").on("click", searchZip);

function searchZip(){
    let zipInput = $('#textarea1').val();
    console.log(zipInput)

    let zipCodeURL = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=${zipInput}&facet=state&facet=timezone&facet=dst`

    $.ajax({
        url: zipCodeURL,
        method: 'GET'
    }).then(function(response){
        // let zipCode = response.trails[0].name
        // $(".trailListResults").append(JSON.stringify(response))
        console.log(response)
        // console.log(response.trails[0].name)
        console.log(response.records[0].geometry.coordinates[0])
        console.log(response.records[0].geometry.coordinates[1])    
    
        let longitude = response.records[0].geometry.coordinates[0]
        let latitude = response.records[0].geometry.coordinates[1]

        $("body").append(`<p>(${latitude})<p>`)
        $("body").append(`<p>(${longitude})<p>`)

        
        let queryURL = `https://www.hikingproject.com/data/get-trails?lat=${latitude}&lon=${longitude}&key=200961808-6d569e74377269afd022c8e12b63296c`
        // let trailInput = $('#trailInput').val();


        $.ajax({
            url:queryURL,
            method: 'GET'
        }).then(function(response){
            let trailName = response.trails[0].name
            // $(".trailListResults").append(JSON.stringify(response))
            console.log(response)
            console.log(response.trails[0].name)
            
        })

    })

    }