import { createWeatherSection } from "./weatherSection.js";
import { createWeatherStatsTable } from "./weatherStatsTable.js";
import { createHourForecastSection } from "./hourForecastSection.js";
import { createDayForecastSection } from "./dayForecastSection.js";

export function createMainContent(weatherData, currentUnit) {
  const { currentConditions, days, hours } = weatherData;

  const mainContent = document.createElement("main");
  mainContent.classList.add("main-content");

  const weatherLocation = document.createElement("h1");
  weatherLocation.classList.add("weather-location");
  weatherLocation.textContent = `${weatherData.address.toUpperCase()}`;

  mainContent.append(
    weatherLocation,
    createWeatherSection(currentConditions, days, currentUnit),
    createWeatherStatsTable(currentConditions, days, currentUnit),
    createHourForecastSection(hours, currentUnit),
    createDayForecastSection(days, currentUnit),
  );

  return mainContent;
}
