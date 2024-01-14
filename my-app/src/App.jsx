import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
import sunny from "./assets/sunny.jpg";
import winter from "./assets/winter.jpeg";
import sun from "./assets/sun.png";
import cloud from "./assets/cloud.png";
import snow from "./assets/snow.png";
import rain from "./assets/rain.png";
import thunder from "./assets/thunder.png";
import fog from "./assets/fog.png";
import mist from "./assets/mist.png";
import drizzle from "./assets/drizzle.png";
import haze from "./assets/haze.png";
import {HiArrowSmUp, HiArrowSmDown} from "react-icons/hi";
import { BsEmojiSmile } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";
import { WiHumidity, WiCloudyWindy } from "react-icons/wi";

function App() {
    
    const api = 'b7b5dd4a6c8d8c6ce3ab04a6b86a1514';
    useEffect(() => {
      document.title = "Tulgaa's weather";
    }, [])
    const [data, setData] = useState({})
    const [city, setCity] = useState("");
    const [bg, setBg] = useState(winter)
    const [icon, setIcon] = useState()
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`

    const weatherConditions = [
      { condition: 'Clear', img1: sun },
      { condition: 'Clouds', img1: cloud },
      { condition: 'Snow', img1: snow },
      { condition: 'Rain', img1: rain },
      { condition: 'Thunderstorm', img1: thunder },
      { condition: 'Fog', img1: fog },
      { condition: 'Mist', img1: mist },
      { condition: 'Drizzle', img1: drizzle },
      { condition: 'Haze', img1: haze },
    ];

    const submit = (e) => {
        
      e.preventDefault();
      if (city.trim() === '') return
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      setCity("");
    }
    useEffect(() => {
      const img = data.main && data.main.temp >= 273.15 ? sunny : winter;
      setBg(img);
    }, [city, data]);
    useEffect(() => {
      const current = data.weather && data.weather[0] ? data.weather[0].main : null;
      const foundCondition = weatherConditions.findIndex(condition => condition.condition === current);
    
      // Check if the condition is found before setting the icon
      if (foundCondition !== -1) {
        setIcon(weatherConditions[foundCondition].img1);
      }
    }, [city, data.weather]);
    return (
      <div className='app' style={{backgroundImage: `url(${bg})`}}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <div className='search-section'>
            <form onSubmit={submit}>
              <input type="search" placeholder='Enter city name' onChange={e => setCity(e.target.value)} value={city}/>
              <button className='enter-btn'>Enter</button>
            </form>
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <div className='middle-section'>
            <div className='inner-middle'>
              <div>
                <h1>{data.name} {data.sys ? data.sys.country : null}</h1>
              </div>
              <div><img src={icon} alt="weather icon" className='icon-img'/></div>
              <div>
                {data.weather && data.weather[0] ? (
                    <h1>{data.weather[0].main}</h1>
                  ) : null}
              </div>
            </div>
            <div className='temp-section'>
                {data.main ? <h1>{Math.round(data.main.temp - 273.15)}°C</h1> : null}
            </div>
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <div className='footer-section'>
            <div className='footer-inner'>
              <div>
                  <HiArrowSmUp size={30}/> 
              </div>
              <div>
                  {data.main ? <h1>{Math.round(data.main.temp_max - 273.15)}°C</h1> : null}
              </div>
            </div>
            <div className='footer-inner'>
              <div>
                  <HiArrowSmDown size={30}/> 
              </div>
              <div>
                  {data.main ? <h1>{Math.round(data.main.temp_min - 273.15)}°C</h1> : null}
              </div>
            </div>
            <div className='footer-inner'>
              <div>
                  <BsEmojiSmile size={30}/> 
              </div>
              <div>
                  {data.main ? <h1>{Math.round(data.main.feels_like - 273.15)}°C</h1> : null}
              </div>
            </div>
            <div className='footer-inner'>
              <div>
                  <WiHumidity size={40}/> 
              </div>
              <div>
                  {data.main ? <h1>{data.main.humidity}</h1> : null}
              </div>
            </div>
            <div className='footer-inner'>
              <div>
                  <IoTimeOutline size={30}/> 
              </div>
              <div>
                  {data.timezone ? <h1>{data.timezone}</h1> : null}
              </div>
            </div>
            <div className='footer-inner'>
              <div>
                  <WiCloudyWindy size={30}/> 
              </div>
              <div>
                  {data.wind ? <h1>{data.wind.speed}km/h</h1> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default App
