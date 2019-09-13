import { envVar, error, log } from "@therockstorm/utils"
import SES from "aws-sdk/clients/ses"
import axios from "axios"
import "source-map-support/register"

const apiKey = envVar("OPEN_WEATHER_MAP_API_KEY")
const emailAddress = envVar("FORECAST_EMAIL")
const lat = envVar("FORECAST_LAT")
const lon = envVar("FORECAST_LON")
const ses = new SES()
const timeZone = envVar("FORECAST_TIMEZONE")
const units = "imperial"

export const handle = async (evt: any): Promise<IRes> => {
  log(JSON.stringify(evt))

  try {
    log(await send(getMsg(await getParams())))
  } catch (err) {
    error(err)
  }

  return { statusCode: 201, body: JSON.stringify(evt) }
}

const getParams = async (): Promise<IParams> => {
  const owmUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`
  const [current, meta] = await Promise.all([
    get<ICurrent>(owmUrl),
    get<IMeta>(`https://api.weather.gov/points/${lat},${lon}`)
  ])

  return {
    forecast: (await get<IWeekly>(meta.properties.forecast)).properties.periods
      .filter(p => !p.name.endsWith(" Night"))
      .slice(0, 5)
      .map(p => `${p.name}: ${p.detailedForecast}`)
      .join("\n"),
    humidity: current.main.humidity,
    sunrise: time(current.sys.sunrise),
    sunset: time(current.sys.sunset),
    temp: current.main.temp.toFixed(0),
    wind: current.wind.speed.toFixed(0)
  }
}

const getMsg = (params: IParams): IMessage => ({
  body:
    `Good morning! ` +
    `It's currently ${params.temp}° with ${params.humidity}% humidity and ${params.wind} mph winds. ` +
    `The sun rises at ${params.sunrise} and sets at ${params.sunset}.` +
    `\n\n${params.forecast}`,
  subject: "Daily Forecast"
})

const send = async (msg: IMessage) =>
  ses
    .sendEmail({
      Destination: { ToAddresses: [emailAddress] },
      Message: {
        Body: { Text: { Data: msg.body } },
        Subject: { Charset: "UTF-8", Data: msg.subject }
      },
      Source: emailAddress
    })
    .promise()

async function get<T>(url: string): Promise<T> {
  return (await axios.get<T>(url)).data
}

const time = (epoch: number) => {
  const zero = new Date(0)
  zero.setUTCSeconds(epoch)
  const timeAmPm = zero
    .toLocaleString("en-US", { timeZone })
    .split(", ")[1]
    .split(" ")
  const timeParts = timeAmPm[0].split(":")
  return `${timeParts[0]}:${timeParts[1]} ${timeAmPm[1].toLowerCase()}`
}
