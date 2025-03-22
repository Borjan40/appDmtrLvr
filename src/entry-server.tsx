// import app from './app.jsx'
import createApp from "./App";
import { StaticRouter } from "react-router-dom/server";

interface ServerAppContext {
  url: string;
}

async function createServerApp(context: ServerAppContext) {
  const { app, store } = await createApp();

  // choose activeRoute by url
  // some async oper to get data
  // e t.c.
  const serverApp = <StaticRouter location={context.url}>{app}</StaticRouter>;
  return { app: serverApp, store };
}

export default createServerApp;
