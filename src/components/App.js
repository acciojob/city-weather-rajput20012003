
// import React, { useState } from "react";
// import axios from "axios";
// import 'regenerator-runtime/runtime'

// const API_KEY = "2d19741fec5e1ebbce4e4b02007b3734";

// function App() {
//   const [query, setQuery] = useState("");
//   const [weather, setWeather] = useState(null);

//   const search = async (e) => {
//     if (e.key === "Enter") {
//       const response = await axios.get(
//         `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`
//       );
//       setWeather(response.data);
//       setQuery("");
//     }
//   };

//   const kelvinToFahrenheit = (k) => ((k - 273.15) * 9) / 5 + 32;

//   return (
//     <div className="app">
//       <input
//         type="text"
//         className="search"
//         placeholder="Enter a city"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         onKeyPress={search}
//       />
//       {weather && (
//         <div className="weather">
//           <div className="city">{weather.name}</div>
//           <div className="temperature">
//             {Math.round(kelvinToFahrenheit(weather.main.temp))}°F
//           </div>
//           <div className="description">{weather.weather[0].description}</div>
//           <div className="icon">
//             <img
//               src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
//               alt={weather.weather[0].description}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


import "@babel/polyfill";

import React,{useState,useEffect } from "react";
import './../styles/App.css';

const App = () => {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
  const fetchApi = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=2d19741fec5e1ebbce4e4b02007b3734`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          setError('City not found');
          throw new Error('City not found');
          
        }
        setError('')
        return response.json();
      })
      .then(data => setWeather(data))
      .catch(error => setWeather({error: error.message}));
  }
  fetchApi();
}, [city]);

  
  function display(){
    setCity(search)
  }
   
  return (
    <div className="main" id="main">
      <div className="search">
        <input type="text" placeholder="Enter a city" onChange={(e)=>setSearch(e.target.value)}/>
        <button onClick={display}>Search</button>
      </div>
      <div className="weather">
        { error && 
          <h2>{error}</h2>
        }
        { weather.main && 
          <>
            <h1>{city}</h1>
            <h2>{weather.main.temp}°Cel</h2>
            <h3>{weather.weather[0].description}</h3>
            <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="cloud image"/>
          </>
        }
      </div> 
    </div>
  )
  
}

export default App