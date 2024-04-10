import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Spinner from "./element/Spinner";
import { locationPhoto } from "./constant/photo";
import InfoBox from "./component/InfoBox";
import Button from "./element/Button";

/*
  [유저 스토리]
  1. 앱이 실행되자 마자 현재 위치 기반의 날씨 정보가 보인다.
  2. 현재 날씨 정보에는 도시, 섭씨, 화씨 정보가 보인다.
  3. 밑에는 5개의 버튼이 있다. (현재 위치, 4개 도시)
  4. 도시 버튼을 누를 때마다 해당 도시별 날씨가 보인다.
  5. 현재 위치 버튼을 누르면 현재 위치 기반의 날씨가 나온다.
  6. 데이터를 불러오는 동안에는 로딩 스피너가 돈다.
*/

function App() {
  const [selectLocation, setSelectLocation] = useState("Current Location");
  const [data, setData] = useState();

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        getWeatherByCurrentLocation(lat, lon);
      });
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;

    axiosHandler(url, "currentLocation");
  };

  const selectCityHandler = (cityName) => {
    setData();
    setSelectLocation(cityName);

    if (cityName === "Current Location") {
      getCurrentLocation();
    } else {
      getWeatherByCityName(cityName);
    }
  };

  const getWeatherByCityName = async (cityName) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;

    axiosHandler(url, "cityName");
  };

  const axiosHandler = async (url, label) => {
    await axios
      .get(url)
      .then((res) => {
        setData({
          name: res.data.name,
          celsius: Math.round(res.data.main.temp),
          fahrenheit: Math.round(res.data.main.temp * 1.8 + 32),
          weather: res.data.weather[0].description,
        });
      })
      .catch((error) => console.error(`${label} error`, error));
  };

  return (
    <div className="container">
      {data ? (
        <>
          <InfoBox cityImage={locationPhoto[selectLocation]} data={data} />
          <div className="buttonWrap">
            {Object.keys(locationPhoto).map((item) => {
              return (
                <Button
                  cityName={item}
                  selectCityHandler={selectCityHandler}
                  selectLocation={selectLocation}
                />
              );
            })}
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default App;
