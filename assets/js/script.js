var repoList = document.querySelector('ul');
var fetchButton = document.getElementById('fetch-button');
var lat;
var lon;
var zipcode = 84121;

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
}
fetchButton.addEventListener('click', getApi);

function gasPrice() {

    var a = document.createElement('a');
    a.href = window.open("https://www.gasbuddy.com/gaspricemap?fuel=1&z=13&lat=" + lat + "&lng=" + lon, "_blank");
    console.log(a.href);
}