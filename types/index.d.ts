export interface Current {
  main: { temp: number; humidity: number }
  sys: { sunrise: number; sunset: number }
  weather: Array<{ icon: string }>
  wind: { speed: number }
}

export interface MessagingDeps {
  email: string
  phone: string
  services: MessagingService[]
}

export interface WeatherDeps {
  apiKey: string
  lat: string
  lon: string
  timeZone: string
  units: "imperial" | "metric"
}

export interface Deps {
  http: RemoteService
  messaging: MessagingDeps
  weather: WeatherDeps
}

export interface MessagingService {
  send: (msg: Message) => Promise<string>
}

export interface RemoteService {
  get: <T>(url: string) => Promise<T>
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

export interface Params {
  forecast: string
  humidity: number
  sunrise: string
  sunset: string
  temp: string
  wind: string
}

export interface Message {
  body: string
  email: string
  phone: string
  subject: string
}

export interface Res {
  statusCode: number
}
