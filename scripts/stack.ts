import { BuildSpec, Project, Source } from "@aws-cdk/aws-codebuild"
import { App, Construct, Duration, Stack, StackProps } from "@aws-cdk/core"
import { envVar } from "@therockstorm/utils"
import { name } from "../package.json"

const STAGE = envVar("STAGE")

class MyStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    new Project(this, `${name}-codebuild-${STAGE}`, {
      badge: true,
      buildSpec: BuildSpec.fromObject({
        phases: {
          build: { commands: ["npm test"] },
          install: { commands: ["npm ci"], "runtime-versions": { nodejs: 10 } }
        },
        version: "0.2"
      }),
      environment: {
        environmentVariables: {
          DEPLOYMENT_BUCKET: { value: envVar("DEPLOYMENT_BUCKET") },
          FORECAST_EMAIL: { value: envVar("FORECAST_EMAIL") },
          FORECAST_PHONE_NUMBER: { value: envVar("FORECAST_PHONE_NUMBER") },
          FORECAST_LAT: { value: envVar("FORECAST_LAT") },
          FORECAST_LON: { value: envVar("FORECAST_LON") },
          FORECAST_TIMEZONE: { value: envVar("FORECAST_TIMEZONE") },
          OPEN_WEATHER_MAP_API_KEY: {
            value: envVar("OPEN_WEATHER_MAP_API_KEY")
          },
          SERVERLESS_ACCESS_KEY: { value: envVar("SERVERLESS_ACCESS_KEY") },
          STAGE: { value: STAGE },
          TWILIO_ACCOUNT_SID: { value: envVar("TWILIO_ACCOUNT_SID") },
          TWILIO_AUTH_TOKEN: { value: envVar("TWILIO_AUTH_TOKEN") }
        }
      },
      source: Source.gitHub({ owner: "therockstorm", repo: name }),
      timeout: Duration.minutes(5)
    })
  }
}

const app = new App()
new MyStack(app, "my-stack")
app.synth()
