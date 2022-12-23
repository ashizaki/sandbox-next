declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test"
    readonly NEXT_PUBLIC_PROJECT_REGION: string
    readonly NEXT_PUBLIC_GRAPHQL_URL: string
    readonly NEXT_PUBLIC_APPSYNC_API_KEY: string
  }
}
