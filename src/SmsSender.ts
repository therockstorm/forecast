import { SendMessageReq, SendMessageRes, MessageSender } from "./deps"
import { Twilio } from "twilio"

export class SmsSender implements MessageSender {
  private twilio: Twilio

  constructor(twilio: Twilio) {
    this.twilio = twilio
  }

  send = async (req: SendMessageReq): Promise<SendMessageRes> => ({
    id: (
      await this.twilio.messages.create({
        body: req.body,
        from: req.phoneFrom,
        to: req.phoneTo,
      })
    ).sid,
  })
}
