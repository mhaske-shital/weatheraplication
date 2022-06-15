import React,{useState,useEffect} from 'react'
import WeatherCard from './WeatherCard';
import "./style.css";
export default function Temp() {
 const [searchValue, setsearchValue] = useState("pune");
 const [tempInfo, settempInfo] = useState({});
 const getWeaterInfo =async()=>{
     
    try {
        let url =`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=a9b2a9ea500d53b2efd81fff5185c3e3`;
        let res = await fetch(url);
        let data =await res.json();
        const {temp,pressure,humidity}=data.main;
        const {main:weathermood}=data.weather[0];
        const {name}=data;
        const {speed}=data.wind;
        const {country,sunset}=data.sys;

        const myNewWeatherInfo={
            temp,
            pressure,
            humidity,
            weathermood,
            name,
            speed,
            country,
            sunset,
        }
        settempInfo(myNewWeatherInfo)
    } catch (error) {
        console.log(error)
    }
  }
 useEffect(() => {
    getWeaterInfo()
 }, [])
  return (
    <>
    <div className="wrap">
        <div className="search">
            <input type="search" 
            placeholder='search..'
            autoFocus
            id="search"
            className='searchTerm'
            value={searchValue}
            onChange={(e)=>setsearchValue(e.target.value)}/>
            <button className='searchButton' onClick={getWeaterInfo}>Search</button>
            </div>
    </div>
    <WeatherCard tempInfo={tempInfo} />
    </>
  )
}
