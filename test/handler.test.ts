import { handle } from "../src/handler"

jest.mock("@therockstorm/utils")

test("handler", async () => {
  const evt = { httpMethod: "GET" }

  const res = await handle(evt)
  return expect(res).toEqual({ statusCode: 200, body: JSON.stringify(evt) })
})
