import { log } from "@therockstorm/utils"
import CodeDeploy from "aws-sdk/clients/codedeploy"
import "source-map-support/register"

const cd = new CodeDeploy()

export const pre = async (evt: any): Promise<IRes> => {
  log(JSON.stringify(evt))

  log("TODO: Health check before shifting traffic...")

  await putStatus(evt.DeploymentId, evt.LifecycleEventHookExecutionId)
  return { statusCode: 200, body: JSON.stringify(evt) }
}

export const post = async (evt: any): Promise<IRes> => {
  log(JSON.stringify(evt))

  log("TODO: Health check after shifting traffic...")

  await putStatus(evt.DeploymentId, evt.LifecycleEventHookExecutionId)
  return { statusCode: 200, body: JSON.stringify(evt) }
}

const putStatus = async (deploymentId: string, executionId: string) =>
  cd
    .putLifecycleEventHookExecutionStatus({
      deploymentId,
      lifecycleEventHookExecutionId: executionId,
      status: "Succeeded"
    })
    .promise()
