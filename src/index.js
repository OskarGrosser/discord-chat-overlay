import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import * as middleware from "./server/middleware.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, "server/static")));
app.use(middleware.parseJson);

app.use("/api/message", function(req, res) {
  if (!req.body) {
    return res.sendStatus(400);
  }

  switch (req.method) {
  case "POST":
    break;
  case "PUT":
    break;
  case "DELETE":
    break;
  default:
    res.setHeader("Allow", ["POST", "PUT", "DELETE"]);
    res.sendStatus(405);
  }

  res.sendStatus(202);
});

server.listen(Number(process.env.PORT), () => {
  console.log("Listening on " + process.env.PORT);
});