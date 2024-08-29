import { useEffect, useState } from 'react'
import './App.css'
import searchIcon from "./assets/search.png"
import rainDayIcon from "./assets/rainy-day.png"
import sunIcon from "./assets/sun.png"
import coloudyIcon from "./assets/cloudy.png"
import snowIcon from "./assets/snow.png"
import humidityIcon from "./assets/humidity.png"
import windIcon from "./assets/wind.png"


const WeatherDetails=({icon,temp,city,country,lat,log,humidity,wind})=>{
   return (
    <>
     <div className='image'>
      <img src={icon} alt='rainDay'/>
     </div>   
     <div className='temp'>{temp}'C </div>
     <div className='location'>{city}</div>
     <div className='country'>{country}</div>
     <div className="cord">    

        <div>
             <span className='lat'>latitude</span>
             <span>{lat}</span>    
        </div>
        <div>
             <span className='log'>logitude</span>
             <span>{log}</span>    
        </div>     
     </div>
     <div className='data-container'>
      <div className='element'>
        <img className="Icons" src={humidityIcon} alt='humidity'/>
        <div className="data">
          <div className="humidity-percentage">{humidity}%</div>
          <div className='text'>Humidity</div>
        </div>
      </div>
      <div className='element'>
        <img className="Icons" src={windIcon} alt='humidity'/>
        <div className="data">
          <div className="humidity-percentage">{wind}km/hr</div>
          <div className='text'>Wind Speed</div>
        </div>
      </div>

     </div>
      
   </>
   )
};



function App() {
  let api_key= "75e6e696e3555990eac587def2124a2f";
  const [text,setText] =useState("Salem")

  const [icon, setIcon] = useState(rainDayIcon);
  const [temp,setTemp] =useState(0);
  const [city,setCity] = useState("");
  const [country,setCountry] = useState("IN");
  const [lat,setLat] = useState(0);
  const  [log,setLog] = useState(0);
  const [humidity,setHumidity] = useState(0);
  const [wind, setWind] =useState(0);
  const [cityNotFound,setCityNotFound] =useState(false);
  const [loading,setLoading] =useState(false);
  const [error,setError] = useState(null);


const WeatherIconMap={
  "01d": sunIcon,
  "01n": sunIcon,
  "02d": sunIcon,
  "02n": sunIcon,
  "03d": coloudyIcon,
  "03n": coloudyIcon,
  "04d": coloudyIcon,
  "04n": coloudyIcon,
  "09d": rainDayIcon,
  "09n": rainDayIcon,
  "10d": rainDayIcon,
  "10n": rainDayIcon,
  "13d": snowIcon,
  "13n": snowIcon,

}



  const search=async ()=>{
    setLoading(true);
    
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;

    try {
      let res = await fetch(url);
      let data =  await res.json();
      //console.log(data);
      if (data.cod==="404"){
        console.error("City not found")
        setCityNotFound(true);
        setLoading(true);
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weatherIconCode=data.weather[0].icon;
      setIcon(WeatherIconMap[weatherIconCode] || sunIcon)
      setCityNotFound(false)

    } catch(error){
      console.error("An error occurred:",error.message); 
      setError("An error occurred while fetching weather data.")

    } finally{
      setLoading(false);

    }

  };

  const handleCity = (e) =>{
    setText(e.target.value);
  }

  const handleKeyDown = (e) =>{
    if(e.key=== "Enter") {
      search();
    }

  useEffect(function (){
    search();
  }, []);
  }

  return (
       <>
       <div className='container'>
        <div className='input-container'>
          <input className='cityInput' 
          type='text' 
          placeholder='Search City' 
          onChange={handleCity} 
          value={text} 
          onKeyDown={handleKeyDown}
          />
          
          <div className='search-icon' onClick={()=>search()}>
          <img src={searchIcon} alt="Search"/>
          </div>

        </div>
       {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>}
           {loading && <div className='loading-message'>Loading...</div>}
           {error && <div className="error-message">{error}</div>}
           {cityNotFound && <div className="city-not-found">City not found</div>}


       <p className='sk'>Designed by <span>SatheeshKumar</span></p>
        </div>       
       </>
      )
};

export default App
