import createApp from "./dist-server/entry-server.js";
import { renderToString } from "react-dom/server";
import express from "express";
import { readFileSync } from "fs";
import { url } from "inspector";

const server = express();
const template = readFileSync("./dist/index.html").toString("utf-8");

server.use("/assets", express.static("dist/assets"));
server.use("/favicon.ico", express.static("dist/favicon.ico"));

server.get("*", async function (req, resp) {
  const context = { url: req.url };
  const { app, store } = await createApp(context);
  // console.log(store);
  const html = renderToString(app);
  const page = template
    .replace("<!--ssr-->", html)
    .replace("<!--ssr-title-->", store.page.title);
  resp.end(page);
});

server.listen(8000);
