import { Message, MessagingService } from "../types"
import { Twilio } from "twilio"

export class SmsService implements MessagingService {
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
