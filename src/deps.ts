/* istanbul ignore file */
import { envVar } from "@therockstorm/utils"
import pino, { Logger } from "pino"
import SES from "aws-sdk/clients/ses"
import axios from "axios"
import "source-map-support/register"
import { Twilio } from "twilio"
import { EmailSender } from "./EmailSender"
import { Http } from "./Http"
import { OpenWeatherMap } from "./OpenWeatherMap"
import { SmsSender } from "./SmsSender"

export const init = (): Deps => {
  const phoneFrom = process.env.FORECAST_PHONE_NUMBER_FROM
  const phoneTo = process.env.FORECAST_PHONE_NUMBER_TO
  const twilioSid = process.env.TWILIO_ACCOUNT_SID
  const twilioTok = process.env.TWILIO_AUTH_TOKEN
  const senders: MessageSender[] = [new EmailSender(new SES())]
  if (phoneFrom && phoneTo && twilioSid && twilioTok) {
    senders.push(new SmsSender(new Twilio(twilioSid, twilioTok)))
  }

  return {
    log: pino({
      base: {
        memorySize: process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE,
        region: process.env.AWS_REGION,
        runtime: process.env.AWS_EXECUTION_ENV,
        version: process.env.AWS_LAMBDA_FUNCTION_VERSION,
      },
      name: process.env.AWS_LAMBDA_FUNCTION_NAME,
      level: process.env.LOG_LEVEL || "info",
      useLevelLabels: true,
    }),
    messaging: {
      email: envVar("FORECAST_EMAIL"),
      phoneFrom: phoneFrom || "",
      phoneTo: phoneTo || "",
      senders,
    },
    weatherService: new OpenWeatherMap(new Http(axios.create())),
    weather: {
      apiKey: envVar("OPEN_WEATHER_MAP_API_KEY"),
      lat: envVar("FORECAST_LAT"),
      lon: envVar("FORECAST_LON"),
      timeZone: envVar("FORECAST_TIMEZONE"),
      units: "imperial",
    },
  }
}

// Service interfaces owned by business logic, implemented by plugins
export interface MessageSender {
  send: (msg: SendMessageReq) => Promise<SendMessageRes>
}

export interface WeatherService {
  get: (req: GetWeatherReq) => Promise<GetWeatherRes>
}

export interface Fetcher {
  get: <T>(url: string) => Promise<T>
}

// Domain objects
export interface SendMessageReq {
  body: string
  email: string
  phoneFrom: string
  phoneTo: string
  subject: string
}

export interface SendMessageRes {
  id: string
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

export interface Messaging {
  email: string
  phoneFrom: string
  phoneTo: string
  senders: MessageSender[]
}

export interface Deps {
  log: Logger
  messaging: Messaging
  weather: GetWeatherReq
  weatherService: WeatherService
}
