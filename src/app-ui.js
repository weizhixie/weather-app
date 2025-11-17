export class AppUI {
  constructor() {
    document.body.appendChild(this.createSearchBox());
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

  createSearchBox() {
    const searchContainer = document.createElement("search");
    const form = document.createElement("form");
    form.classList.add("search-form");

    const label = document.createElement("label");
    label.htmlFor = "search-location";
    label.textContent =
      "Welcome to Sky Buddy! Enter a location to view the weather information";

    const input = document.createElement("input");
    input.type = "search";
    input.id = "search-location";
    input.name = "search-location";
    input.placeholder = "Search Location";

    const button = document.createElement("button");
    button.textContent = "Search";

    form.append(label, input, button);
    searchContainer.appendChild(form);

    return searchContainer;
  }

  renderWeatherDetails(weatherData) {
    const { currentConditions, days } = weatherData;

    document.body.appendChild(
      this.createWeatherStatsTable(currentConditions, days),
    );
  }

  createWeatherStatsTable(currentConditions, days) {
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");
    const visibility = currentConditions.visibility ?? days[0].visibility;

    /**
     * convert wind degrees(0–360) to compass direction
     */
    const getCompassDirection = (deg) => {
      // ensure value is between 0–360
      const normalized = ((deg % 360) + 360) % 360;
      const direction = [
        "North",
        "North East",
        "East",
        "South East",
        "South",
        "South West",
        "West",
        "North West",
      ];
      return direction[Math.floor(normalized / 45)];
    };

    const row1Stats = [
      `Humidity: ${currentConditions.humidity}%`,
      `Feels like: ${currentConditions.feelslike}\u2103`,
      `Wind speed: ${currentConditions.windspeed} km/h`,
      `Wind direction: ${getCompassDirection(currentConditions.winddir)}`,
    ];
    const row2Stats = [
      `UV index: ${currentConditions.uvindex}`,
      `Pressure: ${currentConditions.pressure} hPa`,
      `Cloud cover ${currentConditions.cloudcover}%`,
      `Visibility: ${visibility} km`,
    ];
    const createRow = (rowStats) => {
      const row = document.createElement("tr");
      rowStats.forEach((stat) => {
        const cell = document.createElement("td");
        cell.textContent = stat;
        row.appendChild(cell);
      });
      return row;
    };

    tbody.append(createRow(row1Stats), createRow(row2Stats));
    table.appendChild(tbody);
    return table;
  }
}
