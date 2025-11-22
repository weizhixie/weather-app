export function createWeatherStatsTable(currentConditions, days) {
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  const visibility = currentConditions.visibility ?? days[0].visibility;

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

  tbody.append(createRow(row1Stats), createRow(row2Stats));
  table.appendChild(tbody);
  return table;
}

function createRow(rowStats) {
  const row = document.createElement("tr");
  rowStats.forEach((stat) => {
    const cell = document.createElement("td");
    cell.textContent = stat;
    row.appendChild(cell);
  });
  return row;
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
