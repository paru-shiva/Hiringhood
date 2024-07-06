import "./index.css";

const WeeklyCard = (props) => {
  const date = props.data.date;

  const {
    maxtemp_c,
    maxtemp_f,
    mintemp_c,
    mintemp_f,
    avghumidity,
    daily_chance_of_rain,
  } = props.data.day;

  const { text, icon } = props.data.day.condition;

  return (
    <div className="weeklyCardComponent">
      <p className="weekCardPara">{date}</p>
      <img src={icon} />
      <p className="weekCardPara">{text}</p>
      <p className="weekCardPara">{`Min ${mintemp_c}°C / ${mintemp_f}°F`}</p>
      <p className="weekCardPara">{`Max ${maxtemp_c}°C / ${maxtemp_f}°F`}</p>
      <p className="weekCardPara">{`Humidity ${avghumidity}`}</p>
      <p className="weekCardPara">{`Chance of Rain ${daily_chance_of_rain}`}</p>
    </div>
  );
};

export default WeeklyCard;
