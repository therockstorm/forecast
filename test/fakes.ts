import { Logger } from "pino"
import {
  Deps,
  GetWeatherReq,
  GetWeatherRes,
  MessageSender,
  WeatherService,
} from "../src/deps"
import { Current, Meta, Weekly } from "../src/OpenWeatherMap"

export const msg = {
  body: "my-message",
  email: "my-email",
  phoneFrom: "my-phoneFrom",
  phoneTo: "my-phoneTo",
  subject: "my-subject",
}

export const mocks = {
  log: {
    error: jest.fn(),
    info: jest.fn(),
    child: jest.fn(),
  },
  senders: [{ send: jest.fn() }],
  weatherService: { get: jest.fn() },
}

export const deps: Deps = {
  log: (mocks.log as unknown) as Logger,
  messaging: {
    email: "my-email",
    phoneFrom: "my-phoneFrom",
    phoneTo: "my-phoneTo",
    senders: (mocks.senders as unknown) as MessageSender[],
  },
  weather: {
    apiKey: "my-apiKey",
    lat: "my-lat",
    lon: "my-lon",
    timeZone: "America/Denver",
    units: "metric",
  },
  weatherService: (mocks.weatherService as unknown) as WeatherService,
}

export const getWeatherReq: GetWeatherReq = {
  apiKey: "my-apiKey",
  lat: "my-lat",
  lon: "my-lon",
  timeZone: "America/Denver",
  units: "metric",
}

export const getWeatherRes: GetWeatherRes = {
  forecast: "my-forecast",
  humidity: 1,
  sunrise: "my-sunrise",
  sunset: "my-sunset",
  temp: "my-temp",
  wind: "my-wind",
}

export const current: Current = {
  main: { temp: 1, humidity: 2 },
  sys: { sunrise: new Date(1).getTime(), sunset: new Date(2).getTime() },
  weather: [{ icon: "my-icon" }],
  wind: { speed: 5 },
}

export const meta: Meta = {
  properties: {
    forecast: "my-forecast",
    forecastHourly: "my-forecastHourly",
  },
}

const period = {
  name: "my-name",
  detailedForecast: "my-detailedForecast",
  icon: "my-icon",
  startTime: "my-startTime",
  temperature: "my-temperature",
}

export const weekly: Weekly = {
  properties: {
    periods: [period, period, period, period, period, period, period],
  },
}
