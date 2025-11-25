import { createSearchBox } from "./components/searchBox.js";
import { createMainContent } from "./components/mainContent.js";

export class AppUI {
  constructor() {
    this.currentLocation = null;
    this.currentUnit = "metric";
    document.querySelector("#header").appendChild(createSearchBox());
  }

  handleSearchInput(fetchWeatherData) {
    const form = document.querySelector(".search-form");
    const searchBox = document.querySelector("#search-location");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (searchBox.value.trim()) {
        const weatherData = await fetchWeatherData(
          searchBox.value,
          this.currentUnit,
        );

        if (!weatherData) {
          alert("Sorry location not found");
          return;
        }

        this.currentLocation = weatherData.address;
        this.renderWeatherDetails(weatherData);
      }
    });
  }

  renderWeatherDetails(weatherData) {
    const existingMain = document.querySelector(".main-content");
    if (existingMain) existingMain.remove();

    if (weatherData) {
      this.currentLocation = weatherData.address;
      document.body.append(createMainContent(weatherData, this.currentUnit));
    }
  }

  toggleUnit(fetchWeatherData) {
    document.body.addEventListener("click", async (e) => {
      if (e.target.classList.contains("metric-unit-btn")) {
        this.currentUnit = "metric";
        const weatherData = await fetchWeatherData(
          this.currentLocation,
          this.currentUnit,
        );
        this.renderWeatherDetails(weatherData);
      }

      if (e.target.classList.contains("us-unit-btn")) {
        this.currentUnit = "us";
        const weatherData = await fetchWeatherData(
          this.currentLocation,
          this.currentUnit,
        );
        this.renderWeatherDetails(weatherData);
      }
    });
  }
}
