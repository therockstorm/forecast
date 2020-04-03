import { error } from "@therockstorm/utils"
import "source-map-support/register"
import { init } from "./deps"
import { run } from "./app"

const deps = init()

export const handle = async (): Promise<Response> => {
  try {
    await run(deps)
    return { statusCode: 200 }
  } catch (err) {
    error(err)
    return { statusCode: 500 }
  }
}

interface Response {
  statusCode: number
}
