import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import * as middleware from "./server/middleware.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "server/static")));
app.use(middleware.parseJson);

app.use("/api/message", function(req, res) {
  if (!req.body) {
    return res.sendStatus(400);
  }

  switch (req.method) {
  case "POST":
    io.of("/message").emit("new", {
      id: req.body.id,
      author: req.body.author,
      message: req.body.message
    });
    break;
  case "PUT":
    io.of("/message").emit("edit", {
      id: req.body.id,
      author: req.body.author,
      message: req.body.message
    });
    break;
  case "DELETE":
    io.of("/message").emit("delete", { id: req.body.id });
    break;
  default:
    res.setHeader("Allow", ["POST", "PUT", "DELETE"]);
    return res.sendStatus(405);
  }

  res.sendStatus(202);
});

server.listen(Number(process.env.PORT), () => {
  console.log("Listening on " + process.env.PORT);
});