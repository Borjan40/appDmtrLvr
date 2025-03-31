import createApp from "./dist-server/entry-server.js";
import { renderToString } from "react-dom/server";
import express from "express";
import { readFileSync } from "fs";
import { url } from "inspector";

const server = express();
const template = readFileSync("./dist/index.html").toString("utf-8");

// Раздача статических файлов
server.use("/assets", express.static("dist/assets"));
server.use("/favicon.ico", express.static("dist/favicon.ico"));

// Обработка всех маршрутов
server.get("*", async function (req, resp) {
  try {
    const context = { url: req.url }; // Текущий маршрут
    const { app, store } = await createApp(context); // Создание серверного приложения
    // Рендеринг React-приложения в строку HTML
    const html = renderToString(app);
    // Вставка сгенерированного HTML и данных в шаблон
    const page = template
      .replace("<!--ssr-->", html) // Вставка HTML в <div id="root"></div>
      .replace("<!--ssr-title-->", store.page.title); // Вставка заголовка страницы
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
