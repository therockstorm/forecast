import { log } from "@therockstorm/utils"
import CodeDeploy, {
  PutLifecycleEventHookExecutionStatusOutput
} from "aws-sdk/clients/codedeploy"
import "source-map-support/register"

const cd = new CodeDeploy()

interface Event {
  DeploymentId: string
  LifecycleEventHookExecutionId: string
}

export const pre = async (evt: Event): Promise<Res> => {
  log(JSON.stringify(evt))
  log("TODO: Health check before shifting traffic...")

  await putStatus(evt.DeploymentId, evt.LifecycleEventHookExecutionId)
  return { statusCode: 200, body: JSON.stringify(evt) }
}

export const post = async (evt: Event): Promise<Res> => {
  log(JSON.stringify(evt))
  log("TODO: Health check after shifting traffic...")

  await putStatus(evt.DeploymentId, evt.LifecycleEventHookExecutionId)
  return { statusCode: 200, body: JSON.stringify(evt) }
}

const putStatus = async (
  deploymentId: string,
  executionId: string
): Promise<PutLifecycleEventHookExecutionStatusOutput> =>
  cd
    .putLifecycleEventHookExecutionStatus({
      deploymentId,
      lifecycleEventHookExecutionId: executionId,
      status: "Succeeded"
    })
    .promise()
