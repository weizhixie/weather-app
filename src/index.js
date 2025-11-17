import "./styles.css";
import { fetchWeatherData } from "./weather-data.js";
import { AppUI } from "./app-ui.js";

const weatherData = await fetchWeatherData();
const ui = new AppUI();
ui.handleSearchInput(fetchWeatherData);
ui.renderWeatherDetails(weatherData);
