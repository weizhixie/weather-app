const ul = document.createElement("ul");
ul.classList.add("weather-stats-table");

export function createWeatherStatsTable(currentConditions, days) {
  const visibility = currentConditions.visibility ?? days[0].visibility;

  const stats = [
    {
      label: "Humidity",
      value: `${currentConditions.humidity}%`,
    },
    {
      label: "Feels Like",
      value: `${currentConditions.feelslike}\u2103`,
    },
    {
      label: "Wind Speed",
      value: `${currentConditions.windspeed} km/h`,
    },
    {
      label: "Wind Direction",
      value: `${getCompassDirection(currentConditions.winddir)}`,
    },
    {
      label: "UV Index",
      value: `${currentConditions.uvindex}`,
    },
    {
      label: "Pressure",
      value: `${currentConditions.pressure} hPa`,
    },
    {
      label: "Cloud Cover",
      value: `${currentConditions.cloudcover}%`,
    },
    {
      label: "Visibility",
      value: `${visibility} km`,
    },
  ];

  createRow(stats);
  return ul;
}

function createRow(stats) {
  stats.forEach((stat) => {
    const li = document.createElement("li");
    li.classList.add("weather-stats-list");

    const label = document.createElement("p");
    label.textContent = stat.label;
    const value = document.createElement("p");
    value.textContent = stat.value;

    li.append(label, value);
    ul.append(li);
  });
}

/**
 * convert wind degrees(0–360) to compass direction
 */
function getCompassDirection(deg) {
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
}
