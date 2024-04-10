import React from "react";

const Button = ({ cityName, selectCityHandler, selectLocation }) => {
  return (
    <button
      key={cityName}
      className={selectLocation === cityName ? "active" : undefined}
      onClick={() => {
        selectCityHandler(cityName);
      }}
    >
      {cityName}
    </button>
  );
};

export default Button;
