const cityForm = document.querySelector('form');
const cards = document.querySelector('.card');
const details = document.querySelector('.detail');
const dayTime = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateUI = (data) => {
    
    const cityDets = data.cityDets;
    const weather = data.weather;
    console.log('DATA', data);

    //const { cityDets, weather} = data;

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${Math.round(weather.Temperature.Metric.Value)}</span>
            <span>&deg; C</span>
        </div>
    `;

    // remove the d-none class if present
    if(cards.classList.contains('d-none')) {
        cards.classList.remove('d-none');
    }

    //update the day/night image
    const iconSrc = `icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = weather.IsDayTime ? 'icons/day.svg' : 'icons/night.svg';

    dayTime.setAttribute('src', timeSrc);
}

const updateCity = async (city) => {
    const cityDets = await getCity(city);

    const weather = await getWeather(cityDets.Key);

    return {
        cityDets,
        weather
    };
}


cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the UI with new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(error => console.log(error));

    localStorage.setItem('city', city);
});

if(localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(error => console.log(error))

}
