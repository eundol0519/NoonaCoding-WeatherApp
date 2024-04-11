interface PropsType {
  cityImage: string;
  data: {
    name: string;
    celsius: number;
    fahrenheit: number;
    weather: string;
  };
}

const InfoBox = ({ cityImage, data }: PropsType) => {
  return (
    <div className="infoWrap">
      <img src={cityImage} alt="locationImg" />
      <div>
        <h2>{data.name}</h2>
        <h1>
          {data.celsius}°C | {data.fahrenheit}°F
        </h1>
        <h2>{data.weather}</h2>
      </div>
    </div>
  );
};

export default InfoBox;
