async function fetchWeatherData() {
  let location = "london";
  let units = "metric";

  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${units}&key=YQ54MUWZFCVRUGYE9869NNRCW&elements=datetime,tempmax,tempmin,temp,feelslike,precipprob,preciptype,humidity,windspeed,winddir,pressure,visibility,cloudcover,uvindex,conditions,icon,sunrise,sunset,description`,
    );
    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(`Failed to fetch weather rawData: ${error}`);
    return null;
  }
}

export async function formatWeatherData() {
  const rawData = await fetchWeatherData();
  if (!rawData) return null;

  const currentConditions = {
    datetime: rawData.currentConditions.datetime,
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
    temp: day.temp,
    precipprob: day.precipprob,
    visibility: day.visibility,
    conditions: day.conditions,
    description: day.description,
    icon: day.icon,
  }));

  // 24hours forecast of the first day of 15 days forecast
  const hourlyForecast = rawData.days[0].hours.map((hour) => ({
    datetime: hour.datetime,
    temp: hour.temp,
    precipprob: hour.precipprob,
    preciptype: hour.preciptype,
    conditions: hour.conditions,
    icon: hour.icon,
  }));

  return {
    currentConditions,
    days: dailyForecast,
    hours: hourlyForecast,
    address: rawData.resolvedAddress,
    timezone: rawData.timezone,
    tzoffset: rawData.tzoffset,
    description: rawData.description,
  };
}
