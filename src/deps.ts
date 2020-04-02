/* istanbul ignore file */
import { envVar } from "@therockstorm/utils"
import SES from "aws-sdk/clients/ses"
import axios from "axios"
import "source-map-support/register"
import { Twilio } from "twilio"
import { EmailService } from "./EmailService"
import { HttpService } from "./HttpService"
import { SmsService } from "./SmsService"
import { Deps } from "../types"

export const init = (): Deps => ({
  http: new HttpService(axios.create()),
  messaging: {
    email: envVar("FORECAST_EMAIL"),
    phone: envVar("FORECAST_PHONE_NUMBER"),
    services: [
      new EmailService(new SES()),
      new SmsService(
        new Twilio(envVar("TWILIO_ACCOUNT_SID"), envVar("TWILIO_AUTH_TOKEN"))
      )
    ]
  },
  weather: {
    apiKey: envVar("OPEN_WEATHER_MAP_API_KEY"),
    lat: envVar("FORECAST_LAT"),
    lon: envVar("FORECAST_LON"),
    timeZone: envVar("FORECAST_TIMEZONE"),
    units: "imperial"
  }
})
