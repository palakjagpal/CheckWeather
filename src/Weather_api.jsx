import { useState } from "react";
import axios from "axios";
import "./Weather_api.css";

const API_KEY = import.meta.env.VITE_API_KEY;

function Weather_api(){
    const [weather,setweather] = useState(null);
    const [city, setcity] = useState("");
    const [error, seterror] = useState(false);

    async function getWeather(e){
        e.preventDefault();
        try{
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            setweather(res.data)
            setcity("")
            //setweather("")
            seterror(false)
        }catch(err){
            seterror(true)
            setweather(null)
            console.log("Error : ",err)
        }
    }

    return(
        <>
            <div className="weatherForm">
                <h2>Check Weather...</h2>
                <br></br>
                <form onSubmit={getWeather}>
                    <input type="text" placeholder="Enter City" value={city} onChange={(e) => setcity(e.target.value)}></input>
                    <br></br>
                    <button type="submit">SEARCH</button>
                </form>
            </div>

            <div>
                {weather && !error && 
                    (
                    <div className="weather"> 
                        <br></br>
                        <hr></hr>
                        <br></br>
                        <h2><b>City : </b>{weather.name}</h2> 
                        <br></br> 
                        <p><b>Feels like :  </b>{weather.main.feels_like}</p>
                        <p>Min Temp - {weather.main.temp_min}</p> 
                        <p>Max Temp - {weather.main.temp_max}</p>
                        <br></br>
                        <p><b>Humidity : </b>{weather.main.humidity}</p>
                        <br></br>
                        <p><b>What sky says? : </b>{weather.weather[0].main}({weather.weather[0].description})</p> 
                        <br></br>
                        <p><b>Wind : </b>{weather.wind.speed}</p>
                    </div> 
                    )
                }

                {
                    error && (<div className="error"><p style="color:red;">Failed to fetch weather</p></div>)
                }
            </div>
            
        </>
    )
}

export default Weather_api;