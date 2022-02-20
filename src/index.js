import express from "express";
import { Client, Intents } from "discord.js";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const bot = new Client({
  intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ]
});

app.use(express.static(path.join(__dirname, "server/static")));

bot.on("messageCreate", message => {
  if (process.env.CHANNEL_ID === message.channelId
      && ["DEFAULT", "REPLY"].includes(message.type)) {
    io.of("/message").emit("messageCreate", simplifyMessage(message));
  }
});
bot.on("messageUpdate", (oldMessage, newMessage) => {
  if (process.env.CHANNEL_ID === newMessage.channelId
      && ["DEFAULT", "REPLY"].includes(newMessage.type)) {
    io.of("/message").emit("messageUpdate", simplifyMessage(oldMessage), simplifyMessage(newMessage));
  }
});
bot.on("messageDelete", message => {
  if (process.env.CHANNEL_ID === message.channelId
      && ["DEFAULT", "REPLY"].includes(message.type)) {
    io.of("/message").emit("messageDelete", { id: message.id });
  }
});

server.listen(Number(process.env.PORT), () => {
  console.log(`Listening on ${process.env.PORT}`);
});
bot.login(process.env.BOT_TOKEN);

function simplifyMessage(message) {
  return {
    id: message.id,
    member: {
      displayAvatarUrl: message.member.displayAvatarURL(),
      displayHexColor: message.member.displayHexColor,
      displayName: message.member.displayName
    },
    content: message.content,
    cleanContent: message.cleanContent
  };
}