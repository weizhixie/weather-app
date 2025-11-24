import { createSearchBox } from "./components/searchBox.js";
import { createMainContent } from "./components/mainContent.js";

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

        if (!weatherData) return;
        this.renderWeatherDetails(weatherData);
      }
    });
  }

  renderWeatherDetails(weatherData) {
    const existingMain = document.querySelector(".main-content");
    if (existingMain) existingMain.remove();

    document.body.append(createMainContent(weatherData));
  }
}
