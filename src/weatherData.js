import { showLoader, hideLoader } from "./components/loader.js";

export async function fetchWeatherData(location = "london", units = "metric") {
  const API_KEY = "YQ54MUWZFCVRUGYE9869NNRCW";
  const elements =
    "datetime,tempmax,tempmin,temp,feelslike,humidity,windspeed,winddir,pressure,visibility,cloudcover,uvindex,conditions,icon,sunrise,sunset";

  try {
    showLoader();

    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${units}&key=${API_KEY}&elements=${elements}`,
    );
    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const responseData = await response.json();

    return formatWeatherData(responseData);
  } catch (error) {
    console.error(`Failed to fetch weather rawData: ${error}`);
    return null;
  } finally {
    hideLoader();
  }
}

function formatWeatherData(rawData) {
  if (!rawData) return null;

  const currentConditions = {
    temp: rawData.currentConditions.temp,
    feelslike: rawData.currentConditions.feelslike,
    humidity: rawData.currentConditions.humidity,
    windspeed: rawData.currentConditions.windspeed,
    winddir: rawData.currentConditions.winddir,
    pressure: rawData.currentConditions.pressure,
    visibility: rawData.currentConditions.visibility,
    cloudcover: rawData.currentConditions.cloudcover,
    uvindex: rawData.currentConditions.uvindex,
    conditions: rawData.currentConditions.conditions,
    icon: rawData.currentConditions.icon,
    sunrise: rawData.currentConditions.sunrise,
    sunset: rawData.currentConditions.sunset,
  };

  // 15 days forecast
  const dailyForecast = rawData.days.map((day) => ({
    datetime: day.datetime,
    tempmax: day.tempmax,
    tempmin: day.tempmin,
    visibility: day.visibility,
    conditions: day.conditions,
    icon: day.icon,
  }));

  // 24hours forecast of the first day of 15 days forecast
  const hourlyForecast = rawData.days[0].hours.map((hour) => ({
    datetime: hour.datetime,
    temp: hour.temp,
    icon: hour.icon,
  }));

  return {
    currentConditions,
    days: dailyForecast,
    hours: hourlyForecast,
    address: rawData.resolvedAddress,
  };
}
