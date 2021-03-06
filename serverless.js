const { serverless } = require("skripts/config")

module.exports = {
  ...serverless,
  custom: {
    ...serverless.custom,
    alerts: { dashboard: false },
    deploymentSettings: { stages: ["dev", "prod"] },
  },
  app: "forecast",
  functions: {
    func: {
      alarms: ["functionErrors"],
      deploymentSettings: {
        type: "AllAtOnce", // Change for gradual deploy, see https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/automating-updates-to-serverless-apps.html
        alias: "Live",
        alarms: ["FuncFunctionErrorsAlarm"],
      },
      events: [{ schedule: "cron(0 11 * * ? *)" }],
      handler: "src/handler.handle",
      timeout: 20,
    },
  },
  org: "therockstorm",
  plugins: [
    ...serverless.plugins,
    "serverless-plugin-aws-alerts",
    "serverless-plugin-canary-deployments",
  ],
  provider: {
    ...serverless.provider,
    environment: {
      ...serverless.provider.environment,
      FORECAST_EMAIL: "${env:FORECAST_EMAIL}",
      FORECAST_PHONE_NUMBER_FROM: "${env:FORECAST_PHONE_NUMBER_FROM}",
      FORECAST_PHONE_NUMBER_TO: "${env:FORECAST_PHONE_NUMBER_TO}",
      FORECAST_LAT: "${env:FORECAST_LAT}",
      FORECAST_LON: "${env:FORECAST_LON}",
      FORECAST_TIMEZONE: "${env:FORECAST_TIMEZONE}",
      OPEN_WEATHER_MAP_API_KEY: "${env:OPEN_WEATHER_MAP_API_KEY}",
      TWILIO_ACCOUNT_SID: "${env:TWILIO_ACCOUNT_SID}",
      TWILIO_AUTH_TOKEN: "${env:TWILIO_AUTH_TOKEN}",
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: "ses:SendEmail",
        Resource:
          "arn:aws:ses:${self:provider.region}:#{AWS::AccountId}:identity/${env:FORECAST_EMAIL}",
      },
      {
        Effect: "Allow",
        Action: "codedeploy:PutLifecycleEventHookExecutionStatus",
        Resource:
          "arn:aws:codedeploy:${self:provider.region}:#{AWS::AccountId}:deploymentgroup:${self:service.name}-${self:provider.stage}-*",
      },
    ],
    tracing: { apiGateway: true, lambda: true },
  },
  resources: "${file(./scripts/stack.yml)}",
}
