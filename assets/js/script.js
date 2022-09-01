var gasButton = document.getElementById('gasButton');
var lat;
var lon;
var zipcode;
var make;
var model;
var year;
var grandTotal;
var mpg;
var milesDriven;
var price;


var lsMake = localStorage.getItem("Make");
var lsModel = localStorage.getItem("Model");
var lsYear = localStorage.getItem("Year");

if (lsMake != null) {
  document.getElementById('vehicleMake').value = lsMake
  document.getElementById('vehicleModel').value = lsModel
  document.getElementById('vehicleYear').value = lsYear
};



function getApi() {
  // enter zipcode
  zipcode = document.getElementById('zipCode').value;
  make = document.getElementById('vehicleMake').value.toLowerCase();
  model = document.getElementById('vehicleModel').value.toLowerCase();
  year = document.getElementById('vehicleYear').value;
  var requestUrl = 'https://nominatim.openstreetmap.org/search/' + zipcode + '?countrycodes=us&format=json';

  localStorage.setItem("Make", make);
  localStorage.setItem("Model", model);
  localStorage.setItem("Year", year);

  console.log(requestUrl);
  console.log(zipcode);
  console.log(make);

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
gasButton.addEventListener('click', getApi);

function gasPrice() {

  var a = document.createElement('a');
  a.href = window.open("https://www.gasbuddy.com/gaspricemap?fuel=1&z=13&lat=" + lat + "&lng=" + lon, "_blank");
}

function getCarData() {
  //get mpg depending on vehicle model

  var requestCarData = 'https://api.api-ninjas.com/v1/cars?limit=2&make=' + make + '&model=' + model + '&year=' + year;
  console.log(requestCarData);

  fetch(requestCarData, {
    headers: { 'X-Api-Key': 'U8GEjGPYrv4EvTST1U6frA==3RTxegfGwmN9elfd' }
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      mpg = data[0].combination_mpg;
      console.log(mpg);

    });
}

function calculate() {
  grandTotal = document.getElementById('grandTotal');
  price = document.getElementById('price').value;
  milesDriven = document.getElementById('milesDriven').value;
  var money = (Math.floor(((milesDriven / mpg) * price) * 100)) / 100;
  grandTotal.innerHTML = ("$" + money);
  console.log(grandTotal.value);
};

priceButton.addEventListener('click', calculate);

// var repoList = document.querySelector('ul');
