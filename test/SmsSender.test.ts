import { Twilio } from "twilio"
import { SmsSender } from "../src/SmsSender"
import { msg } from "./fakes"

describe("send", () => {
  it("sends sms", async () => {
    const exp = "my-sid"
    const mock = { messages: { create: jest.fn() } }
    const srv = new SmsSender((mock as unknown) as Twilio)
    mock.messages.create.mockReturnValue({ sid: exp })

    const act = await srv.send(msg)

    expect(act).toEqual(exp)
    expect(mock.messages.create).toHaveBeenCalledWith({
      body: msg.body,
      from: msg.phoneFrom,
      to: msg.phoneTo
    })
  })
})
