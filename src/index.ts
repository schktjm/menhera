require("dotenv").config();
import { App, LogLevel, SayFn } from "@slack/bolt";

const globalTimer: { [key: string]: NodeJS.Timer | null } = {};
const stopText = ["stop", "止めて", "もういい", "やめて", "とめて", "うるさい"];

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.command("/menhera", async ({ command, ack, say, respond }) => {
  await ack({
    text: "",
    response_type: "in_channel",
  });

  const { text } = command;
  if (stopText.includes(text)) {
    await say("ん");
    const timer = globalTimer[command.user_id];
    if (timer) {
      clearInterval(timer);
    }
  } else {
    const interval = setInterval(async () => {
      await say("ねえ");
    }, 1 * 1000);
    globalTimer[command.user_id] = interval;
  }
});

app.error(async (error) => {
  console.log(error.code);
});

(async () => {
  // Start your app
  await app.start(3000);

  console.log("⚡️ Bolt app is running!");
})();
