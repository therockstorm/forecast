import { Message, MessageSender } from "./deps"
import { Twilio } from "twilio"

export class SmsSender implements MessageSender {
  private twilio: Twilio

  constructor(twilio: Twilio) {
    this.twilio = twilio
  }

  send = async (msg: Message): Promise<string> =>
    (
      await this.twilio.messages.create({
        body: msg.body,
        from: msg.phoneFrom,
        to: msg.phoneTo
      })
    ).sid
}
