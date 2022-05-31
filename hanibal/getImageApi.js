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