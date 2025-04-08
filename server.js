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

async function recoursiveRender(app, cashe) {
  const html = renderToString(app);
  const awaitingArr = Object.entries(cashe.awaiting);

  console.log("html +n----", html + "\n-----------------------\n");
  console.log(awaitingArr.length);

  if (awaitingArr.length > 0) {
  const awaited = await Promise.all(
      awaitingArr.map(([k, p]) => p.then((data) => ({ k, data })))
    );
    console.log(awaited);
  }
  return html;
}

server.get("*", async function (req, resp) {
  try {
    const context = { url: req.url };
    const { app, store, cashe } = await createApp(context);
    console.log("before", cashe);
    const html = await recoursiveRender(app, cashe);
    console.log("after", cashe);
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
    console.log(e);
    resp.end(template);
  }
});

server.listen(8000);
