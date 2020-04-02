import { Message, MessagingService } from "../types"
import SES from "aws-sdk/clients/ses"

export class EmailService implements MessagingService {
  private ses: SES

  constructor(ses: SES) {
    this.ses = ses
  }

  send = async (msg: Message): Promise<string> =>
    (
      await this.ses
        .sendEmail({
          Destination: { ToAddresses: [msg.email] },
          Message: {
            Body: { Text: { Data: msg.body } },
            Subject: { Charset: "UTF-8", Data: msg.subject }
          },
          Source: msg.email
        })
        .promise()
    ).MessageId
}
