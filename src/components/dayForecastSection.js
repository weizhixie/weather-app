export function createDayForecastSection(days) {
  const dayForecastSection = document.createElement("section");

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
    tempEl.textContent = `${tempmax}\u2103-${tempmin}\u2103`;

    wrapper.append(timeEl, weatherIcon, tempEl);
    dayForecastSection.append(wrapper);
  });

  return dayForecastSection;
}
