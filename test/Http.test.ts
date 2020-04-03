import { AxiosInstance } from "axios"
import { Http } from "../src/Http"

describe("send", () => {
  it("sends email", async () => {
    const url = "my-url"
    const exp = "my-name"
    const mock = { get: jest.fn() }
    const srv = new Http((mock as unknown) as AxiosInstance)
    mock.get.mockReturnValue({ data: exp })

    const act = await srv.get(url)

    expect(act).toEqual(exp)
    expect(mock.get).toHaveBeenCalledWith(url)
  })
})
