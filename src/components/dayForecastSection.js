import { unitLabels } from "../utils/unitLabels.js";

export function createDayForecastSection(days, currentUnit) {
  const unitLabel = unitLabels()[currentUnit];

  const dayForecastSection = document.createElement("section");
  dayForecastSection.classList.add("day-forecast-section");

  days.forEach(({ datetime, icon, tempmax, tempmin }) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("day-forecast-wrapper");

    const localDate = new Date(datetime).toLocaleDateString();
    const timeEl = document.createElement("p");
    timeEl.textContent = localDate;

    const weatherIcon = document.createElement("img");
    weatherIcon.classList.add("day-forecast-icon");
    import(`/src/assets/weather-icons/${icon}.png`)
      .then((i) => {
        weatherIcon.src = i.default;
      })
      .catch((error) => console.error(`Failed to load icon ${error}`));

    const tempEl = document.createElement("p");
    tempEl.textContent = `${tempmax}${unitLabel.temp}-${tempmin}${unitLabel.temp}`;

    wrapper.append(timeEl, weatherIcon, tempEl);
    dayForecastSection.append(wrapper);
  });

  return dayForecastSection;
}
