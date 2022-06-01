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