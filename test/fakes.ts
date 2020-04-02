import {
  Current,
  Deps,
  Meta,
  MessagingService,
  RemoteService,
  Weekly
} from "../types"

export const msg = {
  body: "my-message",
  email: "my-email",
  phone: "my-phone",
  subject: "my-subject"
}

export const mocks = {
  http: { get: jest.fn() },
  services: [{ send: jest.fn() }]
}

export const deps: Deps = {
  http: (mocks.http as unknown) as RemoteService,
  messaging: {
    email: "my-email",
    phone: "my-phone",
    services: (mocks.services as unknown) as MessagingService[]
  },
  weather: {
    apiKey: "my-apiKey",
    lat: "my-lat",
    lon: "my-lon",
    timeZone: "America/Denver",
    units: "metric"
  }
}

export const current: Current = {
  main: { temp: 1, humidity: 2 },
  sys: { sunrise: new Date(1).getTime(), sunset: new Date(2).getTime() },
  weather: [{ icon: "my-icon" }],
  wind: { speed: 5 }
}

export const meta: Meta = {
  properties: {
    forecast: "my-forecast",
    forecastHourly: "my-forecastHourly"
  }
}

const period = {
  name: "my-name",
  detailedForecast: "my-detailedForecast",
  icon: "my-icon",
  startTime: "my-startTime",
  temperature: "my-temperature"
}

export const weekly: Weekly = {
  properties: {
    periods: [period, period, period, period, period, period, period]
  }
}
