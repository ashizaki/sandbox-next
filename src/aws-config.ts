const AWSConfiguration = {
  aws_appsync_graphqlEndpoint: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  aws_appsync_region: process.env.NEXT_PUBLIC_PROJECT_REGION,
  aws_appsync_authenticationType: "API_KEY",
  aws_appsync_apiKey: process.env.NEXT_PUBLIC_APPSYNC_API_KEY,
}

export default AWSConfiguration
