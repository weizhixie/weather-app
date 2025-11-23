export function createHourForecastSection(hours) {
  const hourForecastSection = document.createElement("section");
  hourForecastSection.classList.add("hour-forecast-section");

  hours.forEach(({ datetime, icon, temp }) => {
    const wrapper = document.createElement("div");

    const timeEl = document.createElement("p");
    timeEl.classList.add("hour-forecast-el");
    const [hour, min] = datetime.split(":");
    timeEl.textContent = `${hour}:${min}`;

    const weatherIcon = document.createElement("img");
    weatherIcon.classList.add("hour-forecast-el");
    import(`/src/assets/weather-icons/${icon}.png`)
      .then((i) => {
        weatherIcon.src = i.default;
      })
      .catch((error) => console.error(`Failed to load icon ${error}`));

    const tempEl = document.createElement("p");
    tempEl.classList.add("hour-forecast-el");
    tempEl.textContent = `${temp}\u2103`;

    wrapper.append(timeEl, weatherIcon, tempEl);
    hourForecastSection.append(wrapper);
  });

  return hourForecastSection;
}
