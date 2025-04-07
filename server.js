import createApp from "./dist-server/entry-server.js";
import { renderToString } from "react-dom/server";
import express from "express";
import { readFileSync } from "fs";

const template = readFileSync("./dist/index.html").toString("utf-8");
const server = express();

server.use(/.*\.js$/, function (_, resp) {
  resp.end("");
});
server.use("/assets", express.static("dist/assets"));
server.use("/favicon.ico", express.static("dist/favicon.ico"));

server.get("*", async function (req, resp) {
  try {
    const context = { url: req.url };
    const { app, store, cashe } = await createApp(context);
    console.log(cashe);
    const html = renderToString(app);
    console.log(cashe);
    const page = template
      .replace("<!--ssr-->", html)
      .replace("<!--ssr-title-->", store.page.title);
    if (store.page.status >= 300 && store.page.status <= 308) {
      resp.redirect(store.page.status, store.page.redirectTo);
    } else {
      resp.status(store.page.status);
      resp.end(page);
    }
  } catch (e) {
    resp.end(template);
  }
});

server.listen(8000);
