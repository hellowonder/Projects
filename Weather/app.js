
let apidata = {
    url : 'https://api.openweathermap.org/data/2.5/',
    key : '9a346d45d53c9db7d597bbf4354a0e7b',
}

const city = document.querySelector('.inp');
city.addEventListener('keypress',(e) =>{
    if(e.keyCode == 13){
        console.log(city.value);
        getWeatherReport(city.value);
        city.value = ""  ;
    }
});

function getWeatherReport(data){
    fetch(`${apidata.url}weather?q=${data}&appid=${apidata.key}`)
    .then(weather =>{
        return weather.json();
    }).then(showWeatherReports);
}

function showWeatherReports(weather){
    console.log(weather);

    let location = document.querySelector('.location')
    location.innerText = `${weather.name}, ${weather.sys.country}`;

    let temp = document.querySelector('.temperature');
    temp.innerHTML = `${Math.round(weather.main.temp -273.15)}&deg; C`

    let condition = document.querySelector(`.condition`);
    condition.innerText = `${weather.weather[0].main}`;

    let range = document.querySelector('.range');
    range.innerHTML = `${Math.floor(weather.main.temp_min -273.15)}&deg;C / ${Math.ceil(weather.main.temp_max -273.15)}&deg;C`
    
}