import { log } from "@therockstorm/utils"
import "source-map-support/register"
import {
  Current,
  Deps,
  Message,
  MessagingDeps,
  Meta,
  Params,
  Weekly
} from "../types"

export const run = async (deps: Deps): Promise<void> => {
  const msg = getMsg(await getWeather(deps), deps.messaging)
  const res = await Promise.all(deps.messaging.services.map(s => s.send(msg)))
  res.forEach(log)
}

const getWeather = async (deps: Deps): Promise<Params> => {
  const owmUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${deps.weather.lat}&lon=${deps.weather.lon}&units=${deps.weather.units}&appid=${deps.weather.apiKey}`
  const [current, meta] = await Promise.all([
    deps.http.get<Current>(owmUrl),
    deps.http.get<Meta>(
      `https://api.weather.gov/points/${deps.weather.lat},${deps.weather.lon}`
    )
  ])
  const weekly = await deps.http.get<Weekly>(meta.properties.forecast)
  const forecast = weekly.properties.periods
    .filter(p => !p.name.endsWith(" Night") && !p.name.endsWith("Overnight"))
    .slice(0, 6)
    .map(p => `${p.name}: ${p.detailedForecast}`)
    .join("\n")

  return {
    forecast,
    humidity: current.main.humidity,
    sunrise: formatTime(current.sys.sunrise, deps.weather.timeZone),
    sunset: formatTime(current.sys.sunset, deps.weather.timeZone),
    temp: current.main.temp.toFixed(0),
    wind: current.wind.speed.toFixed(0)
  }
}

const getMsg = (params: Params, deps: MessagingDeps): Message => ({
  body:
    `Good day! ` +
    `It's currently ${params.temp}° with ${params.humidity}% humidity and ${params.wind} mph winds. ` +
    `The sun rises at ${params.sunrise} and sets at ${params.sunset}.` +
    `\n\n${params.forecast}`,
  email: deps.email,
  subject: "Daily Forecast",
  phoneFrom: deps.phoneFrom,
  phoneTo: deps.phoneTo
})

const formatTime = (epoch: number, timeZone: string): string => {
  const zero = new Date(0)
  zero.setUTCSeconds(epoch)
  const timeAmPm = zero
    .toLocaleString("en-US", { timeZone })
    .split(", ")[1]
    .split(" ")
  const timeParts = timeAmPm[0].split(":")
  return `${timeParts[0]}:${timeParts[1]} ${timeAmPm[1].toLowerCase()}`
}
