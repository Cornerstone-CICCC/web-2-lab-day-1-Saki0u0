//get city name
const btn = document.querySelector('.btn')
const form = document.getElementById('cityForm');
const main = document.querySelector('.main')

form.addEventListener('submit', async (event) => {
  event.preventDefault(); 
  const cityInput = document.getElementById('cityInput');
  const city = cityInput.value;

  document.getElementById('city_name').textContent = city;
  main.classList.add('appearMain')
  await getPostById(city);
});

//city
async function getPostById(city){
  try{
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
    const data = await res.json()

      const result = data.results[0];
      const country = result.country;
      const timezone = result.timezone;
      const population = result.population;
      const latitude = result.latitude;
      const longitude = result.longitude;
      

      const resWeather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,rain,showers&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`)
      const weatherData = await resWeather.json();

      const temperature_max  = weatherData.daily.temperature_2m_max;
      const  temperature_min = weatherData.daily.temperature_2m_min;
      const temperature = weatherData.current.temperature_2m;

      document.getElementById('country').textContent = country;
      document.getElementById('timezone').textContent = timezone;
      document.getElementById('population').textContent = population;
      document.getElementById('temperature').textContent = `${temperature}°C`;

      document.getElementById('tomorrow_max').textContent = temperature_max;
      document.getElementById('tomorrow_min').textContent = temperature_min;

      const localTime = new Date().toLocaleString("en-US", { timeZone: timezone });
      const localDate = new Date(localTime);
      const hours = localDate.getHours();
      const img = document.querySelector('#timeImage');
      const body = document.querySelector('body');
      const elements = document.querySelectorAll('table, .header, .title, ul, li');

      if (hours >= 6 && hours < 18) { 
        img.src = './images/day.jpg';
        img.alt = 'Day Image';
      } else {
        img.src = './images/night.jpg';
        img.alt = 'Night Image';
        body.classList.add('bodyNight')
      }

  }catch(error){
    console.error(error)
  }
}



