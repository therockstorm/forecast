import { Fetcher, GetWeatherReq, GetWeatherRes, WeatherService } from "./deps"

export class OpenWeatherMap implements WeatherService {
  private fetcher: Fetcher

  constructor(fetcher: Fetcher) {
    this.fetcher = fetcher
  }

  get = async (req: GetWeatherReq): Promise<GetWeatherRes> => {
    const owmUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${req.lat}&lon=${req.lon}&units=${req.units}&appid=${req.apiKey}`
    const [current, meta] = await Promise.all([
      this.fetcher.get<Current>(owmUrl),
      this.fetcher.get<Meta>(
        `https://api.weather.gov/points/${req.lat},${req.lon}`
      )
    ])
    const weekly = await this.fetcher.get<Weekly>(meta.properties.forecast)
    const forecast = weekly.properties.periods
      .filter(p => !p.name.endsWith(" Night") && !p.name.endsWith("Overnight"))
      .slice(0, 6)
      .map(p => `${p.name}: ${p.detailedForecast}`)
      .join("\n")

    return {
      forecast,
      humidity: current.main.humidity,
      sunrise: this.formatTime(current.sys.sunrise, req.timeZone),
      sunset: this.formatTime(current.sys.sunset, req.timeZone),
      temp: current.main.temp.toFixed(0),
      wind: current.wind.speed.toFixed(0)
    }
  }

  formatTime = (epoch: number, timeZone: string): string => {
    const zero = new Date(0)
    zero.setUTCSeconds(epoch)
    const timeAmPm = zero
      .toLocaleString("en-US", { timeZone })
      .split(", ")[1]
      .split(" ")
    const timeParts = timeAmPm[0].split(":")
    return `${timeParts[0]}:${timeParts[1]} ${timeAmPm[1].toLowerCase()}`
  }
}

export interface Current {
  main: { temp: number; humidity: number }
  sys: { sunrise: number; sunset: number }
  weather: Array<{ icon: string }>
  wind: { speed: number }
}

export interface Meta {
  properties: {
    forecast: string
    forecastHourly: string
  }
}

export interface Weekly {
  properties: {
    periods: Array<{
      name: string
      detailedForecast: string
      icon: string
      startTime: string
      temperature: string
    }>
  }
}
