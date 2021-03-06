const weatherForm = document.querySelector('form');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const address = e.target[0].value;
  const locationEl = document.getElementById('location');
  const forecastEl = document.getElementById('forecast');

  locationEl.textContent = 'Loading...';
  forecastEl.textContent = '';

  fetch(
    // remove origin from the url for the use in Heroku
    `/weather?address=${encodeURIComponent(address)}`
  ).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        locationEl.textContent = 'Oops!';
        forecastEl.textContent = data.error;
      } else {
        console.log(data);
        const {
          forecast: { temperature, description, feelslike },
          location,
        } = data;

        locationEl.textContent = location;
        forecastEl.innerText = `${description}. Currently ${temperature}°C and feels like ${feelslike}°C.`;
      }
    });
  });
});
