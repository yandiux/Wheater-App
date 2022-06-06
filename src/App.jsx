import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [latLon, setlatLon] = useState();
  const [weather, setweather] = useState();
  const [isBoolean, setisBoolean] = useState(true);
  const hour= new Date().getHours()
  const minute= new Date().getMinutes()
  let iconApp = (weather?.weather[0].icon)+".png"
  let urlApp = `https://openweathermap.org/img/wn/${iconApp}`

  const toogleIsBoolean = () => {
    setisBoolean(!isBoolean);
  };


  useEffect(() => {
    const success = (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      setlatLon({ lat, lon });
    };

    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (latLon !== undefined) {
      const API_KEY = "a5d97a62acb53c21b07f240ccb6a406e";
      const URL = `//api.openweathermap.org/data/2.5/weather?lat=${latLon.lat}&lon=${latLon.lon}&appid=${API_KEY}`
      axios
        .get(URL)
        .then((res) => setweather(res.data))
        .catch((err) => console.log(err));
    }
  }, [latLon]);

  console.log(urlApp);
  return (
    <div className="App">
      <div className="ali-center">
      <img className="icon" src={urlApp}/>
      <h1>{weather?.weather[0].main}</h1>
      <i className="fa-solid fa-location-dot ubi"></i>{weather?.name}, {weather?.sys.country} <br />
      <i className="fa-solid fa-temperature-full ubi"></i>{weather?.main.pressure} mB <br />
      <i className="fa-solid fa-clock ubi"></i>{hour}:{minute}<br />
      <i className="fa-solid fa-wind ubi"></i>{weather?.wind.speed} Km/h<br />
      <i className="fa-solid fa-cloud ubi"></i>{weather?.clouds.all} %<br />
      
      </div>
      <h3>
        Temp:
        {isBoolean
          ? (weather?.main.temp - 273.15).toFixed(0) 
          : ((weather?.main.temp - 273.15) * 1.8 + 32).toFixed(0) } 
        {isBoolean ? '°C' : '°F'}
      </h3>
      <button className="btn-55 " onClick={toogleIsBoolean}>Cambiar C/F </button>
      
    </div>
  );
}

export default App;