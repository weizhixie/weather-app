export function createWeatherSection(currentConditions, days) {
  const weatherSection = document.createElement("section");
  weatherSection.classList.add("weather-section");

  weatherSection.append(
    createIconAndTemp(currentConditions, days),
    createTimeAndCond(currentConditions),
  );

  return weatherSection;
}

function createIconAndTemp(currentConditions, days) {
  const iconTempWrapper = document.createElement("div");
  iconTempWrapper.classList.add("icon-temp-wrapper");

  const weatherIcon = document.createElement("img");
  weatherIcon.classList.add("weather-icon");
  import(`/src/assets/weather-icons/${currentConditions.icon}.png`)
    .then((icon) => {
      weatherIcon.src = icon.default;
    })
    .catch((error) => console.error(`Failed to load icon ${error}`));

  const tempWrapper = document.createElement("div");

  const currentTemp = document.createElement("p");
  currentTemp.classList.add("current-temp");
  currentTemp.textContent = `${currentConditions.temp}\u2103`;

  const highLowTemp = document.createElement("p");
  highLowTemp.textContent = `High:${days[0].tempmax}\u2103 Low:${days[0].tempmin}\u2103`;

  tempWrapper.append(currentTemp, highLowTemp);
  iconTempWrapper.append(
    weatherIcon,
    tempWrapper,
    createHumidityAndWind(currentConditions),
  );
  return iconTempWrapper;
}

function createHumidityAndWind(currentConditions) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("humidity--wind-wrapper");

  const humidityEl = document.createElement("p");
  humidityEl.textContent = `Humidity:${currentConditions.humidity}%`;

  const windEl = document.createElement("p");
  windEl.textContent = `Wind Speed:${currentConditions.windspeed}km/h`;

  wrapper.append(humidityEl, windEl);
  return wrapper;
}

function createTimeAndCond(currentConditions) {
  const timeCondWrapper = document.createElement("div");
  timeCondWrapper.classList.add("time-cond-wrapper");

  const today = new Date();

  const currentTime = document.createElement("p");
  currentTime.classList.add("current-time");
  currentTime.textContent = today.toLocaleString(undefined, {
    hour: "numeric",
    minute: "numeric",
  });

  const currentDatetime = document.createElement("p");
  currentDatetime.textContent = today.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const condition = document.createElement("p");
  condition.textContent = currentConditions.conditions;

  timeCondWrapper.append(currentTime, currentDatetime, condition);
  return timeCondWrapper;
}
