const { serverless } = require("skripts/config")

module.exports = {
  ...serverless,
  // app: "forecast",
  functions: {
    func: {
      handler: "src/handler.handle",
      events: [{ schedule: "cron(0 11 * * ? *)" }]
    }
  },
  org: "therockstorm",
  plugins: [...serverless.plugins, "serverless-pseudo-parameters"],
  provider: {
    ...serverless.provider,
    environment: {
      ...serverless.provider.environment,
      FORECAST_EMAIL: "${env:FORECAST_EMAIL}",
      FORECAST_LAT: "${env:FORECAST_LAT}",
      FORECAST_LON: "${env:FORECAST_LON}",
      FORECAST_TIMEZONE: "${env:FORECAST_TIMEZONE}",
      OPEN_WEATHER_MAP_API_KEY: "${env:OPEN_WEATHER_MAP_API_KEY}"
    },
    iamRoleStatements: [{
      Effect: "Allow",
      Action: "ses:SendEmail",
      Resource: "arn:aws:ses:${self:provider.region}:#{AWS::AccountId}:identity/${env:FORECAST_EMAIL}"
    }],
    tracing: { apiGateway: true, lambda: true }
  }
}
