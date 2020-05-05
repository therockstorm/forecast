import "source-map-support/register"
import { Deps, GetWeatherRes, SendMessageReq, Messaging } from "./deps"

export const run = async (deps: Deps): Promise<void> => {
  const msg = getMsg(
    await deps.weatherService.get(deps.weather),
    deps.messaging
  )
  const res = await Promise.all(deps.messaging.senders.map((s) => s.send(msg)))
  res.forEach((res) => deps.log.info(res.id))
}

const getMsg = (params: GetWeatherRes, deps: Messaging): SendMessageReq => ({
  body:
    `Good day! ` +
    `It's currently ${params.temp}° with ${params.humidity}% humidity and ${params.wind} mph winds. ` +
    `The sun rises at ${params.sunrise} and sets at ${params.sunset}.` +
    `\n\n${params.forecast}`,
  email: deps.email,
  subject: "Daily Forecast",
  phoneFrom: deps.phoneFrom,
  phoneTo: deps.phoneTo,
})
