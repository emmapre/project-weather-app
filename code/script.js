const placeContainer = document.getElementById('place')
const temperatureContainer = document.getElementById('temperature')
const descriptionContainer = document.getElementById('description')
const sunriseContainer = document.getElementById('sunrise')
const sunsetContainer = document.getElementById('sunset')
const fiveDaysContainer = document.getElementById('five-days')



fetch('http://api.openweathermap.org/data/2.5/weather?q=Malmo,Sweden&units=metric&APPID=224e607ac22e4aef9578da3aaa6f0b85')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    placeContainer.innerHTML = `<h2>The weather right now in ${json.name}.</h2>`
    descriptionContainer.innerHTML = `<h2>The weather is ${json.weather[0].description} right now.</h2>`
    temperatureContainer.innerHTML = `<h2>It is ${json.main.temp.toFixed(1)} degrees celsius.</h2>`

    const sunrise = new Date(json.sys.sunrise * 1000)
    const sunriseTime = sunrise.toLocaleTimeString([], {
      timeStyle: 'short'
    });
    sunriseContainer.innerHTML = `<h2>The sunrise is at ${sunriseTime}</h2>`

    const sunset = new Date(json.sys.sunset * 1000)
    const sunsetTime = sunset.toLocaleTimeString([], {
      timeStyle: 'short'
    });
    sunsetContainer.innerHTML = `<h2>The sunset is at ${sunsetTime}</h2>`

  })




fetch('https://api.openweathermap.org/data/2.5/forecast?q=Malmo,Sweden&units=metric&APPID=224e607ac22e4aef9578da3aaa6f0b85')
  .then((response) => {
    return response.json()
  })
  .then((json) => {

    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))

    filteredForecast.forEach((weatherDay) => {

      const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      let day = new Date(weatherDay.dt * 1000).getDay()

      let temperatureDay = weatherDay.main.temp.toFixed(1)
      fiveDaysContainer.innerHTML += `<h2>This is the day: ${weekdays[day]}. This is the temperature: ${temperatureDay}</h2>`
    });

  })