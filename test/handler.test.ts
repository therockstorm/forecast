import { when, resetAllWhenMocks } from "jest-when"
import * as d from "../src/deps"
jest.mock("../src/deps")
import { getWeatherRes, deps, mocks } from "./fakes"
;(d.init as jest.Mock).mockReturnValue(deps)

import { handle } from "../src/handler"

const ctx = { awsRequestId: "" }

describe("handle", () => {
  afterEach(() => {
    resetAllWhenMocks()
    mocks.senders.forEach((s) => s.send.mockReset())
    mocks.weatherService.get.mockReset()
  })

  it("returns 200 on success", async () => {
    when(mocks.weatherService.get)
      .calledWith(deps.weather)
      .mockResolvedValue(getWeatherRes)
    mocks.senders.forEach((s) => s.send.mockResolvedValue({ id: "" }))
    mocks.log.child.mockReturnValue(mocks.log)

    const res = await handle({}, ctx)

    expect(res).toEqual({ statusCode: 200 })
    expect(mocks.senders[0].send).toHaveBeenCalledWith({
      body:
        "Good day! It's currently my-temp° with 1% humidity and my-wind mph winds. The sun rises at my-sunrise and sets at my-sunset.\n\nmy-forecast",
      email: "my-email",
      phoneFrom: "my-phoneFrom",
      phoneTo: "my-phoneTo",
      subject: "Daily Forecast",
    })
  })

  it("returns 500 on error", async () => {
    const res = await handle({}, ctx)

    expect(res).toEqual({ statusCode: 500 })
  })
})
