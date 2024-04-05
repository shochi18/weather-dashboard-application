import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardBody } from '@nextui-org/react'
import { useOutletContext } from 'react-router-dom'


const WEATHER_CODES = {
  "0": {
    desc: "Clear Sky",
    icon: "sky"
  },
  "1": {
    desc: "Mainly Clear",
    icon: "sky"
  },
  "2": {
    desc: "Partly Cloudy",
    icon: "sky"
  },
  "3": {
    desc: "Overcast",
    icon: "sky"
  },
}

const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return dayNames[date.getDay()];
}

const ForecastPage = () => {
  const [forecasts, setForecasts] = useState([])
  const [geolocation] = useOutletContext();
  const [localGeolocation, setLocalGeolocation] = useState(null)
  console.log(geolocation);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
        params: {
          latitude: geolocation.latitude,
          longitude: geolocation.longitude,
          daily: "weather_code,temperature_2m_max,temperature_2m_min",
          timezone: "auto",
          forecast_days: 5
        }
      });
      console.log(response);
      const data = response.data;
      const dailyForecasts = [];
      const daily = response.data.daily;

      if (daily && daily.time) {
        daily.time.map((date, index) => {
          console.log(daily.weather_code[`${index}`]);
          dailyForecasts.push({
            date: getDayOfWeek(date),
            weather: WEATHER_CODES[daily.weather_code[`${index}`]].desc,
            max_temp: `${daily.temperature_2m_max[index]}${data.daily_units.temperature_2m_max}`,
            min_temp: `${daily.temperature_2m_min[index]}${data.daily_units.temperature_2m_min}`
          })
        })
      }
      console.log(dailyForecasts);
      setForecasts(dailyForecasts);
    }

    if (geolocation) {
      fetchData();
    }
  }, [geolocation])

  return (
    <div className='container py-4 flex'>
      {forecasts.length > 0 ? (
        forecasts.map((forecast) => (
          <Card>
            <CardBody>
              <p>{forecast.date}</p>
              <p>{forecast.weather}</p>
              <p>Max Temp: {forecast.max_temp}</p>
              <p>Min Temp: {forecast.min_temp}</p>
            </CardBody>
          </Card>
        ))
      ) : (
        <Card>
          <CardBody>
            <p>No Data</p>
          </CardBody>
        </Card>
      )}
      
    </div>
  )
}

export default ForecastPage

// const ForecastPage = () => {
//   const [forecasts, setForecasts] = useState([])
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [geolocation] = useOutletContext();
//   //const geolocation = null
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
  //       params: {
  //         latitude: geolocation.latitude,
  //         longitude: geolocation.longitude,
  //         daily: "weather_code,temperature_2m_max,temperature_2m_min",
  //         timezone: "auto"
  //       }
  //     });
  //     console.log(response);
  //     const data = response.data;
  //     const dailyForecasts = [];
  //     const daily = response.data?.daily;
  //     if (daily && daily.time) {
  //       daily.time.map((date, index) => {
  //         dailyForecasts.push({
  //           date,
  //           weather: WEATHER_CODES[daily.weather_code[index]],
  //           max_temp: `${daily.temperature_2m_max[index]}${data.daily_units.temperature_2m_max}`,
  //           min_temp: `${daily.temperature_2m_min[index]}${data.daily_units.temperature_2m_min}`
  //         })
  //       })
  //     }
  //     console.log(dailyForecasts);
  //     setForecasts(dailyForecasts);
      
  //   }

  //   if (geolocation) {
  //     fetchData();
  //   }
  // }, [geolocation])

//   return (
//     <div className='container py-4'>
//       {forecasts.length > 0 ? (
//         forecasts.map((forecast) => (
//           <Card>
//             <CardBody>
//               <p>{forecast.date}</p>
//               <p>{forecast.weather}</p>
//               <p>Max Temp: {forecast.max_temp}</p>
//               <p>Min Temp: {forecast.min_temp}</p>
//             </CardBody>
//           </Card>
//         ))
//       ) : (
//         <Card>
//           <CardBody>
//             <p>Make beautiful websites regardless of your design experience.</p>
//           </CardBody>
//         </Card>
//       )}
      
//     </div>
//   )
// }

//export default ForecastPage