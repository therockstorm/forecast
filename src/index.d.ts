interface ICurrent {
  main: { temp: number; humidity: number }
  sys: { sunrise: number; sunset: number }
  weather: Array<{ icon: string }>
  wind: { speed: number }
}

interface IMeta {
  properties: {
    forecast: string
    forecastHourly: string
  }
}

interface IWeekly {
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

interface IParams {
  forecast: string
  humidity: number
  sunrise: string
  sunset: string
  temp: string
  wind: string
}

interface IMessage {
  body: string
  subject: string
}

interface IRes {
  statusCode: number
  body: string
}
