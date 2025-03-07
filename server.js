import createApp from "./dist-server/entry-server.js";
import { renderToString } from "react-dom/server";
import express from "express";
import { readFileSync } from "fs";
import { url } from "inspector";
// import createApp from './src/app';

const server = express();
const template = readFileSync("./dist/index.html").toString("utf-8");

// server.use(express.static('dist'))

server.get("*", async function (req, resp) {
  const context = { url: req.url };
  const app = await createApp(context);
  const html = renderToString(app);
  const page = template.replace("<!--ssr-->", html);
  resp.end(page);
});

server.listen(8000);
