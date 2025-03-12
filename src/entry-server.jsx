// import app from './app.jsx'
import createApp from "./app";
import { StaticRouter } from "react-router-dom/server";
import http from "http";

async function createServerApp(context) {
  console.log("here");
  const { app, store } = await createApp();

  // choose activeRoute by url
  // some async oper to get data
  // e t.c.
  const serverApp = <StaticRouter location={context.url}>{app}</StaticRouter>;
  return { app: serverApp, store };
}

export default createServerApp;
