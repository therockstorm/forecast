import SES from "aws-sdk/clients/ses"
import { EmailSender } from "../src/EmailSender"
import { msg } from "./fakes"

describe("send", () => {
  it("sends email", async () => {
    const exp = "my-messageId"
    const mock = { sendEmail: jest.fn() }
    mock.sendEmail.mockReturnValue({ promise: () => ({ MessageId: exp }) })
    const srv = new EmailSender((mock as unknown) as SES)

    const act = await srv.send(msg)

    expect(act).toEqual(exp)
    expect(mock.sendEmail).toHaveBeenCalledWith({
      Destination: { ToAddresses: [msg.email] },
      Message: {
        Body: { Text: { Data: msg.body } },
        Subject: { Charset: "UTF-8", Data: msg.subject }
      },
      Source: msg.email
    })
  })
})
