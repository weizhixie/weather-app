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

    const weatherLocation = document.createElement("h1");
    weatherLocation.classList.add("weather-location");
    weatherLocation.textContent = `${weatherData.address.toUpperCase()}`;

    document.body.append(
      weatherLocation,
      this.createWeatherSection(currentConditions, days),
      this.createWeatherStatsTable(currentConditions, days),
    );
  }

  createWeatherSection(currentConditions, days) {
    const weatherSection = document.createElement("section");
    weatherSection.classList.add("weather-section");

    const iconTempWrapper = document.createElement("div");
    iconTempWrapper.classList.add("icon-temp-wrapper");
    const weatherIcon = document.createElement("img");
    weatherIcon.classList.add("weather-icon");
    import(`./assets/weather-icons/${currentConditions.icon}.png`)
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

    tempWrapper.append(currentTemp, highLowTemp);
    iconTempWrapper.append(weatherIcon, tempWrapper);
    timeCondWrapper.append(currentTime, currentDatetime, condition);
    weatherSection.append(iconTempWrapper, timeCondWrapper);

    return weatherSection;
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
