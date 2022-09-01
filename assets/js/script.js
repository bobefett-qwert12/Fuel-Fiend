var repoList = document.querySelector('ul');
var fetchButton = document.getElementById('fetch-button');
var lat;
var lon;
var zipcode = 84111;
var make = document.getElementbyId('vehicleMake');
var model = document.getElementById('vehicleModel');
var year = document.getElementbyId('vehicleYear');
var mpg;

function getApi() {
  // enter zipcode
  var requestUrl = 'https://nominatim.openstreetmap.org/search/' + zipcode + '?countrycodes=us&format=json';

  fetch(requestUrl)
      .then((response) => response.json())
      .then((data) => {
          console.log(data)
          lat = data[0].lat;
          lon = data[0].lon;
          gasPrice();
      });
      getCarData();
}
fetchButton.addEventListener('click', getApi);

function gasPrice() {

  var a = document.createElement ('a');
  a.href =  window.open("https://www.gasbuddy.com/gaspricemap?fuel=1&z=13&lat=" + lat + "&lng=" + lon, "_blank");
}

function getCarData() {
  //get mpg depending on vehicle model

  var requestCarData = 'https://api.api-ninjas.com/v1/cars?limit=2&make=' + make + '&model=' + model + '&year=' + year;
  console.log (requestCarData);
  
  fetch (requestCarData, {
      headers: { 'X-Api-Key': 'U8GEjGPYrv4EvTST1U6frA==3RTxegfGwmN9elfd'}
  })
  .then((response) => response.json())
  .then((data) => {
      console.log(data)
      mpg = data[0].combination_mpg;
      console.log(mpg);

  });
}