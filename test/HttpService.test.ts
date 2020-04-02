import { AxiosInstance } from "axios"
import { HttpService } from "../src/HttpService"

describe("send", () => {
  it("sends email", async () => {
    const exp = "my-name"
    const mock = { get: jest.fn() }
    mock.get.mockReturnValue({ data: exp })
    const srv = new HttpService((mock as unknown) as AxiosInstance)
    const url = "my-url"

    const act = await srv.get(url)

    expect(act).toEqual(exp)
    expect(mock.get).toHaveBeenCalledWith(url)
  })
})
