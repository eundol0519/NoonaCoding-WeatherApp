interface PropsType {
  cityName: string;
  selectCityHandler: (name: string) => void;
  selectLocation: string;
}

const Button = ({ cityName, selectCityHandler, selectLocation }: PropsType) => {
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
