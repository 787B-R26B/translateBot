require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");
const options = {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
};
const client = new Client(options);
const { franc } = require("franc");
//const fetch = require("node-fetch");
const LangDetect = require("langdetect");
const api_url =
  "https://script.google.com/macros/s/AKfycbyyEHtJKscfcpMqR7msk0Gpr3UvRmupKK5rw1okJf9NERTXghs0cxLSXF9WQBYlolC9/exec?";
const prefix = "!";
let CHID = null
client.on("ready", (message) => {
  console.log("discord bot is ready!");
  setInterval(() => {
    client.user.setActivity({
      name: `ping: ${client.ws.ping}ms`,
    });
  }, 1000);
});

client.on("messageCreate", async (message) => {
  console.log(message.content);
  if (message.author.id == client.user.id) return;
  if (message.channel.id.toString() === CHID) {
    const msg = message.content;
    console.log(message.channel.id);

    function detectLanguage(msg) {
      const isJapanese = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(msg);
      const isEnglish = /^[A-Za-z0-9\s.,?!-]*$/.test(msg);

      if (isJapanese) {
        return "ja";
      } else if (isEnglish) {
        return "en";
      } else {
        return "error";
      }
    }
    if (detectLanguage(msg) === "en") {
      console.log(
        "api req is start :",
        api_url + `text=${msg}&source=en&target=ja`,
      );
      const req = await fetch(api_url + `text=${msg}&source=&target=ja`);
      console.log("api req is end");
      console.log(req);
      const res = await req.text();
      message.channel.send(res);
    } else if (detectLanguage(msg) === "ja") {
      console.log(
        "api req is start :",
        api_url + `text=${msg}&source=jp&target=en`,
      );
      const req = await fetch(api_url + `text=${msg}&source=&target=en`);
      console.log(req);
      const res = await req.text();
      message.channel.send(res);
    }
  }
      if (!message.content.startsWith(prefix)) return;
     const [command, ...args] = message.content.slice(prefix.length).split(/\s+g/);
  
      if (command === "add") {
        CHID = message.channel.id
          message.channel.send("チャンネルを登録しました");

      }
});
client.login(process.env.DISCORD_BOT_TOKEN);
