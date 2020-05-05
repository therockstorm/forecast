import "source-map-support/register"
import { init } from "./deps"
import { run } from "./app"
import Schema from "validate"

const schema = new Schema({})
const deps = init()

export const handle = async (
  evt: {},
  { awsRequestId: requestId }: { awsRequestId: string }
): Promise<Response> => {
  try {
    deps.log = deps.log.child({ requestId })
    const errors = schema.validate(evt, { strip: false })
    if (errors.length) throw new Error("Validation error.")

    await run(deps)
    return { statusCode: 200 }
  } catch (err) {
    deps.log.error(err)
    return { statusCode: 500 }
  }
}

interface Response {
  statusCode: number
}
