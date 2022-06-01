(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function loadImg(search) {
    const url = `https://api.unsplash.com/search/photos?query=${search}&per_page=20&client_id=NePAJamA-n-9QQR7jdUQ2-PDcmJF6bVQmopOo5TGrcI`;
      return fetch(url)
          .then(response => {
              return response.json();
          })
          .then(data => {
                    const imgUrl = data.results[0].urls.raw;
                    return imgUrl;
              });
  }

  module.exports = { loadImg }
},{}],2:[function(require,module,exports){
const {loadImg} = require('./hanibal/getImageApi')

const form = document.getElementById('form');
form.addEventListener('submit', displayResults)

function fetchData (name) {
    const url = `https://restcountries.com/v3.1/name/${name}`
    const data = fetch(url)
    .then(resp => resp.json())
    //.then(displayResults)
    .catch(err => console.warn('Opa, something went wrong!', err)) 

    return data;
}

async function displayResults (e) {
    e.preventDefault();
    const name = form.query.value;
    console.log(name);
    const data = await fetchData(name);
    const countryName = data[0].name.common;
    let currency = data[0].currencies;
    const key = Object.keys(currency)[0];
    console.log('Capital', data[0].capital[0]);
    currency = currency[key].name;
    console.log(currency);
    const imageUrl = await loadImg(countryName);
    console.log(countryName, imageUrl);
    document.getElementById("myImg").src = imageUrl;
    document.getElementById("cardBody").style.display = "block";

    document.getElementById("cardGreeting").innerHTML=countryName;
    document.getElementById('currency').innerHTML=`Currency: ${currency}`;
    document.getElementById('capital').innerHTML= `Capital City: ${data[0].capital[0]}`
    const map = document.getElementById("myMap");
    map.src = `https://maps.google.com/maps?q=${countryName}&t=&z=5&ie=UTF8&iwloc=&output=embed`;
    //document.getElementById("cardMessage").innerHTML=message;
}
},{"./hanibal/getImageApi":1}]},{},[2]);
