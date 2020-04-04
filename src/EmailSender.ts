import { SendMessageReq, SendMessageRes, MessageSender } from "./deps"
import SES from "aws-sdk/clients/ses"

export class EmailSender implements MessageSender {
  private ses: SES

  constructor(ses: SES) {
    this.ses = ses
  }

  send = async (req: SendMessageReq): Promise<SendMessageRes> => ({
    id: (
      await this.ses
        .sendEmail({
          Destination: { ToAddresses: [req.email] },
          Message: {
            Body: { Text: { Data: req.body } },
            Subject: { Charset: "UTF-8", Data: req.subject }
          },
          Source: req.email
        })
        .promise()
    ).MessageId
  })
}
