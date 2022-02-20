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

bot.on("messageCreate", message => {});
bot.on("messageUpdate", (oldMessage, newMessage) => {});
bot.on("messageDelete", message => {});

server.listen(Number(process.env.PORT), () => {
  console.log("Listening on " + process.env.PORT);
});
bot.login(process.env.BOT_TOKEN);