import createApp from "./dist-server/entry-server.js";
import { renderToString } from "react-dom/server";
import express from "express";
import { readFileSync } from "fs";
// import createApp from './src/app';

const server = express();
const template = readFileSync("./dist/index.html").toString("utf-8");

// server.use(express.static('dist'))

server.get("*", async function (_req, resp) {
  const app = await createApp();
  const html = renderToString(app);
  const page = template.replace("<!--ssr-->", html);
  resp.end(page);
});

server.listen(8000);
