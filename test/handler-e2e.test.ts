import { when, resetAllWhenMocks } from "jest-when"
import * as d from "../src/deps"
jest.mock("../src/deps")
import { current, deps, meta, mocks, weekly } from "./fakes"
;(d.init as jest.Mock).mockReturnValue(deps)

import { handle } from "../src/handler"

describe("handle", () => {
  afterEach(() => {
    resetAllWhenMocks()
    mocks.services.forEach(s => s.send.mockReset())
    mocks.http.get.mockReset()
  })

  it("returns 200 on success", async () => {
    when(mocks.http.get)
      .calledWith(
        `https://api.openweathermap.org/data/2.5/weather?lat=${deps.weather.lat}&lon=${deps.weather.lon}&units=${deps.weather.units}&appid=${deps.weather.apiKey}`
      )
      .mockResolvedValue(current)
    when(mocks.http.get)
      .calledWith(
        `https://api.weather.gov/points/${deps.weather.lat},${deps.weather.lon}`
      )
      .mockResolvedValue(meta)
    when(mocks.http.get)
      .calledWith(meta.properties.forecast)
      .mockResolvedValue(weekly)
    mocks.services.forEach(s => s.send.mockResolvedValue(""))

    const res = await handle()

    expect(res).toEqual({ statusCode: 200 })
    expect(mocks.services[0].send).toHaveBeenCalledWith({
      body:
        "Good day! It's currently 1° with 2% humidity and 5 mph winds. The sun rises at 5:00 pm and sets at 5:00 pm.\n\nmy-name: my-detailedForecast\nmy-name: my-detailedForecast\nmy-name: my-detailedForecast\nmy-name: my-detailedForecast\nmy-name: my-detailedForecast\nmy-name: my-detailedForecast",
      email: "my-email",
      phoneFrom: "my-phoneFrom",
      phoneTo: "my-phoneTo",
      subject: "Daily Forecast"
    })
  })

  it("returns 500 on error", async () => {
    const res = await handle()

    expect(res).toEqual({ statusCode: 500 })
  })
})
