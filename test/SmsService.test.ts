import { Twilio } from "twilio"
import { SmsService } from "../src/SmsService"
import { msg } from "./fakes"

describe("send", () => {
  it("sends sms", async () => {
    const exp = "my-sid"
    const mock = { messages: { create: jest.fn() } }
    mock.messages.create.mockReturnValue({ sid: exp })
    const srv = new SmsService((mock as unknown) as Twilio)

    const act = await srv.send(msg)

    expect(act).toEqual(exp)
    expect(mock.messages.create).toHaveBeenCalledWith({
      body: msg.body,
      to: msg.phone,
      from: msg.phone
    })
  })
})
