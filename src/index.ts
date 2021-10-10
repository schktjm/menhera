require("dotenv").config();
import { App, LogLevel, SayFn, SlashCommand } from "@slack/bolt";

const globalTimer: {
  [channelId: string]: {
    timer: NodeJS.Timer | null;
    count: number;
  };
} = {};

const stopGrill = async (command: SlashCommand, say: SayFn) => {
  await say("ん");
  const { timer } = globalTimer[command.channel_id];
  if (timer) {
    clearInterval(timer);
  }
};

const grillThere = async (command: SlashCommand, say: SayFn) => {
  const interval = setInterval(async () => {
    await say("ねえ");
    if (globalTimer[command.channel_id]) {
      globalTimer[command.channel_id].count += 1;
    }
  }, 1 * 1000);

  globalTimer[command.channel_id] = {
    timer: interval,
    count: 0,
  };
};

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
  const stopText = [
    "stop",
    "止めて",
    "もういい",
    "やめて",
    "とめて",
    "うるさい",
  ];
  if (stopText.includes(text)) {
    await stopGrill(command, say);
  } else {
    await grillThere(command, say);
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
