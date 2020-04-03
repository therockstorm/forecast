/* istanbul ignore file */
import { envVar } from "@therockstorm/utils"
import SES from "aws-sdk/clients/ses"
import axios from "axios"
import "source-map-support/register"
import { Twilio } from "twilio"
import { EmailSender } from "./EmailSender"
import { Http } from "./Http"
import { OpenWeatherMap } from "./OpenWeatherMap"
import { SmsSender } from "./SmsSender"

export const init = (): Deps => ({
  messaging: {
    email: envVar("FORECAST_EMAIL"),
    phoneFrom: envVar("FORECAST_PHONE_NUMBER_FROM"),
    phoneTo: envVar("FORECAST_PHONE_NUMBER_TO"),
    senders: [
      new EmailSender(new SES()),
      new SmsSender(
        new Twilio(envVar("TWILIO_ACCOUNT_SID"), envVar("TWILIO_AUTH_TOKEN"))
      )
    ]
  },
  weatherService: new OpenWeatherMap(new Http(axios.create())),
  weather: {
    apiKey: envVar("OPEN_WEATHER_MAP_API_KEY"),
    lat: envVar("FORECAST_LAT"),
    lon: envVar("FORECAST_LON"),
    timeZone: envVar("FORECAST_TIMEZONE"),
    units: "imperial"
  }
})

// Service interfaces owned by business logic, implemented by plugins
export interface MessageSender {
  send: (msg: Message) => Promise<string>
}

export interface WeatherService {
  get: (req: GetWeatherReq) => Promise<GetWeatherRes>
}

export interface Fetcher {
  get: <T>(url: string) => Promise<T>
}

// Domain objects
export interface Message {
  body: string
  email: string
  phoneFrom: string
  phoneTo: string
  subject: string
}

export interface Messaging {
  email: string
  phoneFrom: string
  phoneTo: string
  senders: MessageSender[]
}

export interface GetWeatherReq {
  apiKey: string
  lat: string
  lon: string
  timeZone: string
  units: "imperial" | "metric"
}

export interface GetWeatherRes {
  forecast: string
  humidity: number
  sunrise: string
  sunset: string
  temp: string
  wind: string
}

export interface Deps {
  messaging: Messaging
  weather: GetWeatherReq
  weatherService: WeatherService
}
