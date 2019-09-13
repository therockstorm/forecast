# forecast

Your local forecast delivered via email each morning. It's purposefully overbuilt. I use it as a reference project for things like,

- Serverless Framework [Dashboard](https://serverless.com/framework/docs/dashboard/) and [Integration Testing](https://github.com/serverless/enterprise/blob/master/docs/testing.md)
- [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/home.html)
- [AWS CodeBuild](https://aws.amazon.com/codebuild/)
- [AWS CodeDeploy](https://aws.amazon.com/codedeploy/) with [traffic shifting and blue/green deploys](https://github.com/davidgf/serverless-plugin-canary-deployments)
- [CloudWatch Alerts](https://github.com/ACloudGuru/serverless-plugin-aws-alerts)
- [Amazon EventBridge](https://aws.amazon.com/eventbridge/)
- [Cheaply and securely storing API keys](https://medium.com/better-programming/how-to-store-your-aws-lambda-secrets-cheaply-without-compromising-scalability-or-security-d3e8a250f12c)

## Setup

- Clone the repository and run `npm install`
- Ensure your [AWS credentials are available](https://serverless.com/framework/docs/providers/aws/guide/credentials/)
- Deploy with `STAGE=your-env DEPLOYMENT_BUCKET=your-bucket FORECAST_EMAIL=your-email FORECAST_LAT=your-lat FORECAST_LON=your-lon FORECAST_TIMEZONE=your-zone OPEN_WEATHER_MAP_API_KEY=your-key SERVERLESS_ACCESS_KEY=your-key npm run deploy`

## Developing

- Run tests, `npm test`
- Invoke locally, `npm run invoke`
