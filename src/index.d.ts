interface Current {
  main: { temp: number; humidity: number }
  sys: { sunrise: number; sunset: number }
  weather: Array<{ icon: string }>
  wind: { speed: number }
}

interface Meta {
  properties: {
    forecast: string
    forecastHourly: string
  }
}

interface Weekly {
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

interface Params {
  forecast: string
  humidity: number
  sunrise: string
  sunset: string
  temp: string
  wind: string
}

interface Message {
  body: string
  subject: string
}

interface Res {
  statusCode: number
  body: string
}
