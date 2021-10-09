require("dotenv").config();
import { App, LogLevel } from "@slack/bolt";

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.command("/menhera", async ({ command, ack, say, respond }) => {
  await ack();

  await respond(`${command.text || ""}`);
  await say(`text: ${command.text || "empty"}`);
});

app.error(async (error) => {
  console.log(error.code);
});

(async () => {
  // Start your app
  await app.start(3000);

  console.log("⚡️ Bolt app is running!");
})();
