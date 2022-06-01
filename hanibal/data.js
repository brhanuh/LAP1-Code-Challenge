const {loadImg} = require('./getImageApi')

const form = document.getElementById('form');
form.addEventListener('submit', displayResults)
function fetchData () {
    const url = "https://restcountries.com/v3.1/all"
    const data = fetch(url)
    .then(resp => resp.json())
    //.then(displayResults)
    .catch(err => console.warn('Opa, something went wrong!', err)) 

    return data;
}

async function displayResults (e) {
    e.preventDefault();
    const data = await fetchData();
    console.log(data[0].name.common);
    const countryName = data[0].name.common;
    const imageUrl = await loadImg(countryName);
    console.log(imageUrl);
}