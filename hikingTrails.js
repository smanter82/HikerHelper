$("#submitBtn").on("click", searchZip);

let getStorage = localStorage.getItem("savedDetails") || "[]";
let storageParse = JSON.parse(getStorage);

previousZip();

function previousZip() {
  let zipInput = storageParse[0];
  console.log(zipInput);

  let zipCodeURL = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=${zipInput}&facet=state&facet=timezone&facet=dst`;

  $.ajax({
    url: zipCodeURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    console.log(response.records[0].geometry.coordinates[0]);
    console.log(response.records[0].geometry.coordinates[1]);

    let longitude = response.records[0].geometry.coordinates[0];
    let latitude = response.records[0].geometry.coordinates[1];

    let queryURL = `https://www.hikingproject.com/data/get-trails?lat=${latitude}&lon=${longitude}&key=200961808-6d569e74377269afd022c8e12b63296c`;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      console.log(response.trails[0].name);
      for (let i = 0; i < response.trails.length; i++) {
        let trailName = response.trails[i].name;
        let trailLocation = response.trails[i].location;
        let trailSummary = response.trails[i].summary;
        let trailDifficulty = response.trails[i].difficulty;

        console.log(response.trails[i].name);
        $("#trailResults").append(`<div class="trailListResults">
        <div class="left-align">
        <a class=" trailButton waves-effect waves-light btn-small">${trailName}</a>
        </div>
        <div id="trailLocation" class="left-align trailData">
          <b>Location:</b> ${trailLocation}
        </div>

        <div id="trailSummary" class="left-align trailData">
          <b>Summary:</b> ${trailSummary}
        </div>

        <div id="trailRating" class="left-align trailData">
          <b>Difficulty:</b> ${trailDifficulty}
        </div>`);
      }
    });
  });
}


function searchZip() {
  let zipInput = $("#textarea1").val();
  console.log(zipInput);

  let zipCodeURL = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=${zipInput}&facet=state&facet=timezone&facet=dst`;

  $.ajax({
    url: zipCodeURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    console.log(response.records[0].geometry.coordinates[0]);
    console.log(response.records[0].geometry.coordinates[1]);

    let longitude = response.records[0].geometry.coordinates[0];
    let latitude = response.records[0].geometry.coordinates[1];

    let queryURL = `https://www.hikingproject.com/data/get-trails?lat=${latitude}&lon=${longitude}&key=200961808-6d569e74377269afd022c8e12b63296c`;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      console.log(response.trails[0].name);
      for (let i = 0; i < response.trails.length; i++) {
        let trailName = response.trails[i].name;
        let trailLocation = response.trails[i].location;
        let trailSummary = response.trails[i].summary;
        let trailDifficulty = response.trails[i].difficulty;

        console.log(response.trails[i].name);
        $("#trailResults").append(`<div class="trailListResults">
        <div class="left-align">
        <a class=" trailButton waves-effect waves-light btn-small">${trailName}</a>
        </div>
        <div id="trailLocation" class="left-align trailData">
          <b>Location:</b> ${trailLocation}
        </div>

        <div id="trailSummary" class="left-align trailData">
          <b>Summary:</b> ${trailSummary}
        </div>

        <div id="trailRating" class="left-align trailData">
          <b>Difficulty:</b> ${trailDifficulty}
        </div>`);
      }
    });
  });
}
