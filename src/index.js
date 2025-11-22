import "./styles.css";
import { fetchWeatherData } from "./weatherData.js";
import { AppUI } from "./appUI.js";

const weatherData = await fetchWeatherData();
const ui = new AppUI();
ui.handleSearchInput(fetchWeatherData);
ui.renderWeatherDetails(weatherData);
