import { when } from "jest-when"
import { Fetcher } from "../src/deps"
import { OpenWeatherMap } from "../src/OpenWeatherMap"
import { current, deps, getWeatherReq, meta, weekly } from "./fakes"

describe("get", () => {
  it("gets weather", async () => {
    const mock = { get: jest.fn() }
    const srv = new OpenWeatherMap((mock as unknown) as Fetcher)
    when(mock.get)
      .calledWith(
        `https://api.openweathermap.org/data/2.5/weather?lat=${deps.weather.lat}&lon=${deps.weather.lon}&units=${deps.weather.units}&appid=${deps.weather.apiKey}`
      )
      .mockResolvedValue(current)
    when(mock.get)
      .calledWith(
        `https://api.weather.gov/points/${deps.weather.lat},${deps.weather.lon}`
      )
      .mockResolvedValue(meta)
    when(mock.get)
      .calledWith(meta.properties.forecast)
      .mockResolvedValue(weekly)

    const act = await srv.get(getWeatherReq)

    expect(act).toEqual({
      forecast:
        "my-name: my-detailedForecast\nmy-name: my-detailedForecast\nmy-name: my-detailedForecast\nmy-name: my-detailedForecast\nmy-name: my-detailedForecast\nmy-name: my-detailedForecast",
      humidity: 2,
      sunrise: "5:00 pm",
      sunset: "5:00 pm",
      temp: "1",
      wind: "5"
    })
  })
})
