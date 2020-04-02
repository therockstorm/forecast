import { error } from "@therockstorm/utils"
import "source-map-support/register"
import { init } from "./deps"
import { run } from "./app"
import { Res } from "../types"

const deps = init()

export const handle = async (): Promise<Res> => {
  try {
    await run(deps)
    return { statusCode: 200 }
  } catch (err) {
    error(err)
    return { statusCode: 500 }
  }
}
