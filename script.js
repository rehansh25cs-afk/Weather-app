let today_date = new Date()

let input = document.querySelector('.city-input')

console.log(today_date.getMinutes());



async function getWeather(city) {
    try {
        let API_key = `df8820f74f8ee336067e49d8dc26b667`
        let raw = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`)

        if (!raw.ok) {
            throw new Error('Enter correct city name!!')
        } else {
            let data = await raw.json()
            console.log(data);
            document.querySelector('.city').innerHTML = data.name;
            document.querySelector('.date').innerHTML = today_date.toLocaleDateString() + ' • Clear sky'
            document.querySelector('.temp-value').innerHTML = Math.floor(data.main.temp) + '°' ;
            document.querySelector('.temp').style.fontSize = '88px'
            document.querySelector('.temp').style.fontWeight = '800'
            document.querySelector('.feels').innerHTML = 'Feels like - ' + data.main.feels_like + '°'
            let sunrise = new Date((data.sys.sunrise) * 1000)
            let sunset = new Date((data.sys.sunset) * 1000)
            document.querySelector('.sunrise').innerHTML = sunrise.getHours().toString().padStart(2, '0') + '-' + sunrise.getMinutes().toString().padStart(2, '0') + ' ' + "AM"
            document.querySelector('.sunset').innerHTML = sunset.getHours().toString().padStart(2, '0') + '-' + sunset.getMinutes().toString().padStart(2, '0') + ' ' + "PM"
            let progress = (today_date.getHours() - sunrise.getHours()) / (sunset.getHours() - sunrise.getHours()) * 100;
            document.querySelector('.sun-progress').style.width = progress + '%';

            document.querySelector('.humidity').innerHTML = data.main.humidity + '%'
            document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h '
            document.querySelector('.pressure').innerHTML = data.main.pressure + ' hPa '
            document.querySelector('.visibility').innerHTML = data.visibility / 1000 + ' km '

        }
    }
    catch (err) {
        document.querySelector('.temp-value').innerHTML = err.message
        document.querySelector('.temp').style.fontSize = '30px'
        document.querySelector('.temp').style.fontWeight = '500'
        console.log(err.message);
        


    }


}




document.querySelector('.search-btn').addEventListener('click', () => {
    getWeather(input.value)
    input.value = ''

})

document.addEventListener('keydown', (val) => {
    if (val.key === 'Enter') {
        getWeather(input.value)
        input.value = ''
    }


})