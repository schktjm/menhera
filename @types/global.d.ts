declare namespace NodeJS {
  interface ProcessEnv {
    readonly SLACK_SIGNING_SECRET: string;
    readonly SLACK_BOT_TOKEN: string;
  }
}
