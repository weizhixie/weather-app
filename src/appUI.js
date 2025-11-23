import { createSearchBox } from "./components/searchBox.js";
import { createWeatherSection } from "./components/weatherSection.js";
import { createWeatherStatsTable } from "./components/weatherStatsTable.js";
import { createHourForecastSection } from "./components/hourForecastSection.js";
import { createDayForecastSection } from "./components/dayForecastSection.js";

export class AppUI {
  constructor() {
    document.body.appendChild(createSearchBox());
  }

  handleSearchInput(fetchWeatherData) {
    const form = document.querySelector(".search-form");
    const searchBox = document.querySelector("#search-location");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (searchBox.value.trim()) {
        const weatherData = await fetchWeatherData(searchBox.value);
        console.log(weatherData);
      }
    });
  }

  renderWeatherDetails(weatherData) {
    const { currentConditions, days, hours } = weatherData;

    const weatherLocation = document.createElement("h1");
    weatherLocation.classList.add("weather-location");
    weatherLocation.textContent = `${weatherData.address.toUpperCase()}`;

    document.body.append(
      weatherLocation,
      createWeatherSection(currentConditions, days),
      createWeatherStatsTable(currentConditions, days),
      createHourForecastSection(hours),
      createDayForecastSection(days),
    );
  }
}
