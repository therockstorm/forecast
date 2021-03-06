# forecast

Your local forecast delivered via email and/or SMS each morning.

This project is intentionally overbuilt. I'm using it as a reference project for things like,

- [Twilio SMS](https://www.twilio.com/docs/libraries/node)
- Serverless Framework [Dashboard](https://serverless.com/framework/docs/dashboard/), [Integration Testing](https://github.com/serverless/enterprise/blob/master/docs/testing.md), and integration with [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/home.html)
- [AWS CodeBuild](https://aws.amazon.com/codebuild/) and [CodeDeploy](https://aws.amazon.com/codedeploy/) with [traffic shifting and blue/green deploys](https://github.com/davidgf/serverless-plugin-canary-deployments)

## Setup

- Clone the repository and run `npm install`
- Ensure your [AWS credentials are available](https://serverless.com/framework/docs/providers/aws/guide/credentials/)
- Deploy with `STAGE=your-env SKRIPTS_DEPLOYMENT_BUCKET=your-bucket FORECAST_EMAIL=your-email FORECAST_LAT=your-lat FORECAST_LON=your-lon FORECAST_TIMEZONE=your-zone OPEN_WEATHER_MAP_API_KEY=your-key SERVERLESS_ACCESS_KEY=your-key FORECAST_PHONE_NUMBER_FROM=your-phone FORECAST_PHONE_NUMBER_TO=your-phone TWILIO_ACCOUNT_SID=your-sid TWILIO_AUTH_TOKEN=your-token npm run deploy`. The last four environment variables are optional.

## Developing

- Run tests, `npm test`
- Invoke locally, `npm run invoke`
