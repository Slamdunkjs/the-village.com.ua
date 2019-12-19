import React from 'react';

import ChangeToCelsii from './ChangeToCelsii';

function WeatherToday(props){
  const weather = props.weather;
  var adress = './icons/' + weather.list[0].weather[0].icon + '.png'

  return (
    <div className="weather">
        <span className="city">КИЇВ</span> 
        <img className="imgWeather" src={adress} alt='icon'></img> 
        <ChangeToCelsii change = {weather.list[0].main.temp}/>
    </div>
  )
}

export default WeatherToday